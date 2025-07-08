import { motion } from "framer-motion";
import AchievementBadge from "@/components/molecules/AchievementBadge";
import { cn } from "@/utils/cn";

const AchievementGallery = ({ 
  achievements = [], 
  className 
}) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
<motion.div
      className={cn(
        "bg-surface rounded-xl shadow-soft p-6 border border-primary/10",
        className
      )}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
<div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
        <div className="text-sm text-gray-600">
          {unlockedCount}/{totalCount} Unlocked
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <AchievementBadge
            key={achievement.Id}
            achievement={achievement}
            size="sm"
            showName={true}
          />
        ))}
      </div>

      {unlockedCount === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">No achievements unlocked yet</p>
          <p className="text-sm text-gray-400">
            Complete level tasks to unlock badges!
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default AchievementGallery;