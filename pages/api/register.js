import connectMongo from "../../../utils/connectMongo";
import Student from "../../../models/Student";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({
      error: "Please provide all the required fields",
    });
  }

  try {
    await connectMongo();

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        error: "Student already exists",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
      });
    }

    const name = firstName + " " + lastName;
    const student = new Student({ email, name, password });
    await student.save();
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ student, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
