import { InputProps } from "./Input.types";

const Input = ({
  value,
  onChange,
  className = "",
  type = "text",
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      {...props}
      className={`
        w-full
        h-8
        px-4
        py-1
        border
        border-gray-300
        dark:border-gray-600
        rounded-md
        bg-white
        dark:bg-gray-700
        text-gray-900
        dark:text-white
        placeholder-gray-400
        dark:placeholder-gray-500
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-transparent
        disabled:opacity-50
        disabled:cursor-not-allowed
        transition-colors
        duration-200
        ${className}
      `}
    />
  );
};

export default Input;
