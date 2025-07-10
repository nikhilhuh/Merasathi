import express, { Request, Response } from "express";
import { userModel } from "../models/dbmodels/userModel";

const router = express.Router();

router.put("/", async (req: Request, res: Response) => {
  try {
    const { updates, userId } = req.body;

    if (!updates || !userId) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
      return;
    }

    // Check if the user exists
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      res.status(404).json({
        success: false,
        message: "User does not exist.",
      });
      return;
    }

    // Update user
    await userModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.status(200).json({ success: true, message: "User profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({
      success: false,
      message: "Profile update failed.",
    });
  }
});

export { router };
