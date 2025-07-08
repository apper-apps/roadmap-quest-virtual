import { useState, useEffect } from "react";
import { projectService } from "@/services/api/projectService";

export const useProject = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const projectsData = await projectService.getAll();
      setProjects(projectsData);
      if (projectsData.length > 0 && !currentProject) {
        setCurrentProject(projectsData[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      const newProject = await projectService.create(projectData);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const selectProject = (project) => {
    setCurrentProject(project);
  };

const updateProject = async (projectId, updates) => {
    try {
      const updatedProject = await projectService.updateProject(projectId, updates);
      setProjects(prev => prev.map(p => p.Id === projectId ? updatedProject : p));
      if (currentProject?.Id === projectId) {
        setCurrentProject(updatedProject);
      }
      return updatedProject;
    } catch (err) {
      setError(err.message);
      throw err;
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
    loadProjects();
  }, []);

  return {
    projects,
    currentProject,
    loading,
    error,
    createProject,
    updateProject,
    selectProject,
    calculateStats,
    refetch: loadProjects
  };
};