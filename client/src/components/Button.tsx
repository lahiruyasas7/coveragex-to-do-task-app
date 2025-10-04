import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className,
  loading = false,
}) => {
  const baseStyles =
    "rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
