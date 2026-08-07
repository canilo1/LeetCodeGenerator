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

function extractTextFromResult(result) {
  const parts = result?.candidates?.[0]?.content?.parts ?? [];
  const fromParts = parts
    .map((part) => (typeof part?.text === "string" ? part.text : ""))
    .join("")
    .trim();

  if (fromParts) return fromParts;
  if (typeof result?.text === "string") return result.text.trim();
  return "";
}

export async function POST(req) {
  try {
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing Gemini API key. Add GEMINI_API_KEY (or GOOGLE_API_KEY) to your .env file." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    let body = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const { Answer, Problem } = body;

    if (!Answer || typeof Answer !== "string" || !Answer.trim()) {
      return new Response(JSON.stringify({ error: "No answer provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!Problem || typeof Problem !== "string" || !Problem.trim()) {
      return new Response(JSON.stringify({ error: "No problem provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const prompt = `
You are an expert software engineer and coding interviewer.
Here is a candidate's solution attempt:
This is the "${Problem}" and this is their "${Answer}"

Please provide structured feedback:
1. Correctness — does it solve the problem?
2. Efficiency — time and space complexity, possible optimizations.
3. Code quality — readability, style, maintainability.
4. Improvements — what would make this solution stronger?

Keep the feedback clear, constructive, and concise.
    `;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const output = extractTextFromResult(result);

    if (!output) {
      console.error("Gemini returned empty output:", JSON.stringify(result, null, 2));
      return new Response(
        JSON.stringify({ error: "Gemini returned no text output" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ feedback: output }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API Error in Advicer:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
