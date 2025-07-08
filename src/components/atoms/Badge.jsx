import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-all duration-200",
        {
          "bg-primary/10 text-primary": variant === "default",
          "bg-success/10 text-success": variant === "success",
          "bg-error/10 text-error": variant === "error",
          "bg-warning/10 text-warning": variant === "warning",
          "bg-info/10 text-info": variant === "info",
          "bg-gradient-to-r from-primary to-secondary text-white badge-glow": variant === "premium",
        },
        {
          "px-2 py-0.5 text-xs": size === "sm",
          "px-2.5 py-1 text-sm": size === "default",
          "px-3 py-1.5 text-base": size === "lg",
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;