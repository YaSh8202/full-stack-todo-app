import Todo from "../../../models/todo";
import connectMongo from "../../../utils/connectMongo";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === "GET") {
    const jwt = req.cookies["oursitejwt"];

    if (!jwt) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    try {
      const decodedData = verify(jwt, process.env.JWT_SECRET);
      const id = decodedData?.id;

      const todos = await Todo.find({ userId: id });

      return res.status(200).json({ todos });
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }
}
