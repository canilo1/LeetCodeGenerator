import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

for (const envPath of [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "..", ".env"),
]) {
  dotenv.config({ path: envPath });
}

const apiKey = process.env.GEMINI_API_KEY;
console.log("THis is the api key",apiKey)
console.log("Using Gemini key:", apiKey ? "YES" : "NO");
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
console.log("Using Gemini key:", apiKey ? "YES" : "NO");

export async function POST(req) {
  try {
    console.log("Using Gemini key:", apiKey ? "YES" : "NO");
    console.log("Request body:", await req.json());
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing GEMINI_API_KEY. Add it to the project .env file or the workspace root .env file." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    const body = await req.json();
    const { Answer,Problem } = body;

    if (!Answer) {
      return new Response(JSON.stringify({ error: "No answer provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const prompt = `
You are an expert software engineer and coding interviewer.
Here is a candidate's solution attempt:
This is the "${Problem} and this is their "${Answer}"

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

    const output = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

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
  } catch (err) {
    console.error("Gemini API Error in Advicer:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
