import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import cors from "cors";
import { userRouter } from "../routes/users.js";
import { postRouter } from "../routes/post.js";
import { dalleRouter } from "../routes/dalle.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/post",postRouter);
app.use("/api/v1/dalle",dalleRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected at ${process.env.PORT}`);
});

connectDB();
