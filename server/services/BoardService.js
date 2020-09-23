import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class BoardService {
  async getOthersById(id, email) {
    let data = await dbContext.Boards.findOne({ _id: id, collabs:{$in: email} })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not have access to this board")
    }
    return data
  }
  async getCollab(email) {
    return await dbContext.Boards.find({ collabs:{$in: email}  })
  }
  async getAll(userEmail) {
    return await dbContext.Boards.find({ creatorEmail: userEmail })
  }

  async getById(id, userEmail) {
    let data = await dbContext.Boards.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Boards.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Boards.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Boards.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }

}


export const boardService = new BoardService()