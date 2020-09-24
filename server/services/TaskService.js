import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class TaskService {
  async getAll(id) {
    return await dbContext.Tasks.find({ listId: id })
  }

  async getById(id) {
    let data = await dbContext.Tasks.findOne({ _id: id})
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this task")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Tasks.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let list = await this.getById(id)
    let data = null
    // @ts-ignore
    if(list.boardId.collabs.includes(userEmail)){
      data = await dbContext.Tasks.findOneAndUpdate({ _id: id}, update, { new: true })

    }
    // @ts-ignore
    else if(list.creatorEmail == userEmail){
      data = await dbContext.Tasks.findOneAndUpdate({ _id: id}, update, { new: true })

    }
    // @ts-ignore
    else if(list.boardId.creatorEmail == userEmail){
      data = await dbContext.Tasks.findOneAndUpdate({ _id: id}, update, { new: true })

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
      data = await dbContext.Tasks.findOneAndRemove({ _id: id});

    }
    // @ts-ignore
    else if(list.creatorEmail == userEmail){
      data = await dbContext.Tasks.findOneAndRemove({ _id: id});

    }
    // @ts-ignore
    else if(list.boardId.creatorEmail == userEmail){
      data = await dbContext.Tasks.findOneAndRemove({ _id: id});

    }
    
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list");
    }
  }


}

//5f6904c5acda845ed450fa2e
export const taskService = new TaskService()