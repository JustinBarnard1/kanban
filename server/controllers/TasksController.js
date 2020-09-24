import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { taskService } from '../services/TaskService'
import { commentService } from "../services/CommentService";
import socketService from "../services/SocketService";



//PUBLIC
export class TasksController extends BaseController {
  constructor() {
    super("api/tasks")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('/:id/comments', this.getAll)
      .post('', this.create)
      .put('/move/:id', this.move)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }


  async getAll(req, res, next) {
    try {
      //only gets tasks by user who is logged in
      let data = await commentService.getAll(req.params.id)
      return res.send(data)
    }
    catch (err) { next(err) }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await taskService.create(req.body)
      socketService.messageRoom(`${data.boardId}`, "updateTasks", data)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await taskService.edit(req.params.id, req.userInfo.email, req.body)
      socketService.messageRoom(`${data.boardId}`, "updateTasks", data)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async move(req, res, next) {
    try {
      
      let data = await taskService.edit(req.params.id, req.userInfo.email, req.body)
      socketService.messageRoom(`${data.boardId}`, "moveTask", req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      let data = await taskService.delete(req.params.id, req.userInfo.email)
      socketService.messageRoom(`${data.boardId}`, "updateTasks", data)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


