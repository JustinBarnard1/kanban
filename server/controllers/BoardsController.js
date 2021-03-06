import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { boardService } from '../services/BoardService'
import { listService } from "../services/ListService";
import socketService from "../services/SocketService";



//PUBLIC
export class BoardsController extends BaseController {
  constructor() {
    super("api/boards")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/others', this.getCollabBoards)
      .get('/:id', this.getById)
      .get('/others/:id', this.getOthersById)
      .get('/:id/lists', this.getLists)
      .post('', this.create)
      .put('/:id', this.edit)
      .put('/collab/:id', this.removeSelf)
      .delete('/:id', this.delete)
  }
  async removeSelf(req, res, next) {
    try {
      let data = await boardService.removeSelf(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (err) {
      next(err)
    }
  }
  async getLists(req, res, next) {
    try {
      let data = await listService.getAll(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getCollabBoards(req, res, next) {
    try {
      let data = await boardService.getCollab(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) };
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await boardService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await boardService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getOthersById(req, res, next) {
    try {
      let data = await boardService.getOthersById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await boardService.create(req.body)
      socketService.messageRoom("boards", "updateBoards")
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await boardService.edit(req.params.id, req.userInfo.email, req.body)
      socketService.messageRoom("boards", "updateBoards")
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await boardService.delete(req.params.id, req.userInfo.email)
      socketService.messageRoom("boards", "updateBoards")
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


