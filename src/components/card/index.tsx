import { CardProps } from "./Card.types";

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`
      w-full 
      md:w-[550px] 
      h-screen 
      md:h-[500px] 
      bg-white 
      dark:bg-gray-800 
      md:rounded-lg 
      shadow-md 
      overflow-hidden
      flex flex-col items-center justify-start
      p-6
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export default Card;
