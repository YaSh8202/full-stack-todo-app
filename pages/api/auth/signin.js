import connectMongo from "../../../utils/connectMongo";
import Student from "../../../models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "Please provide all the required fields",
    });
  }

  try {
    await connectMongo();
    let existingStudent = await Student.findOne({ email: email });
    if (!existingStudent) {
      res.status(400).json({ error: "User does not exist" });
      return;
    }

    await existingStudent.comparePassword(password);

    const token = jwt.sign(
      {
        id: existingStudent._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user: existingStudent, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
