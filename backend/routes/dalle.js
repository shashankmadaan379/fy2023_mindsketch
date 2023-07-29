import express from "express";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();
const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      // response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;
    const imageURL = aiResponse.data.data[0].url;
    res.status(200).json({ photo: image , imageURL});
  } catch (error) {
    console.log(error);
  }
});

export { router as dalleRouter };
