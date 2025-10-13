import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success" | "danger" | "gradient";
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
    "rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 cursor-pointer transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl";

  const variantStyles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-blue-500/25",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-gray-500/25",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-emerald-500/25",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-rose-500/25",
    gradient:
      "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:ring-purple-500 shadow-purple-500/25 text-white",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
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
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        loading && "relative text-transparent",
        className
      )}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
