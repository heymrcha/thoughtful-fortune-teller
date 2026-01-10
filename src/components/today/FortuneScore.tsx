import { motion } from "framer-motion";

interface FortuneScoreProps {
  label: string;
  score: number;
  maxScore?: number;
  delay?: number;
}

const FortuneScore = ({ label, score, maxScore = 100, delay = 0 }: FortuneScoreProps) => {
  const percentage = (score / maxScore) * 100;
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-12 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-secondary to-brass-glow"
        />
      </div>
      <span className="text-sm font-medium text-foreground w-8 text-right">{score}</span>
    </div>
  );
};

export default FortuneScore;
