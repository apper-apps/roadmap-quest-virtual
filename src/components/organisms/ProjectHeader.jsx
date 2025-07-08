import { motion } from "framer-motion";
import XPCounter from "@/components/molecules/XPCounter";
import ProgressBar from "@/components/atoms/ProgressBar";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ProjectHeader = ({ 
  project, 
  stats, 
  className 
}) => {
  if (!project || !stats) return null;

  return (
<motion.div
      className={cn(
        "bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white shadow-soft-lg",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-display font-bold mb-2">
            {project.name}
          </h1>
          <p className="text-white/80 mb-4">
            Track your website development journey through 6 milestone levels
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.completedTasks}</div>
              <div className="text-sm text-white/80">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.workingTasks}</div>
              <div className="text-sm text-white/80">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.pendingTasks}</div>
              <div className="text-sm text-white/80">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.totalTasks}</div>
              <div className="text-sm text-white/80">Total Tasks</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{stats.overallProgress}%</span>
            </div>
<div className="w-full bg-white/25 rounded-full h-3">
              <motion.div
                className="bg-white rounded-full h-3 shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${stats.overallProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ApperIcon name="Trophy" className="w-5 h-5" />
            <span className="text-sm">Level Progress</span>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <div
                key={level}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                  "bg-white/20 text-white/80"
                )}
              >
                {level}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectHeader;