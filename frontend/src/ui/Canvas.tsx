import React, { useState } from "react";
import ButtonComp from "../components/ButtonComp";
import InputComp from "../components/InputComp";
import LabelComp from "../components/LabelComp";
import ComponentWrapper from "./ComponentWrapper";
import type { ProjectModel, UIComponent } from "../model/projectModel";

interface CanvasProps {
  model: ProjectModel;
  setModel: React.Dispatch<React.SetStateAction<ProjectModel>>;
}

const Canvas: React.FC<CanvasProps> = ({ model, setModel }) => {
  const [, setSelectedId] = useState<string | null>(null);

  const addComponent = (type: UIComponent["type"]) => {
    const newComp: UIComponent = {
      id: `comp-${Date.now()}`,
      type,
      x: 50 + Math.random() * 200,
      y: 50 + Math.random() * 200,
      props: {
        label: type === "Button" ? "Click" : undefined,
        placeholder: type === "Input" ? "Name" : undefined,
        text: type === "Label" ? "Label" : undefined,
      },
    };
    setModel({ components: [...model.components, newComp] });
  };

  const renderComponent = (comp: UIComponent) => {
    switch (comp.type) {
      case "Button":
        return <ButtonComp id={comp.id} label={comp.props.label} />;
      case "Input":
        return <InputComp id={comp.id} placeholder={comp.props.placeholder} />;
      case "Label":
        return <LabelComp id={comp.id} text={comp.props.text} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 p-3 space-y-2">
        <h2 className="text-white font-semibold mb-2">Add Components</h2>
        {["Button", "Input", "Label"].map((type) => (
          <button
            key={type}
            onClick={() => addComponent(type as any)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 w-full rounded"
          >
            + {type}
          </button>
        ))}
      </div>

      {/* Canvas Area */}
      <div
        className="flex-1 relative bg-gray-900"
        style={{ height: "80vh" }}
        onClick={() => setSelectedId(null)}
      >
        {model.components.map((comp) => (
          <ComponentWrapper
            key={comp.id}
            comp={comp}
            onSelect={setSelectedId}
            onMove={(id, x, y) => {
              const updated = model.components.map((c) =>
                c.id === id ? { ...c, x, y } : c
              );
              setModel({ components: updated });
            }}
          >
            {renderComponent(comp)}
          </ComponentWrapper>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
