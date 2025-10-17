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
  const [GenerationLoading, setGenerationLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [Difficulty, setDifficulty] = useState("");
  const [answer, setAnswer] = useState("");
  const [advice, setAdvice] = useState("");

  const handleDifficulty = (difficulty) => setDifficulty(difficulty);

  if (!selectedPage) {
    return (
      <div className="flex flex-1 justify-center items-center bg-sky-950 p-6 text-center">
        <Button>Please select a Page</Button>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-6 overflow-y-auto bg-sky-950 p-[clamp(0.75rem,2vw,1.5rem)] min-h-full transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <h1 className="font-semibold text-zinc-100 text-[clamp(1rem,2vw,1.5rem)]">
          Pattern: {selectedPage}
        </h1>
        <Select onValueChange={handleDifficulty}>
          <SelectTrigger className="min-w-[140px] sm:w-[200px]">
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

      {/* Responsive content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(0.75rem,2vw,1.5rem)] w-full max-w-[1600px] mx-auto">
        {/* Question Section */}
        <Card className="bg-zinc-900 border border-zinc-800 text-zinc-200 p-[clamp(1rem,2vw,1.5rem)] rounded-2xl shadow-md flex flex-col gap-4">
          <Textarea
            className="bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400 
              focus:border-zinc-600 focus:ring-zinc-600 
              resize-none 
              min-h-[120px] max-h-[calc(100vh-280px)] w-full"
            placeholder="Question will appear here..."
            value={question}
            readOnly
          />
          <Button
            className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 transition-all duration-300"
            onClick={() => {
              if (selectedPage && Difficulty) {
                handleGeneration({
                  setGenerationLoading,
                  setQuestion,
                  Pattern: selectedPage,
                  Difficulty,
                });
              } else {
                alert("Please select a difficulty first.");
              }
            }}
          >
            {GenerationLoading ? "Generating..." : "Generate Question"}
          </Button>
        </Card>

        {/* Answer Section */}
        <Card className="bg-zinc-900 border border-zinc-800 text-zinc-200 p-[clamp(1rem,2vw,1.5rem)] rounded-2xl shadow-md flex flex-col gap-4">
          <Textarea
            className="bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400 
              focus:border-zinc-600 focus:ring-zinc-600 
              resize-none 
              min-h-[120px] max-h-[200px] w-full"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
          />

          <Textarea
            className="bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400 
              focus:border-zinc-600 focus:ring-zinc-600 
              resize-none 
              min-h-[120px] max-h-[300px] w-full"
            placeholder="AI feedback or advice will appear here..."
            readOnly
            value={advice}
          />

          <Button
            className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 transition-all duration-300"
            onClick={() => {
              if (question && answer) {
                handleAdvice({ setAdvice, question, answer });
              } else {
                alert("Please make sure there is both a question and an answer.");
              }
            }}
          >
            Submit Answer
          </Button>
        </Card>
      </div>
    </main>
  );
}
