import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const StatusIcon = forwardRef(({ 
  className, 
  status = "pending", 
  size = "default", 
  ...props 
}, ref) => {
  const getStatusIcon = () => {
    switch (status) {
      case "complete":
        return "🟢";
      case "working":
        return "🟡";
      case "pending":
      default:
        return "🔴";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "complete":
        return "status-complete";
      case "working":
        return "status-working";
      case "pending":
      default:
        return "status-pending";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        getStatusColor(),
        {
          "w-4 h-4 text-xs": size === "sm",
          "w-6 h-6 text-sm": size === "default",
          "w-8 h-8 text-base": size === "lg",
        },
        className
      )}
      ref={ref}
      title={status.charAt(0).toUpperCase() + status.slice(1)}
      {...props}
    >
      {getStatusIcon()}
    </span>
  );
});

StatusIcon.displayName = "StatusIcon";

export default StatusIcon;