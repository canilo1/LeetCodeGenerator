"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { handleGeneration, handleAdvice } from "../Generate";

export default function LeetCodePage({ selectedPage }) {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [answer, setAnswer] = useState("");
  const [advice, setAdvice] = useState("");

  if (!selectedPage) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <Button>Please select a Page</Button>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-6 text-white flex-1 h-full overflow-y-auto bg-zinc-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-1">
        <h1 className="font-semibold text-lg sm:text-xl">
          Pattern: {selectedPage}
        </h1>
        <Select onValueChange={setDifficulty}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Difficulty</SelectLabel>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Question */}
        <Card className="bg-zinc-800 flex flex-col gap-4 p-4 flex-1 min-h-[300px]">
          <Textarea
            placeholder="Question will appear here..."
            value={question}
            readOnly
            className="resize-none flex-1 text-white placeholder:text-zinc-500"
          />
          <Button
            onClick={() => {
              if (selectedPage && difficulty) {
                handleGeneration({
                  setGenerationLoading: setLoading,
                  setQuestion,
                  Pattern: selectedPage,
                  Difficulty: difficulty,
                });
              } else alert("Select a difficulty first.");
            }}
          >
            {loading ? "Generating..." : "Generate Question"}
          </Button>
        </Card>

        {/* Answer */}
        <Card className="bg-zinc-800 flex flex-col gap-4 p-4 flex-1 min-h-[300px]">
          <Textarea
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="resize-none flex-1 text-white placeholder:text-zinc-500"
          />
          <Textarea
            placeholder="AI feedback or advice will appear here..."
            value={advice}
            readOnly
            className="resize-none flex-1 text-white placeholder:text-zinc-500"
          />
          <Button
            onClick={() => {
              if (question && answer)
                handleAdvice({ setAdvice, question, answer });
              else alert("Make sure there is both a question and an answer.");
            }}
          >
            Submit Answer
          </Button>
        </Card>
      </div>
    </main>
  );
}
