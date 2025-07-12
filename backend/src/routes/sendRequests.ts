import express, { Request, Response } from "express";
import { userModel } from "../models/dbmodels/userModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { fromUserId, toUserId } = req.body;

    if (!fromUserId || !toUserId) {
      res.status(400).json({
        success: false,
        message: "Both fromUserId and toUserId are required.",
      });
      return;
    }

    const fromUser = await userModel.findOne({ _id: fromUserId });
    const toUser = await userModel.findOne({ _id: toUserId });

    if (!fromUser || !toUser) {
      res.status(404).json({
        success: false,
        message: "One or both users not found.",
      });
      return;
    }

    if (fromUser._id === toUser._id) {
      res.status(400).json({
        success: false,
        message: "You cannot send a request to yourself.",
      });
      return;
    }

    const alreadyExists = toUser.requests.find(
      (r: any) => r.from.toString() === fromUser._id.toString()
    );

    if (alreadyExists) {
      res.status(400).json({
        success: false,
        message: "Request already sent.",
      });
      return;
    }

    toUser.requests.push({ from: fromUser._id });
    await toUser.save();

    res.status(200).json({
      success: true,
      message: "Request sent successfully.",
    });
  } catch (err) {
    console.error("Error sending request:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending request.",
    });
  }
});

export { router };
