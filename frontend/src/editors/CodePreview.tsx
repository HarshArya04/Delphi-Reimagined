import Editor from "@monaco-editor/react";
import React, { useRef, useState } from "react";

interface CodePreviewProps {
  frontendCode?: string;
  backendCode?: string;
}
// helper to find first document.getElementById("...") reference in code
const extractInputId = (code?: string) => {
  const match = code?.match(/getElementById\("([^"]+)"\)/);
  return match ? match[1] : "mockInput";
};

const CodePreview: React.FC<CodePreviewProps> = ({
  frontendCode,
  backendCode,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [, setOutput] = useState<string>("");

  // safe sandbox execution
  const runSnippet = () => {
    if (!frontendCode) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    // build HTML content with console override
    const html = `
<html>
  <body style="background:#111;color:#0f0;font-family:monospace;padding:8px;">
    <h4>Sandbox Environment</h4>
    <!-- Mock input so document.getElementById(...) works -->
    <input id="mockInput" value="demoName" />
    <input id="${extractInputId(frontendCode)}" value="demoName" />
    <pre id="log"></pre>
    <script>
      const logEl = document.getElementById('log');
      const logger = (...args) => {
        logEl.innerText += args.join(' ') + '\\n';
      };
      console.log = logger;
      console.error = logger;
      try {
        ${frontendCode}
        if (typeof handleClick === 'function') {
          handleClick();
        } else {
          console.log("⚠️ No function handleClick() defined");
        }
      } catch(err) {
        console.error("Error:", err.message);
      }
    </script>
  </body>
</html>
`;

    iframe.srcdoc = html;
    setOutput("Running snippet...");
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-900 text-white p-4">
      {/* Frontend side */}
      <div>
        <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
          Frontend Code
          <button
            onClick={runSnippet}
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
          >
            ▶ Run Snippet
          </button>
        </h3>
        <Editor
          height="300px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={frontendCode || "// No code yet"}
          options={{ readOnly: true }}
        />
        <div className="mt-2 border-t border-gray-700 pt-2">
          <p className="text-sm text-gray-400 mb-1">Output Console:</p>
          <iframe
            ref={iframeRef}
            title="sandbox"
            className="w-full bg-black border border-gray-700 rounded"
            height="120"
          />
        </div>
      </div>

      {/* Backend side */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Backend Code</h3>
        <Editor
          height="440px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={backendCode || "// No code yet"}
          options={{ readOnly: true }}
        />
      </div>
    </div>
  );
};

export default CodePreview;
