import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Task = new Schema({
  completed: { type: Boolean, default: false },
  creatorEmail: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  body: {type: String, required: true},
  boardId: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })


Task.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

//CASCADE ON DELETE
Task.pre('deleteMany', function (next) {
  //lets find all the tasks and remove them
  Promise.all([
    //something like...
    // @ts-ignore
    dbContext.Comments.deleteMany({$or: [{ boardId: this._conditions.boardId }, { listId: this._conditions.listId }]}),
  ])
    .then(() => next())
    .catch(err => next(err))
})

//CASCADE ON DELETE
Task.pre('findOneAndRemove', function (next) {
  //lets find all the tasks and remove them
  Promise.all([
    // @ts-ignore
    dbContext.Comments.deleteMany({ taskId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default Task