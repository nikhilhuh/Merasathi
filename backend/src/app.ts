import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.connect";
import { mainRouter } from "./middleware/mainRouter";

const app = express();
connectDB();
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL, methods: ["GET", "POST"] }));
app.use(express.json());
app.use("/api", mainRouter);

export { app };
