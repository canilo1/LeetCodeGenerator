export async function handleAdvice({ setAdvice, question, answer }) {
  try {
    const response = await fetch("/api/GenerateLeetCode/LeetCodeAdvicer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Answer: answer, Problem: question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const message = data.error ? `❌ Error: ${data.error}` : data.feedback || "No feedback returned.";
    setAdvice(message);
  } catch (error) {
    console.error("Error fetching advice:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    setAdvice(`❌ Unable to get feedback right now: ${message}`);
  }
}

export async function handleGeneration({ setGenerationLoading, setQuestion, Pattern, difficulty, Difficulty }) {
  setGenerationLoading(true);

  try {
    const response = await fetch("/api/GenerateLeetCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Pattern, difficulty: difficulty ?? Difficulty }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const message = data.error ? `❌ Error: ${data.error}` : data.question || "No question returned.";
    setQuestion(message);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(error);
    setQuestion(`❌ Request failed: ${message}`);
  } finally {
    setGenerationLoading(false);
  }
}
