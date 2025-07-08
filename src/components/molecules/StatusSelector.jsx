import { useState } from "react";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import StatusIcon from "@/components/atoms/StatusIcon";
import { cn } from "@/utils/cn";

const StatusSelector = ({ 
  currentStatus = "pending", 
  onStatusChange, 
  className 
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isEditing, setIsEditing] = useState(false);

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "working", label: "Working" },
    { value: "complete", label: "Complete" }
  ];

  const handleSave = () => {
    onStatusChange(selectedStatus);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedStatus(currentStatus);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <StatusIcon status={currentStatus} size="sm" />
        <span className="text-sm text-gray-600 capitalize">
          {currentStatus}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
        >
          Change
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        size="sm"
      >
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
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

export default StatusSelector;