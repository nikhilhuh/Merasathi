import express, { Request, Response } from "express";
import { userModel } from "../models/dbmodels/userModel";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query as { userId?: string };

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User id is required.",
      });
      return;
    }

    const user = await userModel.findOne({ _id: userId }).select(
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
