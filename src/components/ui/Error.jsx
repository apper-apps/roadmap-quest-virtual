import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
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
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-error/10 to-error/5 flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-error" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Oops! Something went wrong
      </h2>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}. Don't worry, this happens sometimes. Please try again.
      </p>
      
      <div className="flex gap-4">
        <Button 
          onClick={onRetry}
          variant="primary"
          className="flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          Try Again
        </Button>
        
        <Button 
          onClick={() => window.location.reload()}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4" />
          Reload Page
        </Button>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Still having trouble? This might be a temporary issue.
        </p>
      </div>
    </motion.div>
  );
};

export default Error;