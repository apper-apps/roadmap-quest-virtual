import { useState, useEffect } from "react";
import { achievementService } from "@/services/api/achievementService";

export const useAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      setError(null);
      const achievementsData = await achievementService.getAllAchievements();
      setAchievements(achievementsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const unlockAchievement = async (levelId) => {
    try {
      const unlockedAchievement = await achievementService.unlockAchievement(levelId);
      setAchievements(prevAchievements => 
        prevAchievements.map(achievement => 
          achievement.levelId === levelId ? unlockedAchievement : achievement
        )
      );
      return unlockedAchievement;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getAchievementByLevel = (levelId) => {
    return achievements.find(achievement => achievement.levelId === levelId);
  };

  const getUnlockedCount = () => {
    return achievements.filter(achievement => achievement.unlocked).length;
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  return {
    achievements,
    loading,
    error,
    unlockAchievement,
    getAchievementByLevel,
    getUnlockedCount,
    refetch: loadAchievements
  };
};