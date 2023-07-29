import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("post", PostSchema);
