import Todo from "../../models/todo";
import connectMongo from "../../utils/connectMongo";

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "POST") {
    const { title } = req.body;
    const newTodo = {
      id: req.userId,
      title,
      done: false,
    };

    res.status(201).json({ message: "Todo created", todo: newTodo });
  }
}
