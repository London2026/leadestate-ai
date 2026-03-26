import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate", async (req, res) => {
  const { location, tone } = req.body;

  const prompt = `
You are a high-performing real estate marketing expert.

Create an Instagram post for a real estate agent.

Location: ${location}
Tone: ${tone}

The goal is to attract buyers and sellers.

Include:
1. A strong hook
2. A persuasive caption
3. A call to action
4. 10 hashtags
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ result: response.choices[0].message.content });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).send("Error generating post");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
