import { useState, useEffect } from "react";
import { taskService } from "@/services/api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, status);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      );
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const assignTask = async (taskId, assignedTo) => {
    try {
      const updatedTask = await taskService.assignTask(taskId, assignedTo);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      );
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const setDueDate = async (taskId, dueDate) => {
    try {
      const updatedTask = await taskService.setDueDate(taskId, dueDate);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      );
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getTasksByLevel = (levelId) => {
    return tasks.filter(task => task.levelId === levelId);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    updateTaskStatus,
    assignTask,
    setDueDate,
    getTasksByLevel,
    refetch: loadTasks
  };
};