import React from "react";

interface ButtonProps {
  id: string;
  label?: string;
  onClick?: () => void;
}

const ButtonComp: React.FC<ButtonProps> = ({ id, label = "Button", onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
    >
      {label}
    </button>
  );
};

export default ButtonComp;
