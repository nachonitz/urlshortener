import React from "react";

interface ShortenUrlButtonProps {
  disabled?: boolean;
}

const ShortenUrlButton: React.FC<ShortenUrlButtonProps> = ({ disabled }) => {
  return (
    <button
      className={`w-full ${
        disabled ? "bg-[#ccc]" : "bg-primary"
      } text-white py-2 px-5 rounded hover:brightness-110`}
      type="submit"
      disabled={disabled}
    >
      Shorten URL
    </button>
  );
};

export default ShortenUrlButton;
