import { Schema, model, models } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Todo = models.Todo || model("Todo", todoSchema);

export default Todo;
