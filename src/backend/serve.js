import cors from "cors";
import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  const systemPrompt = `You are an expert in AI-Driven Code Refactoring and Modernization. When processing legacy code, your output must consist solely of two sections:

  Refactored Code:
  Generate the most optimized, modernized version of the input code while ensuring:
  - Best possible **time complexity** and **space efficiency**.
  - Industry best practices (DRY, modularity, maintainability).
  - Minimum necessary lines without sacrificing readability.
  - Clean, production-ready, integration-friendly output.
  
  The final output must **ONLY** contain the refactored code—no comments, no explanations, no unnecessary spacing.
  `

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5-coder:3b",
        system: systemPrompt,
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    res.json({ response: data.response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get response from Ollama" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
