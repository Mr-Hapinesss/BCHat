import express from "express";
import { authOrGuest } from "../Middleware/auth.js";
import { checkDailyLimit } from "../middleware/guest.js";
import UsageLog from "../models/usageLog.js";
import fetch from "node-fetch";

const aiRouter = express.Router();

const BIOCHEM_PROMPTS = {
  1: "You are a biochemistry professor. Analyze this image and answer: What biochemical structures or molecules are shown? Describe their function and significance.",
  2: "You are a biochemistry professor. Analyze this image and answer: What metabolic pathway is illustrated? Explain each step shown.",
  3: "You are a biochemistry professor. Analyze this image and answer: Identify the enzyme(s) or proteins shown. Describe their mechanism of action.",
  4: "You are a biochemistry professor. Analyze this image and answer: What experimental technique or result is depicted? Interpret the findings."
};

aiRouter.post("/answer", authOrGuest, checkDailyLimit, async (req, res) => {
  const { imageBase64, mimeType, questionNumber } = req.body;

  if (!imageBase64 || !questionNumber || !BIOCHEM_PROMPTS[questionNumber]) {
    return res.status(400).json({
      error: "Missing image or invalid question number (1–4)."
    });
  }

  try {
    const prompt = BIOCHEM_PROMPTS[questionNumber];

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: mimeType || "image/jpeg",
                    data: imageBase64
                  }
                }
              ]
            }
          ]
        })
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      return res.status(geminiRes.status).json({
        error: data?.error?.message || "AI request failed.",
        details: data?.error
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.[0]?.text ||
      data?.candidates?.[0]?.content?.find((part) => typeof part.text === "string")?.text ||
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.output ||
      "No answer returned.";

    await UsageLog.create({
      userId: req.user?._id || null,
      guestId: req.guestId || null,
      questionNumber,
      timestamp: new Date()
    });

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed." });
  }
});

export default aiRouter;