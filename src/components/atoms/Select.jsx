import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(({ 
  className, 
  children, 
  size = "default", 
  error = false,
  ...props 
}, ref) => {
  return (
    <select
      className={cn(
        "flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "px-2 py-1 text-xs": size === "sm",
          "px-3 py-2 text-sm": size === "default",
          "px-4 py-3 text-base": size === "lg",
        },
        {
          "border-error focus:ring-error/50": error,
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;