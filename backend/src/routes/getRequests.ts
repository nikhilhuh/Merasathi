import express, { Request, Response } from "express";
import { userModel } from "../models/dbmodels/userModel";
import { calculateAge } from "../utils/calculateAge";
const router = express.Router();

interface RequestQuery {
  userId?: string;
  type?: "sent" | "received";
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const { userId, type } = req.query as RequestQuery;

    if (!userId || !type) {
      res.status(400).json({
        success: false,
        message: "User ID and type are required.",
      });
      return;
    }

    let data: any[] = [];

    if (type === "received") {
      const user = await userModel
        .findById(userId)
        .populate("requests.from", "name dateOfBirth gender profileImage email")
        .select("requests");

      if (!user) {
        res.status(404).json({ success: false, message: "User not found." });
        return;
      }

      data = user.requests
        .filter((req: any) => req.from) // ensure populated
        .map((req: any) => ({
          _id: req.from._id,
          name: req.from.name,
          age: req.from.dateOfBirth ? calculateAge(req.from.dateOfBirth) : null,
          gender: req.from.gender,
          profileImage: req.from.profileImage,
          religion: req.from.religion,
          location: req.from.location,
          status: req.status,
        }));
    }

    if (type === "sent") {
      const users = await userModel.find({
        "requests.from": userId,
      });

      for (const u of users) {
        const req = u.requests.find((r: any) => r.from.toString() === userId);
        if (req) {
          data.push({
            _id: u._id,
            name: u.name,
            age: u.dateOfBirth ? calculateAge(u.dateOfBirth) : null,
            gender: u.gender,
            profileImage: u.profileImage,
            religion: u.religion,
            location: u.location,
            status: req.status,
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      requests: data,
    });
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch requests.",
    });
  }
});

export { router };
