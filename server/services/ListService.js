import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class ListService {
  async getAll(id) {
    return await dbContext.Lists.find({ boardId: id })
  }

  // @ts-ignore
  async getById(id, userEmail) {
    let data = await dbContext.Lists.findOne({ _id: id }).populate("boardId")
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Lists.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let list = await this.getById(id)
    let data = null
    // @ts-ignore
    if(list.boardId.collabs.includes(userEmail)){
      data = await dbContext.Lists.findOneAndUpdate({ _id: id}, update, { new: true })

    }
    // @ts-ignore
    else if(list.creatorEmail == userEmail){
      data = await dbContext.Lists.findOneAndUpdate({ _id: id}, update, { new: true })

    }
    // @ts-ignore
    else if(list.boardId.creatorEmail == userEmail){
      data = await dbContext.Lists.findOneAndUpdate({ _id: id}, update, { new: true })

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
      data = await dbContext.Lists.findOneAndRemove({ _id: id});

    }
    // @ts-ignore
    else if(list.creatorEmail == userEmail){
      data = await dbContext.Lists.findOneAndRemove({ _id: id});

    }
    // @ts-ignore
    else if(list.boardId.creatorEmail == userEmail){
      data = await dbContext.Lists.findOneAndRemove({ _id: id});

    }
    
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this list");
    }
    return data
  }

}

//5f6904c5acda845ed450fa2e
export const listService = new ListService()