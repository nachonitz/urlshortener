import React from "react";
import { FieldError } from "react-hook-form";

interface InputFieldProps {
  type: string;
  placeholder: string;
  error?: FieldError;
  register: any;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  error,
  register,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      className="rounded pl-10 pr-4 py-2 w-full bg-gray-700 text-white placeholder-gray-300 border-gray-500 focus:border-blue-400 focus:ring-blue-400 focus:outline-none"
      {...register}
    />
  );
};

export default InputField;
