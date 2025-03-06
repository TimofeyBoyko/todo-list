import { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

const Button = ({ 
  text, 
  size = "md", 
  variant = "primary",
  className = "", 
  ...props 
}: ButtonProps) => {
  // Size classes
  const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-6 px-3 text-sm",
    md: "h-8 px-4 text-base"
  };

  // Variant classes
  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200",
    danger: "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
  };

  return (
    <button
      {...props}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        font-medium
        rounded
        flex
        items-center
        justify-center
        transition-colors
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-opacity-50
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
