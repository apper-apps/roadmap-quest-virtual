import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";
const Header = ({ className }) => {
  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 glass-effect border-b border-white/20",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
<div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <ApperIcon name="Map" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold gradient-text">
                RoadMap Quest
              </h1>
              <p className="text-xs text-gray-500">
                Gamified Website Development
              </p>
            </div>
          </div>
          
<nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to={`/progress/project_${useOutletContext()?.selectedProject?.Id || 1}`}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Progress
            </Link>
            <Link 
              to={`/achievements/project_${useOutletContext()?.selectedProject?.Id || 1}`}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Achievements
            </Link>
            <a 
              href="#team" 
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              Team
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;