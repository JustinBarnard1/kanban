import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Comment = new Schema({
  body: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  listId: {type: ObjectId, ref:'List', required: true}
}, { timestamps: true, toJSON: { virtuals: true } })


Comment.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

export default Comment