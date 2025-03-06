import { ButtonHTMLAttributes } from "react";

export type ButtonSize = "sm" | "md";
export type ButtonVariant = "primary" | "secondary" | "danger";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
};
