import levelsData from "@/services/mockData/levels.json";

let levels = [...levelsData];

export const levelService = {
  getAllLevels: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...levels]);
      }, 300);
    });
  },

  getLevelById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const level = levels.find(l => l.Id === parseInt(id));
        if (level) {
          resolve({ ...level });
        } else {
          reject(new Error("Level not found"));
        }
      }, 200);
    });
  },

  getLevelProgress: (levelId, tasks) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const levelTasks = tasks.filter(t => t.levelId === parseInt(levelId));
        const completedTasks = levelTasks.filter(t => t.status === "complete");
        const workingTasks = levelTasks.filter(t => t.status === "working");
        
        const progress = {
          total: levelTasks.length,
          completed: completedTasks.length,
          working: workingTasks.length,
          pending: levelTasks.length - completedTasks.length - workingTasks.length,
          percentage: levelTasks.length > 0 ? Math.round((completedTasks.length / levelTasks.length) * 100) : 0,
          isComplete: completedTasks.length === levelTasks.length
        };
        
        resolve(progress);
      }, 100);
    });
  }
};