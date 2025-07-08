import achievementsData from "@/services/mockData/achievements.json";

let achievements = [...achievementsData];

export const achievementService = {
  getAllAchievements: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...achievements]);
      }, 300);
    });
  },

  getAchievementById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const achievement = achievements.find(a => a.Id === parseInt(id));
        if (achievement) {
          resolve({ ...achievement });
        } else {
          reject(new Error("Achievement not found"));
        }
      }, 200);
    });
  },

  unlockAchievement: (levelId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = achievements.findIndex(a => a.levelId === parseInt(levelId));
        if (index !== -1) {
          achievements[index] = { 
            ...achievements[index], 
            unlocked: true, 
            unlockedDate: new Date().toISOString() 
          };
          resolve({ ...achievements[index] });
        } else {
          reject(new Error("Achievement not found"));
        }
      }, 200);
    });
  },

  getUnlockedAchievements: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const unlocked = achievements.filter(a => a.unlocked);
        resolve([...unlocked]);
      }, 200);
    });
  }
};