import { useState, useEffect } from "react";
import { projectService } from "@/services/api/projectService";

export const useProject = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const projectData = await projectService.getCurrentProject();
      setProject(projectData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (updates) => {
    try {
      if (project) {
        const updatedProject = await projectService.updateProject(project.Id, updates);
        setProject(updatedProject);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateStats = async (tasks) => {
    try {
      const stats = await projectService.calculateProjectStats(tasks);
      await updateProject(stats);
      return stats;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  useEffect(() => {
    loadProject();
  }, []);

  return {
    project,
    loading,
    error,
    updateProject,
    calculateStats,
    refetch: loadProject
  };
};