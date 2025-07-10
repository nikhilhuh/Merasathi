import express, { Request, Response } from "express";
import { userModel } from "../models/dbmodels/userModel";

const router = express.Router();

router.put("/", async (req: Request, res: Response) => {
  try {
    const { toUserEmail, fromUserId, status } = req.body;

    if (!toUserEmail || !fromUserId || !status) {
      res.status(400).json({
        success: false,
        message: "toUserEmail, fromUserId, and status are required.",
      });
      return;
    }

    if (!["accepted", "rejected"].includes(status)) {
      res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'accepted' or 'rejected'.",
      });
      return;
    }

    // Find the user by email (receiver)
    const user = await userModel.findOne({ email: toUserEmail });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    // Find the matching request
    const request = user.requests.find((r: any) => r.from.toString() === fromUserId);
    if (!request) {
      res.status(404).json({
        success: false,
        message: "Request not found.",
      });
      return;
    }

    // Update the status
    request.status = status;

    // Save updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: `Request ${status} successfully.`,
    });
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update request status.",
    });
  }
});

export { router };
