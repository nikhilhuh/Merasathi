import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userModel } from "../models/dbmodels/userModel";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
      return;
    }

    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ success: false, message: "Email already in use." });
      return;
    }

    // ✅ HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user -> student
    await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ success: true, message: "User signed up successfully" });
    return;
  } catch (err) {
    console.log(`Error Signing Up User: ${err}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
});

export { router };
