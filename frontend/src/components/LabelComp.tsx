import React from "react";

interface LabelProps {
  id: string;
  text?: string;
}

const LabelComp: React.FC<LabelProps> = ({ id, text = "Label" }) => {
  return <span id={id} className="text-white">{text}</span>;
};

export default LabelComp;
