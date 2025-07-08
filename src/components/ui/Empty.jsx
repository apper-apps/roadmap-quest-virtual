import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Empty = ({ 
  title = "No data found",
  description = "Get started by creating your first item",
  actionLabel = "Get Started",
  onAction,
  icon = "Package",
  className 
}) => {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-12 h-12 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {title}
      </h2>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          {actionLabel}
        </Button>
      )}
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Need help getting started? Check out our guide!
        </p>
      </div>
    </motion.div>
  );
};

export default Empty;