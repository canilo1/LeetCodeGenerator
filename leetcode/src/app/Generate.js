export async function handleAdvice({ setAdvice,question, answer }) {
  console.log("This is the question:", question, "This is the answer:", answer);

  try {
    const response = await fetch("/api/GenerateLeetCode/LeetCodeAdvicer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Answer: answer, Problem: question }),
    });

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const data = await response.json();
    setAdvice(data.error ? "❌ Error: " + data.error : data.feedback);
  } catch (error) {
    console.error("Error fetching advice:", error);
   
  } finally {
    
  }
}

export  async function handleGeneration({setGenerationLoading,setQuestion,Pattern,difficulty}) {
  console.log("This is the pattern",Pattern,"This is Difficulty",difficulty)
    setGenerationLoading(true);
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
      setGenerationLoading(false);
    }
  }
