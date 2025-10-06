"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function LeetCodeGenerator({ Pattern}) {
  console.log("This is the pattern",Pattern)
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [advice, setAdvice] = useState("");
  const [adviceLoading, setAdviceLoading] = useState(false);

  async function handleAdvice() {
    setAdviceLoading(true);
    try {
      const response = await fetch("/api/GenerateLeetCode/LeetCodeAdvicer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Answer: text }),
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();
      setAdvice(data.error ? "❌ Error: " + data.error : data.feedback);
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("❌ Request failed: " + error.message);
    } finally {
      setAdviceLoading(false);
    }
  }

  async function handleGeneration() {
    setLoading(true);
    try {
      const response = await fetch("/api/GenerateLeetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Pattern: Pattern, Difficulty: difficulty }),
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();
      setQuestion(data.error ? "❌ Error: " + data.error : data.question);
    } catch (err) {
      console.error(err);
      setQuestion("❌ Request failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-blue-100 flex">
      <div className="bg-blue-900 h-full w-full flex flex-row justify-center gap-6 p-4">
        {/* Left: Question */}
        <Card className="bg-zinc-500 flex-1 p-4 flex flex-col h-full min-h-0">
          <div className="flex gap-2 mb-2">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="p-1"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <Button onClick={handleGeneration} disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </Button>
          </div>

          <h1 className="border-2 border-b-indigo-500 mt-4">Question</h1>
          <Card className="whitespace-normal break-words p-4 overflow-y-auto flex-1 min-h-0">
            <pre className="text-sm whitespace-pre-wrap">{question}</pre>
          </Card>
        </Card>

        {/* Middle: Answer Input */}
        <Card className="bg-zinc-500 flex-1 p-4 flex flex-col h-full min-h-0">
          <div className="h-1/2 min-h-0">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your solution here..."
              className="w-full h-full resize-none overflow-y-auto p-3 rounded border min-h-0 bg-transparent text-white"
            />
          </div>
          <Button
            className="mt-3 self-end"
            onClick={handleAdvice}
            disabled={adviceLoading}
          >
            {adviceLoading ? "Submitting..." : "Submit"}
          </Button>
        </Card>

        {/* Right: Feedback */}
        <Card className="bg-zinc-500 flex-1 p-4 flex flex-col h-full min-h-0">
          {advice && <pre className="text-sm whitespace-pre-wrap">{advice}</pre>}
        </Card>
      </div>
    </div>
  );
}
