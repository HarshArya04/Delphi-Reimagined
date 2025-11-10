import React, { useState } from "react";
import type { ProjectModel } from "../model/projectModel";
import CodePreview from "../editors/CodePreview";

interface NLConsoleProps {
  model: ProjectModel;
}

const NLConsole: React.FC<NLConsoleProps> = ({ model }) => {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState<any>(null);

  const sendToKiro = async () => {
    setResponse(null);
    const res = await fetch("http://127.0.0.1:5000/kiro/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nlCommand: command, projectModel: model }),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div className="p-4 bg-gray-800 text-white space-y-3">
      <h2 className="font-semibold">Kiro Console</h2>
      <div className="flex gap-2">
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Describe behavior..."
          className="flex-1 px-3 py-1 rounded text-black"
        />
        <button
          onClick={sendToKiro}
          className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded"
        >
          Run
        </button>
      </div>

      {response && (
        <>
          <pre className="bg-gray-900 p-3 rounded text-sm overflow-auto max-h-60">
            {JSON.stringify(response.dsl, null, 2)}
          </pre>

          <CodePreview
            frontendCode={response.code?.frontend}
            backendCode={response.code?.backend}
          />
        </>
      )}
    </div>
  );
};

export default NLConsole;
