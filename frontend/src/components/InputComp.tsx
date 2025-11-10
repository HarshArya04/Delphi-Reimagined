import React from "react";

interface InputProps {
  id: string;
  placeholder?: string;
}

const InputComp: React.FC<InputProps> = ({ id, placeholder = "Enter text" }) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      className="border border-gray-400 px-2 py-1 rounded text-black"
    />
  );
};

export default InputComp;
