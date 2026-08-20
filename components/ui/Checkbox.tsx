import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export function Checkbox({ label, description, id, className = "", ...rest }: CheckboxProps) {
  const checkId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label htmlFor={checkId} className={`checkbox-row ${className}`.trim()}>
      <input id={checkId} type="checkbox" {...rest} />
      <span>
        <strong>{label}</strong>
        {description ? <small>{description}</small> : null}
      </span>
    </label>
  );
}
