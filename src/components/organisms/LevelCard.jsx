import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ProgressBar from "@/components/atoms/ProgressBar";
import AchievementBadge from "@/components/molecules/AchievementBadge";
import TaskItem from "@/components/organisms/TaskItem";
import ApperIcon from "@/components/ApperIcon";
import { levelService } from "@/services/api/levelService";
import { cn } from "@/utils/cn";

const LevelCard = ({ 
  level, 
  tasks, 
  achievement,
  onTaskStatusChange,
  onTaskAssign,
  onSetTaskDueDate,
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState({
    total: 0,
    completed: 0,
    working: 0,
    pending: 0,
    percentage: 0,
    isComplete: false
  });

  useEffect(() => {
    const calculateProgress = async () => {
      try {
        const progressData = await levelService.getLevelProgress(level.Id, tasks);
        setProgress(progressData);
      } catch (error) {
        console.error("Failed to calculate progress:", error);
      }
    };

    calculateProgress();
  }, [level.Id, tasks]);

  const levelTasks = tasks.filter(task => task.levelId === level.Id);

  return (
    <motion.div
      className={cn(
        "level-card rounded-xl p-6 shadow-soft",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ 
              background: `linear-gradient(135deg, ${level.color} 0%, ${level.color}80 100%)` 
            }}
          >
            <ApperIcon name={level.badgeIcon} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{level.name}</h3>
            <p className="text-sm text-gray-600">{level.description}</p>
          </div>
        </div>
        
        {achievement && (
          <AchievementBadge 
            achievement={achievement} 
            size="sm" 
            showName={false}
          />
        )}
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {progress.completed}/{progress.total} tasks
          </span>
          <span className="text-sm font-medium text-gray-700">
            {progress.percentage}%
          </span>
        </div>
        <ProgressBar 
          value={progress.percentage} 
          showValue={false}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4 text-sm">
          <span className="text-success">
            ✓ {progress.completed} Complete
          </span>
          <span className="text-warning">
            ⚡ {progress.working} Working
          </span>
          <span className="text-error">
            ⏸ {progress.pending} Pending
          </span>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? "Hide Tasks" : "View Tasks"}
          <ApperIcon
            name={isExpanded ? "ChevronUp" : "ChevronDown"}
            className="w-4 h-4"
          />
        </button>
      </div>

      {isExpanded && (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          {levelTasks.map((task) => (
            <TaskItem
              key={task.Id}
              task={task}
              onStatusChange={onTaskStatusChange}
              onAssign={onTaskAssign}
              onSetDueDate={onSetTaskDueDate}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default LevelCard;