import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TodayCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const TodayCard = ({ children, delay = 0, className = "" }: TodayCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`bg-card rounded-2xl p-6 shadow-card ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default TodayCard;
