import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBWsPYZr4QXvXkUQhjRww7V0oKsvAlNZ08");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const compareCode = async (originalCode, optimizedCode) => {
  try {
    const prompt = `
Compare these two code versions and explain the optimizations made:

Original Code:
\`\`\`
${originalCode}
\`\`\`

Optimized Code:
\`\`\`
${optimizedCode}
\`\`\`

Please analyze and explain:
1. What significant changes were made
2. How the code was improved
3. Any performance benefits
4. Better practices implemented
5. Potential trade-offs
6. Provide the output of the optimized and unoptimized code comparing them.
7. Do not provide the overall analysis too lengthly, keep it brief & straight to the point.
Format the response in neatly, not Markdown.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error in Gemini comparison:', error);
    return "Error analyzing code optimization details.";
  }
};