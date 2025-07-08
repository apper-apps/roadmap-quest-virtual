import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header Loading */}
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl h-48 animate-pulse" />
      
      {/* Stats Loading */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-soft animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-soft animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-soft animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      
      {/* Level Cards Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-6 shadow-soft animate-pulse"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded w-full" />
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;