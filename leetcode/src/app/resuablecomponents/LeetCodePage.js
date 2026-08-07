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
    <main className="flex flex-col gap-4 md:gap-6 p-3 md:p-4 lg:p-6 text-white flex-1 h-full overflow-y-auto bg-zinc-900 w-full">
      {/* Header Section - Stack on mobile, row on larger screens */}
      <div className="flex flex-col xs:gap-3 md:gap-4 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
          <h1 className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl truncate">
            Pattern: {selectedPage}
          </h1>
          <Select onValueChange={setDifficulty}>
            <SelectTrigger className="w-full sm:w-48 md:w-56 text-sm md:text-base">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent className="w-full sm:w-48 md:w-56">
              <SelectGroup>
                <SelectLabel>Difficulty</SelectLabel>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content Cards - Stack on mobile, 2 columns on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6 flex-1 min-h-0 w-full">

        {/* Question Card */}
        <Card className="bg-zinc-800 flex flex-col gap-3 md:gap-4 p-3 md:p-4 flex-1 min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-0 overflow-hidden">
          <Textarea
            placeholder="Question will appear here..."
            value={question}
            readOnly
            className="resize-none flex-1 text-sm md:text-base text-white placeholder:text-zinc-500 overflow-y-auto"
          />
          <Button
            onClick={() => {
              if (selectedPage && difficulty) {
                handleGeneration({
                  setGenerationLoading: setLoading,
                  setQuestion,
                  Pattern: selectedPage,
                  difficulty,
                });
              } else alert("Select a difficulty first.");
            }}
            disabled={loading}
            className="w-full text-sm md:text-base py-2 md:py-2.5"
          >
            {loading ? "Generating..." : "Generate Question"}
          </Button>
        </Card>

        {/* Answer & Feedback Card */}
        <Card className="bg-zinc-800 flex flex-col gap-3 md:gap-4 p-3 md:p-4 flex-1 min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-0 overflow-hidden">
          <Textarea
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="resize-none flex-1 text-sm md:text-base text-white placeholder:text-zinc-500 overflow-y-auto"
          />
          <Textarea
            placeholder="AI feedback or advice will appear here..."
            value={advice}
            readOnly
            className="resize-none flex-1 text-sm md:text-base text-white placeholder:text-zinc-500 overflow-y-auto"
          />
          <Button
            onClick={() => {
              if (question && answer)
                handleAdvice({ setAdvice, question, answer });
              else alert("Make sure there is both a question and an answer.");
            }}
            className="w-full text-sm md:text-base py-2 md:py-2.5"
          >
            Submit Answer
          </Button>
        </Card>
      </div>
    </main>
  );
}
