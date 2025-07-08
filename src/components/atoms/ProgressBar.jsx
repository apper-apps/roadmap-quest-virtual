import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const ProgressBar = forwardRef(({ 
  className, 
  value = 0, 
  max = 100, 
  size = "default", 
  showValue = true,
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)} ref={ref} {...props}>
      <div className="flex justify-between items-center mb-1">
        {showValue && (
          <span className="text-sm font-medium text-gray-700">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div
        className={cn(
          "w-full bg-gray-200 rounded-full overflow-hidden",
          {
            "h-2": size === "sm",
            "h-3": size === "default",
            "h-4": size === "lg",
          }
        )}
      >
        <div
          className="progress-bar transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;