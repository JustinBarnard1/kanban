import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { commentService } from '../services/CommentService'
import { taskService } from '../services/TaskService'
import socketService from "../services/SocketService";



//PUBLIC
export class CommentsController extends BaseController {
  constructor() {
    super("api/comments")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await commentService.create(req.body)
      socketService.messageRoom(`${data.boardId}`, "updateComments", data)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await commentService.edit(req.params.id, req.userInfo.email, req.body)
      socketService.messageRoom(`${data.boardId}`, "updateComments", data)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      let data = await commentService.delete(req.params.id, req.userInfo.email)
      socketService.messageRoom(`${data.boardId}`, "updateComments", data)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


