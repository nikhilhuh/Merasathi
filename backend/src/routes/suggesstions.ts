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

    const currentUser = await userModel.findById(userId);
    if (!currentUser) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    // Determine gender filter
    let genderFilter: any = {};
    if (currentUser.gender === "male") {
      genderFilter.gender = "female";
    } else if (currentUser.gender === "female") {
      genderFilter.gender = "male";
    }

    const rawUsers = await userModel
      .find({
        _id: { $ne: currentUser._id },
        ...genderFilter,
      })
      .select(
        "name profileImage dateOfBirth location religion gender"
      );

    // Map and calculate age
    const mappedUsers = rawUsers.map((user) => ({
      _id: user._id,
      name: user.name,
      gender: user.gender,
      profileImage: user.profileImage,
      age: user.dateOfBirth ? calculateAge(user.dateOfBirth) : null,
      location: user.location,
      religion: user.religion,
    }));

    // Get preferences from current user
    const preferences = currentUser.preferences;
    const { ageRange, religion, location } = preferences;

    // Sort based on how well each user matches preferences
    const sortedSuggestions = mappedUsers.sort((a, b) => {
      const score = (user: any) => {
        let s = 0;

        if (ageRange && user.age >= ageRange[0] && user.age <= ageRange[1])
          s += 1;
        if (religion && user.religion === religion) s += 1;
        if (
          location &&
          user.location?.state?.toLowerCase() === location.toLowerCase()
        )
          s += 1;
        return s;
      };

      return score(b) - score(a); 
    });

    res.json({ success: true, suggestions: sortedSuggestions });
    return;
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch suggestions." });
  }
});

export { router };
