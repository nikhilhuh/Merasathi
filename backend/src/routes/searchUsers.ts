import express, { Request, Response } from "express";
import { userModel } from "../models/dbmodels/userModel";
import { calculateAge } from "../utils/calculateAge";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { q } = req.query as { q?: string };

    if (!q) {
      res
        .status(400)
        .json({ success: false, message: "Search query is required." });
      return;
    }

    const rawUsers = await userModel
      .find({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
        ],
      })
      .select("name email gender profileImage dateOfBirth");

    const users = rawUsers.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      profileImage: user.profileImage,
      age: user.dateOfBirth ? calculateAge(user.dateOfBirth) : null,
    }));

    res.json({ success: true, users });
  } catch (err) {
    console.error("Error searching users:", err);
    res.status(500).json({ success: false, message: "Search failed." });
  }
});

export { router };
