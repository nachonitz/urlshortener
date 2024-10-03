import React from "react";

interface RegisterButtonProps {
  disabled?: boolean;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ disabled }) => {
  return (
    <button
      className={`w-full ${
        disabled ? "bg-[#ccc]" : "bg-primary"
      } text-white p-2 rounded mb-2`}
      type="submit"
      disabled={disabled}
    >
      CREAR CUENTA
    </button>
  );
};

export default RegisterButton;
