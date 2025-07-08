import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

export const taskService = {
  getAllTasks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...tasks]);
      }, 300);
    });
  },

  getTaskById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = tasks.find(t => t.Id === parseInt(id));
        if (task) {
          resolve({ ...task });
        } else {
          reject(new Error("Task not found"));
        }
      }, 200);
    });
  },

  getTasksByLevel: (levelId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const levelTasks = tasks.filter(t => t.levelId === parseInt(levelId));
        resolve([...levelTasks]);
      }, 300);
    });
  },

  updateTask: (id, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = tasks.findIndex(t => t.Id === parseInt(id));
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...updates };
          resolve({ ...tasks[index] });
        } else {
          reject(new Error("Task not found"));
        }
      }, 200);
    });
  },

  updateTaskStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = tasks.findIndex(t => t.Id === parseInt(id));
        if (index !== -1) {
          tasks[index] = { ...tasks[index], status };
          resolve({ ...tasks[index] });
        } else {
          reject(new Error("Task not found"));
        }
      }, 200);
    });
  },

  assignTask: (id, assignedTo) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = tasks.findIndex(t => t.Id === parseInt(id));
        if (index !== -1) {
          tasks[index] = { ...tasks[index], assignedTo };
          resolve({ ...tasks[index] });
        } else {
          reject(new Error("Task not found"));
        }
      }, 200);
    });
  },

  setDueDate: (id, dueDate) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = tasks.findIndex(t => t.Id === parseInt(id));
        if (index !== -1) {
          tasks[index] = { ...tasks[index], dueDate };
          resolve({ ...tasks[index] });
        } else {
          reject(new Error("Task not found"));
        }
      }, 200);
    });
  }
};