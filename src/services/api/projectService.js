import projectsData from "@/services/mockData/projects.json";

let projects = [...projectsData];

export const projectService = {
  getCurrentProject: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...projects[0] });
      }, 300);
    });
  },

  updateProject: (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = projects.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          projects[index] = { ...projects[index], ...updates };
          resolve({ ...projects[index] });
        } else {
          reject(new Error("Project not found"));
        }
      }, 200);
    });
  },

  calculateProjectStats: (tasks) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const completedTasks = tasks.filter(t => t.status === "complete");
        const totalXP = completedTasks.reduce((sum, task) => sum + task.xpValue, 0);
        const totalPossibleXP = tasks.reduce((sum, task) => sum + task.xpValue, 0);
        const overallProgress = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
        
        const stats = {
          totalXP,
          totalPossibleXP,
          completedTasks: completedTasks.length,
          totalTasks: tasks.length,
          overallProgress,
          workingTasks: tasks.filter(t => t.status === "working").length,
          pendingTasks: tasks.filter(t => t.status === "pending").length
        };
        
        resolve(stats);
      }, 100);
    });
  }
};