import { useState } from "react";
import Canvas from "./ui/Canvas";
import NLConsole from "./nlConsole/NLConsole";
import { type ProjectModel, defaultModel } from "./model/projectModel";

function App() {
  const [model, setModel] = useState<ProjectModel>(defaultModel);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center py-4">Delphi Reimagined</h1>
      <Canvas model={model} setModel={setModel} />
      <NLConsole model={model} />
    </div>
  );
}

export default App;
