import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class CommentService {
  async getAll(id) {
    return await dbContext.Comments.find({ taskId: id })
  }
  async create(rawData) {
    let data = await dbContext.Comments.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Comments.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Comments.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this comment");
    }
  }

}

export const commentService = new CommentService()