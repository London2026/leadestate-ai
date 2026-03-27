import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Health check (important for Render)
app.get("/", (req, res) => {
  res.send("API is running");
});

app.post("/generate", async (req, res) => {
  try {
    const { location, tone } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `Write a short real estate Instagram post for ${location} in a ${tone} tone. Include hashtags.`
        }
      ]
    });

    res.json({
      result: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
