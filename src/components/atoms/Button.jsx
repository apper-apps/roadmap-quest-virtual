import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "btn-primary": variant === "primary",
          "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50": variant === "secondary",
          "bg-transparent text-gray-600 hover:bg-gray-100": variant === "ghost",
          "bg-success text-white hover:bg-success/90": variant === "success",
          "bg-error text-white hover:bg-error/90": variant === "error",
          "bg-warning text-gray-800 hover:bg-warning/90": variant === "warning",
        },
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2": size === "default",
          "px-6 py-3 text-lg": size === "lg",
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;