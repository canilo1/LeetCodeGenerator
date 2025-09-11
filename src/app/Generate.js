"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function LeetCodeGenerator({Pattern}) {
  console.log("This is the pattern",Pattern)
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [difficulty, setDifficulty] = useState("Easy");

  async function handleGeneration() {
    setLoading(true);
    try {
      const response = await fetch("/api/GenerateLeetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Pattern: Pattern, Difficulty: difficulty }),
      });

      const data = await response.json();

      if (data.error) setQuestion("❌ Error: " + data.error);
      else setQuestion(data.question);
    } catch (err) {
      console.error(err);
      setQuestion("❌ Request failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-blue-100 flex flex-col">
      <div className="bg-blue-900 h-screen w-screen flex flex-row justify-center gap-20 p-3">
        <Card className="bg-zinc-500 flex-1 p-4">
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
          <Card className="whitespace-normal break-words p-4 max-h-[70vh] overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap">{question}</pre>
          </Card>
        </Card>

        <Card className="bg-zinc-500 flex-1 p-4">
          <Textarea className="w-full h-full" placeholder="Write your solution here..." />
          <Button className="mt-2">Submit</Button>
        </Card>
      </div>
    </div>
  );
}
