import React from "react";

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <button className="bg-primary text-white p-3 rounded" onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
