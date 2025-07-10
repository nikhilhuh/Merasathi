import express, { Request, Response } from "express";
import { userModel } from "../models/dbmodels/userModel";

const router = express.Router();

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { fromUserId, toUserEmail } = req.body;

    if (!fromUserId || !toUserEmail) {
      res
        .status(400)
        .json({
          success: false,
          message: "fromUserId and toUserEmail are required.",
        });
      return;
    }

    const fromUser = await userModel.findById(fromUserId);
    const toUser = await userModel.findOne({ email: toUserEmail });

    if (!fromUser || !toUser) {
      res.status(404).json({ success: false, message: "User(s) not found." });
      return;
    }

    // ✅ Use pull to safely remove from subdocument array
    toUser.requests.pull({ from: fromUser._id });
    await toUser.save();

    res.json({ success: true, message: "Request cancelled successfully." });
  } catch (err) {
    console.error("Error cancelling request:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to cancel request." });
  }
});

export { router };
