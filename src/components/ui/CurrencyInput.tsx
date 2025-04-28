import { FC, InputHTMLAttributes, ReactNode, useEffect, useState } from "react";
import { FieldError } from "react-hook-form";

interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: FieldError | string;
  className?: string;
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  label,
  icon,
  error,
  className = "",
  value,
  onChange,
  onBlur,
  ...props
}) => {
  const hasError = !!error;
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value !== undefined && value !== null && value !== "") {
      setDisplayValue(formatDecimal(value.toString()));
    }
  }, [value]);

  const formatDecimal = (val: string) => {
    const cleaned = val.replace(/[^0-9.]/g, "");
    const number = parseFloat(cleaned);

    if (isNaN(number)) return "";

    return number.toFixed(2);
  };

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={props.id} className="label px-1">
          <span className="label-text text-sm font-medium text-black">{label}</span>
        </label>
      )}

      <div
        className={`flex items-center rounded-lg px-3 py-2 transition-all duration-150 ${
          hasError
            ? "border border-error focus-within:ring-2 focus-within:ring-error"
            : "border border-gray-300 focus-within:ring-2 focus-within:ring-primary"
        } ${className}`}
      >
        {icon && <span className="mr-2 text-gray-400">{icon}</span>}
        <input
          className="w-full p-0 bg-transparent text-sm focus:outline-none placeholder-gray-400"
          inputMode="decimal"
          {...props}
          value={displayValue}
          onChange={(e) => {
            const inputValue = e.target.value.replace(/[^0-9.]/g, "");
            onChange?.(e); // trigger react-hook-form event
            setDisplayValue(inputValue);
          }}
          onBlur={(e) => {
            onBlur?.(e); // trigger react-hook-form event
            const formatted = formatDecimal(e.target.value);
            onChange?.({
              ...e,
              target: {
                ...e.target,
                value: formatted,
              },
            });
            setDisplayValue(formatted);
          }}
        />
      </div>

      {hasError && (
        <p className="text-error text-xs mt-1 px-1">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default CurrencyInput;
