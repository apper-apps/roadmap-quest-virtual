import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const AchievementBadge = ({ 
  achievement, 
  size = "default", 
  showName = true,
  className 
}) => {
  const isUnlocked = achievement.unlocked;

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300",
        {
          "bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 badge-glow": isUnlocked,
          "bg-gray-100 border-2 border-gray-300 opacity-60": !isUnlocked,
        },
        className
      )}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "rounded-full p-3 transition-all duration-300",
          {
            "bg-gradient-to-br from-primary to-secondary text-white": isUnlocked,
            "bg-gray-300 text-gray-500": !isUnlocked,
          },
          {
            "w-12 h-12": size === "sm",
            "w-16 h-16": size === "default",
            "w-20 h-20": size === "lg",
          }
        )}
      >
        <ApperIcon
          name={achievement.icon}
          className={cn({
            "w-6 h-6": size === "sm",
            "w-10 h-10": size === "default",
            "w-14 h-14": size === "lg",
          })}
        />
      </div>
      
      {showName && (
        <div className="text-center">
          <h3 className={cn(
            "font-semibold",
            {
              "text-primary": isUnlocked,
              "text-gray-500": !isUnlocked,
            },
            {
              "text-sm": size === "sm",
              "text-base": size === "default",
              "text-lg": size === "lg",
            }
          )}>
            {achievement.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {achievement.description}
          </p>
          {isUnlocked && achievement.unlockedDate && (
            <p className="text-xs text-primary mt-1">
              Unlocked: {new Date(achievement.unlockedDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
      
      {isUnlocked && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          style={{
            background: "radial-gradient(circle, rgba(184, 167, 232, 0.3) 0%, transparent 70%)",
          }}
        />
      )}
    </motion.div>
  );
};

export default AchievementBadge;