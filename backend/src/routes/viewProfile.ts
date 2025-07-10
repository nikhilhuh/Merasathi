import express, { Request, Response } from "express";
import { userModel } from "../models/dbmodels/userModel";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email?: string };

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required.",
      });
      return;
    }

    const user = await userModel.findOne({ email }).select(
      "-password -requests -__v -createdAt -updatedAt"
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Error fetching public profile:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching profile.",
    });
  }
});

export { router };
