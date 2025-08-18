import React, { useState } from "react";
import clsx from "clsx";

export default function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,       // ✅ optional clear button
  passwordToggle = false   // ✅ optional password toggle
}) {
  const [showPassword, setShowPassword] = useState(false);

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg"
  };

  const variants = {
  filled: "bg-gray-100 dark:bg-gray-800 border border-transparent focus:ring-2 focus:ring-blue-500",
  outlined: "bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 focus:ring-2 focus:ring-blue-500",
  ghost: "bg-transparent border-b border-gray-400 dark:border-gray-600 focus:ring-0 focus:border-blue-500"
};


  return (
    <div className="flex flex-col w-full mb-4">
      {label && <label className="mb-1 text-gray-700 dark:text-gray-200">{label}</label>}

      <div className="relative flex items-center">
        <input
          type={type === "password" && passwordToggle ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          className={clsx(
            "w-full rounded-md focus:outline-none disabled:bg-gray-200 dark:disabled:bg-gray-800",
            sizes[size],
            variants[variant],
            invalid && "border-red-500 focus:ring-red-500"
          )}
        />

        {/* Clear button */}
        {clearable && value && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: "" } })}
            className="absolute right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            aria-label="Clear input"
          >
            ✕
          </button>
        )}

        {/* Password toggle */}
        {type === "password" && passwordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 text-sm text-blue-600 dark:text-blue-400"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {helperText && !invalid && (
        <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>
      )}
      {invalid && errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
}
