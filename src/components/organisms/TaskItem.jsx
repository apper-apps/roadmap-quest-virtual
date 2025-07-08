import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import StatusIcon from "@/components/atoms/StatusIcon";
import Badge from "@/components/atoms/Badge";
import TaskAssignment from "@/components/molecules/TaskAssignment";
import TaskDueDate from "@/components/molecules/TaskDueDate";
import StatusSelector from "@/components/molecules/StatusSelector";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskItem = ({ 
  task, 
  onStatusChange, 
  onAssign, 
  onSetDueDate,
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = async (newStatus) => {
    try {
      await onStatusChange(task.Id, newStatus);
      toast.success(`Task status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  const handleAssign = async (assignedTo) => {
    try {
      await onAssign(task.Id, assignedTo);
      toast.success(`Task assigned to ${assignedTo || "Unassigned"}`);
    } catch (error) {
      toast.error("Failed to assign task");
    }
  };

  const handleSetDueDate = async (dueDate) => {
    try {
      await onSetDueDate(task.Id, dueDate);
      toast.success("Due date updated");
    } catch (error) {
      toast.error("Failed to update due date");
    }
  };

  return (
    <motion.div
      className={cn(
        "task-card rounded-xl p-4 cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-500 min-w-[2rem]">
            #{task.Id}
          </span>
          <StatusIcon status={task.status} />
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{task.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default" size="sm">
                {task.xpValue} XP
              </Badge>
              {task.assignedTo && (
                <Badge variant="info" size="sm">
                  {task.assignedTo}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ApperIcon
            name={isExpanded ? "ChevronUp" : "ChevronDown"}
            className="w-4 h-4 text-gray-400"
          />
        </div>
      </div>

      {isExpanded && (
        <motion.div
          className="mt-4 pt-4 border-t border-gray-200 space-y-3"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Status
              </label>
              <StatusSelector
                currentStatus={task.status}
                onStatusChange={handleStatusChange}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Assigned To
              </label>
              <TaskAssignment
                currentAssignee={task.assignedTo}
                onAssign={handleAssign}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Due Date
              </label>
              <TaskDueDate
                currentDueDate={task.dueDate}
                onSetDueDate={handleSetDueDate}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskItem;