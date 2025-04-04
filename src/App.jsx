import React, { useState } from "react";
import Background from "./components/Background";
import CodeEditor from "./components/CodeEditor";
import OutputWindow from "./components/OutputWindow";
import { Loader2 } from 'lucide-react'; // Ensure Loader2 is imported

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCode, setUserCode] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error occurred while fetching response");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (newCode) => {
    setPrompt(newCode);
  };

  return (
    <Background>
      <div className="relative container mx-auto min-h-screen flex flex-col">
        {/* Improved Header - px-8 REMOVED */}
        <header className="py-6 mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent shadow-lg">
            Refyne AI <span className="text-sm font-semibold text-zinc-300 ml-2">Code Optimizer</span>
          </h1>
          <p className="mt-2 text-zinc-400 text-sm">
            Unleash the power of AI to refine and optimize your code.
          </p>
        </header>

        {/* Main Content Area - px-8 REMOVED */}
        <main className="flex flex-grow gap-4">
          <form onSubmit={handleSubmit} className="flex-1 min-w-0">
            <CodeEditor onChange={handleCodeChange} onCodeChange={setUserCode} />
          </form>
          <OutputWindow response={response} loading={loading} originalCode={userCode} />
        </main>

        {/* Submit Button - Centered and elevated */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            disabled={loading || !prompt.trim()}
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2"/> Processing...</> : 'Refyne Code'}
          </button>
        </div>
      </div>
    </Background>
  );
};

export default App;