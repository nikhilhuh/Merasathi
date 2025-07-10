import express, { Request, Response } from "express";
import { userModel } from "../models/dbmodels/userModel";
import { calculateAge } from "../utils/calculateAge";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query as { userId?: string };

    if (!userId) {
      res.status(400).json({ success: false, message: "UserId is required." });
      return;
    }

    // Get the current user to exclude them
    const currentUser = await userModel.findById(userId);
    if (!currentUser) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    const rawUsers = await userModel
      .find({ _id: { $ne: currentUser._id } })
      .select(
        "name email gender profileImage dateOfBirth location religion caste"
      );

    // Map to include age instead of dateOfBirth
    const suggestions = rawUsers.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      profileImage: user.profileImage,
      age: user.dateOfBirth ? calculateAge(user.dateOfBirth) : null,
      location: user.location,
      religion: user.religion,
      caste: user.caste,
    }));

    res.json({ success: true, suggestions });
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch suggestions." });
  }
});

export { router };
