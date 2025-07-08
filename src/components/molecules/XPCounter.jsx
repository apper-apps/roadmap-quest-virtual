import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const XPCounter = ({ 
  currentXP = 0, 
  totalXP = 0, 
  className 
}) => {
  const percentage = totalXP > 0 ? (currentXP / totalXP) * 100 : 0;

  return (
    <motion.div
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl glass-effect",
        className
      )}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
          <ApperIcon name="Zap" className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Experience Points</p>
          <p className="text-2xl font-bold xp-counter">
            {currentXP.toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="flex-1 ml-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs text-gray-500">
            {currentXP}/{totalXP} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="progress-bar h-2"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default XPCounter;