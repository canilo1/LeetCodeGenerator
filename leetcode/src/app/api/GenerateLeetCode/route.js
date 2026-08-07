import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

for (const envPath of [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "..", ".env"),
]) {
  dotenv.config({ path: envPath });
}

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function POST(req) {
  try {
    if (!apiKey || !ai) {
      return new Response(
        JSON.stringify({ error: "Missing Gemini API key. Add GEMINI_API_KEY (or GOOGLE_API_KEY) to your .env file." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    let body = {};
    try {
      const text = await req.text();
      if (text) {
        body = JSON.parse(text);
      }
    } catch (error) {
      console.error("Failed to parse request body", error);
      body = {};
    }

    const { Pattern, Difficulty, difficulty } = body;
    const selectedDifficulty = Difficulty ?? difficulty;

    if (!Pattern || typeof Pattern !== "string" || !Pattern.trim()) {
      return new Response(JSON.stringify({ error: "No pattern provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!selectedDifficulty || typeof selectedDifficulty !== "string" || !selectedDifficulty.trim()) {
      return new Response(JSON.stringify({ error: "No difficulty provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const prompt = `Create one original LeetCode-style question for the pattern "${Pattern}" at ${selectedDifficulty} difficulty. Return only the question text.`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const question = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (!question) {
      return new Response(JSON.stringify({ error: "Gemini returned no question" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ question }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API Error in Question Generator:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
