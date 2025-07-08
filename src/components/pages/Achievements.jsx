import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import ProjectHeader from "@/components/organisms/ProjectHeader";
import AchievementGallery from "@/components/organisms/AchievementGallery";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { useProject } from "@/hooks/useProject";
import { useTasks } from "@/hooks/useTasks";
import { useAchievements } from "@/hooks/useAchievements";

const Achievements = () => {
  const { projectId } = useParams();
  const { selectedProject } = useOutletContext();
  const { calculateStats } = useProject();
  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError, 
    refetch: refetchTasks
  } = useTasks(selectedProject?.Id);
  const { 
    achievements, 
    loading: achievementsLoading, 
    error: achievementsError, 
    refetch: refetchAchievements
  } = useAchievements();

  const [projectStats, setProjectStats] = useState(null);

  useEffect(() => {
    if (tasks.length > 0 && selectedProject) {
      const projectTasks = tasks.filter(t => t.projectId === selectedProject.Id);
      calculateStats(projectTasks).then(stats => {
        setProjectStats(stats);
      });
    }
  }, [tasks, selectedProject, calculateStats]);

  const loading = tasksLoading || achievementsLoading;
  const error = tasksError || achievementsError;

  if (!selectedProject) {
    return (
      <Empty
        title="No project selected"
        description="Please select a project from the sidebar to view its achievements"
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
        }} 
      />
    );
  }

  if (achievements.length === 0) {
    return (
      <Empty
        title="No achievements found"
        description="Complete tasks to unlock achievements for this project"
        icon="Award"
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
      
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Project Achievements
          </h2>
          <p className="text-gray-600">
            Track your progress and celebrate your accomplishments
          </p>
        </div>
        
        <AchievementGallery achievements={achievements} />
      </div>
    </motion.div>
  );
};

export default Achievements;