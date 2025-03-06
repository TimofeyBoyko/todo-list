import { HeadingProps } from "./Heading.types";

const Heading = ({ text, className = "" }: HeadingProps) => {
  return <h1 className={`text-2xl font-bold select-none text-white ${className}`}>{text}</h1>;
};

export default Heading;
