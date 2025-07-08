import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import { Button } from "@/components/atoms/Button";
import { ApperIcon } from "@/components/ApperIcon";
import { projectService } from "@/services/api/projectService";
import { taskService } from "@/services/api/taskService";

const Layout = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await projectService.getAll();
      setProjects(projectsData);
      if (projectsData.length > 0 && !selectedProject) {
        setSelectedProject(projectsData[0]);
      }
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    try {
      const newProjectData = {
        name: `Project ${projects.length + 1}`,
        createdAt: new Date().toISOString().split('T')[0],
        totalXP: 0,
        completedTasks: 0,
        totalTasks: 30
      };
      
      const newProject = await projectService.create(newProjectData);
      await taskService.createTasksForProject(newProject.Id);
      
      setProjects(prev => [...prev, newProject]);
      setSelectedProject(newProject);
      toast.success("New project created successfully!");
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setSidebarOpen(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* Mobile sidebar toggle */}
        <button
          className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <ApperIcon name="Menu" size={20} />
        </button>

        {/* Sidebar */}
        <div className={`fixed lg:relative inset-y-0 left-0 z-40 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="h-full flex flex-col pt-20 lg:pt-8">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="text-center py-8">
                  <ApperIcon name="Loader2" size={24} className="animate-spin mx-auto mb-2" />
                  <p className="text-gray-500">Loading projects...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {projects.map((project) => (
                    <button
                      key={project.Id}
                      onClick={() => handleProjectSelect(project)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        selectedProject?.Id === project.Id
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{project.name}</h3>
                          <p className={`text-sm ${
                            selectedProject?.Id === project.Id ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            {project.completedTasks}/{project.totalTasks} tasks
                          </p>
                        </div>
                        <div className={`text-right ${
                          selectedProject?.Id === project.Id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          <p className="text-sm">{project.totalXP} XP</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <Button
                onClick={handleCreateProject}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <ApperIcon name="Plus" size={16} />
                Add New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-0 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ selectedProject }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;