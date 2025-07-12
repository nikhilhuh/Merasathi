import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Optional profile fields
    gender: { type: String, enum: ["male", "female", "other"] },
    dateOfBirth: { type: Date },
    phone: { type: String },
    religion: { type: String },
    caste: { type: String },
    motherTongue: { type: String },
    location: {
      city: String,
      state: String,
      country: String,
    },
    education: { type: String },
    profession: { type: String },
    income: { type: String },
    maritalStatus: { type: String },
    profileImage: { type: String , default: "https://lh3.googleusercontent.com/a/default-user"},
    bio: { type: String },

    preferences: {
      ageRange: [Number],
      religion: String,
      caste: String,
      location: String,
    },

    requests: [
      {
        from: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema, "Users");
export { userModel };
