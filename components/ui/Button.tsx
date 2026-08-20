import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
}

export function Button({ variant = "solid", size = "md", className = "", children, ...rest }: ButtonProps) {
  const variantClass = variant === "solid" ? "btn-solid" : variant === "outline" ? "btn-outline" : "btn-ghost";
  const sizeClass = size === "lg" ? "btn-lg" : "";
  return (
    <button className={`btn ${variantClass} ${sizeClass} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
