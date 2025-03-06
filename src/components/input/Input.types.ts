import { ChangeEvent, InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
