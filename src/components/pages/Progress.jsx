import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import ProjectHeader from "@/components/organisms/ProjectHeader";
import LevelCard from "@/components/organisms/LevelCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { useProject } from "@/hooks/useProject";
import { useTasks } from "@/hooks/useTasks";
import { useAchievements } from "@/hooks/useAchievements";
import { levelService } from "@/services/api/levelService";

const Progress = () => {
  const { projectId } = useParams();
  const { selectedProject } = useOutletContext();
  const { calculateStats } = useProject();
  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError, 
    updateTaskStatus, 
    assignTask, 
    setDueDate,
    refetch: refetchTasks
  } = useTasks(selectedProject?.Id);
  const { 
    achievements, 
    loading: achievementsLoading, 
    error: achievementsError, 
    unlockAchievement,
    refetch: refetchAchievements
  } = useAchievements();

  const [levels, setLevels] = useState([]);
  const [levelsLoading, setLevelsLoading] = useState(true);
  const [levelsError, setLevelsError] = useState(null);
  const [projectStats, setProjectStats] = useState(null);

  const loadLevels = async () => {
    try {
      setLevelsLoading(true);
      setLevelsError(null);
      const levelsData = await levelService.getAllLevels();
      setLevels(levelsData);
    } catch (err) {
      setLevelsError(err.message);
    } finally {
      setLevelsLoading(false);
    }
  };

  const checkAchievements = async () => {
    for (const level of levels) {
      const levelTasks = tasks.filter(task => task.levelId === level.Id);
      const completedTasks = levelTasks.filter(task => task.status === "complete");
      
      if (levelTasks.length > 0 && completedTasks.length === levelTasks.length) {
        const achievement = achievements.find(a => a.levelId === level.Id);
        if (achievement && !achievement.unlocked) {
          try {
            await unlockAchievement(level.Id);
            toast.success(`🎉 Achievement unlocked: ${achievement.name}!`);
          } catch (error) {
            console.error("Failed to unlock achievement:", error);
          }
        }
      }
    }
  };

  const handleTaskStatusChange = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status);
      const projectTasks = tasks.filter(t => t.projectId === selectedProject?.Id);
      const updatedStats = await calculateStats(projectTasks);
      setProjectStats(updatedStats);
      
      setTimeout(() => {
        checkAchievements();
      }, 100);
    } catch (error) {
      throw error;
    }
  };

  const handleTaskAssign = async (taskId, assignedTo) => {
    try {
      await assignTask(taskId, assignedTo);
    } catch (error) {
      throw error;
    }
  };

  const handleSetTaskDueDate = async (taskId, dueDate) => {
    try {
      await setDueDate(taskId, dueDate);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadLevels();
  }, []);

  useEffect(() => {
    if (tasks.length > 0 && selectedProject) {
      const projectTasks = tasks.filter(t => t.projectId === selectedProject.Id);
      calculateStats(projectTasks).then(stats => {
        setProjectStats(stats);
      });
    }
  }, [tasks, selectedProject, calculateStats]);

  useEffect(() => {
    if (tasks.length > 0 && achievements.length > 0 && levels.length > 0) {
      checkAchievements();
    }
  }, [tasks, achievements, levels]);

  const loading = tasksLoading || achievementsLoading || levelsLoading;
  const error = tasksError || achievementsError || levelsError;

  if (!selectedProject) {
    return (
      <Empty
        title="No project selected"
        description="Please select a project from the sidebar to view its progress"
        icon="FolderOpen"
      />
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={() => {
          refetchTasks();
          refetchAchievements();
          loadLevels();
        }} 
      />
    );
  }

  const projectTasks = tasks.filter(t => t.projectId === selectedProject.Id);

  if (projectTasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        description="This project's tasks will appear here once they're loaded"
        icon="CheckSquare"
        onAction={() => window.location.reload()}
        actionLabel="Reload"
      />
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProjectHeader 
        project={selectedProject} 
        stats={projectStats}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {levels.slice(0, Math.ceil(levels.length / 2)).map((level) => {
              const achievement = achievements.find(a => a.levelId === level.Id);
              return (
                <LevelCard
                  key={level.Id}
                  level={level}
                  tasks={projectTasks}
                  achievement={achievement}
                  onTaskStatusChange={handleTaskStatusChange}
                  onTaskAssign={handleTaskAssign}
                  onSetTaskDueDate={handleSetTaskDueDate}
                />
              );
            })}
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {levels.slice(Math.ceil(levels.length / 2)).map((level) => {
              const achievement = achievements.find(a => a.levelId === level.Id);
              return (
                <LevelCard
                  key={level.Id}
                  level={level}
                  tasks={projectTasks}
                  achievement={achievement}
                  onTaskStatusChange={handleTaskStatusChange}
                  onTaskAssign={handleTaskAssign}
                  onSetTaskDueDate={handleSetTaskDueDate}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Progress;