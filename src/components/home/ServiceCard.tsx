import { motion } from "framer-motion";
import { LucideIcon, ChevronRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
  onClick?: () => void;
}

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  delay = 0,
  onClick,
}: ServiceCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-200 w-full text-left group"
    >
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-secondary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
    </motion.button>
  );
};

export default ServiceCard;
