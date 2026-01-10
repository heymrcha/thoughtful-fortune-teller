import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CoreServiceCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
  onClick?: () => void;
}

const CoreServiceCard = ({
  title,
  subtitle,
  icon: Icon,
  gradient,
  delay = 0,
  onClick,
}: CoreServiceCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-5 text-left w-full ${gradient} shadow-card hover:shadow-elevated transition-shadow duration-300`}
    >
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="80" cy="20" r="40" fill="currentColor" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-serif font-semibold text-primary-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-primary-foreground/80">{subtitle}</p>
      </div>
    </motion.button>
  );
};

export default CoreServiceCard;
