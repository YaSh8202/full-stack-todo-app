import Todo from "../../models/todo";
import connectMongo from "../../utils/connectMongo";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "POST") {
    const { title } = req.body;
    const jwt = req.cookies["oursitejwt"];

    if (!jwt) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    try {
      const decodedData = verify(jwt, process.env.JWT_SECRET);
      const id = decodedData?.id;

      const newTodo = new Todo({
        userId: id,
        title,
        done: false,
      });
      await newTodo.save();
      res.status(201).json({ todo: newTodo });
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }
}
