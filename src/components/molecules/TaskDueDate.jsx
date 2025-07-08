import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { format } from "date-fns";
import { cn } from "@/utils/cn";

const TaskDueDate = ({ 
  currentDueDate = "", 
  onSetDueDate, 
  className 
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDueDate);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSetDueDate(selectedDate);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedDate(currentDueDate);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  if (!isEditing) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-sm text-gray-600">
          {formatDate(currentDueDate)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        size="sm"
      />
      <Button
        variant="success"
        size="sm"
        onClick={handleSave}
      >
        Save
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </div>
  );
};

export default TaskDueDate;