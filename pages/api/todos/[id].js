import Todo from "../../../models/todo";
import connectMongo from "../../../utils/connectMongo";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  await connectMongo();
  const jwt = req.cookies["oursitejwt"];
  if (!jwt) {
    return res.status(401).json({ message: "Not Authenticated" });
  }
  if (req.method === "PUT") {
    try {
      const decodedData = verify(jwt, process.env.JWT_SECRET);
      const id = decodedData?.id;

      const { todo } = req.body;

      if (todo.userId.toString() !== id) {
        return res.status(409).json({ message: "Not Authorized" });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(todo._id, todo, {
        new: true,
      });

      return res.status(200).json({ todo: updatedTodo });
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }
  if (req.method === "DELETE") {
    try {
      const decodedData = verify(jwt, process.env.JWT_SECRET);
      const userId = decodedData?.id;

      const { id } = req.query;
      const todo = await Todo.findById(id);

      if (todo.userId.toString() !== userId) {
        return res.status(409).json({ message: "Not Authorized" });
      }
      await todo.delete();

      return res.status(200).json({ message: "Todo Deleted" });
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }
}
