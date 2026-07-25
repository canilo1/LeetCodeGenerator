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
console.log("This is the API key:", apiKey);
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function POST(req) {
  try {
    console.log("Using Gemini key:", apiKey ? "YES" : "NO");
  
    if (!apiKey) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY. Add it to the project .env file or the workspace root .env file." },
        { status: 500 }``
      );
    }
    const { Pattern, Difficulty } = await req.json();
    console.log("Pattern",Pattern,"Difficulty",Difficulty)
    const difficulty = Difficulty?.trim() || "Easy";

    const prompt = `
     Generate a LeetCode-style coding problem that meets the following requirements:

1. Difficulty: ${difficulty} (Easy / Medium / Hard)
2. Problem pattern: ${Pattern} (e.g., Array, Linked List, Sliding Window, etc.)
3. The problem must be original and NOT exist on LeetCode.
4. Only output the problem statement — do NOT include the solution, hints, or explanations.
5. Format the problem as follows:
   - Title
   - Problem description
   - Input format (if necessary)
   - Output format (if necessary)
   - Example(s) (optional, if it helps clarify the problem)

    `;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: prompt }] },
      ],
    });

  const output = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    console.log("This is hte output",output)
    if (!output) {
      console.error("Gemini returned empty output:", JSON.stringify(result, null, 2));
      return Response.json({ error: "Gemini returned no text output" }, { status: 500 });
    }

    return Response.json({ question: output });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
