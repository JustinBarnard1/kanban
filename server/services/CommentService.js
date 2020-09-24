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
  async getById(id) {
    let data = await dbContext.Comments.findOne({ _id: id}).populate("boardId")
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this task")
    }
    return data
  }

  async edit(id, userEmail, update) {
    let list = await this.getById(id)
    let data = null
    // @ts-ignore
    if(list.boardId.collabs.includes(userEmail)){
      data = await dbContext.Comments.findOneAndUpdate({ _id: id}, update, { new: true })

    }
    // @ts-ignore
    else if(list.creatorEmail == userEmail){
      data = await dbContext.Comments.findOneAndUpdate({ _id: id}, update, { new: true })

    }
    // @ts-ignore
    else if(list.boardId.creatorEmail == userEmail){
      data = await dbContext.Comments.findOneAndUpdate({ _id: id}, update, { new: true })

    }
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list");
    }
    return data;
  }

  async delete(id, userEmail) {
    let list = await this.getById(id)
    let data = null
    // @ts-ignore
    if(list.boardId.collabs.includes(userEmail)){
      data = await dbContext.Comments.findOneAndRemove({ _id: id});

    }
    // @ts-ignore
    else if(list.creatorEmail == userEmail){
      data = await dbContext.Comments.findOneAndRemove({ _id: id});

    }
    // @ts-ignore
    else if(list.boardId.creatorEmail == userEmail){
      data = await dbContext.Comments.findOneAndRemove({ _id: id});

    }
    
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list");
    }
  }

}

export const commentService = new CommentService()