import projectsData from "@/services/mockData/projects.json";

let projects = [...projectsData];
let nextId = Math.max(...projects.map(p => p.Id)) + 1;

export const projectService = {
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...projects]);
      }, 300);
    });
  },

  getCurrentProject: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...projects[0] });
      }, 300);
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const project = projects.find(p => p.Id === parseInt(id));
        if (project) {
          resolve({ ...project });
        } else {
          reject(new Error("Project not found"));
        }
      }, 200);
    });
  },

  create: (projectData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProject = {
          ...projectData,
          Id: nextId++,
          createdAt: projectData.createdAt || new Date().toISOString().split('T')[0]
        };
        projects.push(newProject);
        resolve({ ...newProject });
      }, 400);
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = projects.findIndex(p => p.Id === parseInt(id));
        if (index !== -1) {
          const deleted = projects.splice(index, 1)[0];
          resolve({ ...deleted });
        } else {
          reject(new Error("Project not found"));
        }
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