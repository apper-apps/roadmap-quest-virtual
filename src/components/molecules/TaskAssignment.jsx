import { useState } from "react";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const TaskAssignment = ({ 
  currentAssignee = "", 
  onAssign, 
  className 
}) => {
  const [selectedAssignee, setSelectedAssignee] = useState(currentAssignee);
  const [isEditing, setIsEditing] = useState(false);

  const teamMembers = [
    { value: "", label: "Unassigned" },
    { value: "MySelf", label: "MySelf" },
    { value: "Naveed Kalro", label: "Naveed Kalro" },
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Alex Johnson", label: "Alex Johnson" }
  ];

  const handleSave = () => {
    onAssign(selectedAssignee);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedAssignee(currentAssignee);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-sm text-gray-600">
          {currentAssignee || "Unassigned"}
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
      <Select
        value={selectedAssignee}
        onChange={(e) => setSelectedAssignee(e.target.value)}
        size="sm"
      >
        {teamMembers.map(member => (
          <option key={member.value} value={member.value}>
            {member.label}
          </option>
        ))}
      </Select>
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

export default TaskAssignment;