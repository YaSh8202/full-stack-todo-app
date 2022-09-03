import Todo from "../../../models/todo";
import connectMongo from "../../../utils/connectMongo";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  await connectMongo();
  const jwt = req.cookies["oursitejwt"];
  if (!jwt) {
    return res.status(401).json({ message: "Not Authenticated" });
  }
  if (req.method === "GET") {
    try {
      const decodedData = verify(jwt, process.env.JWT_SECRET);
      const userId = decodedData?.id;

      await Todo.find({ userId, done: true }).deleteMany();

      const todos = await Todo.find({ userId });
      console.log(todos);

      return res.status(200).json({ todos });
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }
}
