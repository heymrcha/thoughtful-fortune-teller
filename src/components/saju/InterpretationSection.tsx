import { motion } from "framer-motion";
import { ChevronRight, Star, Heart, Briefcase, Sparkles } from "lucide-react";

interface InterpretationSectionProps {
  title: string;
  icon: "star" | "heart" | "briefcase" | "sparkles";
  summary: string;
  details: string[];
  delay?: number;
}

const iconMap = {
  star: Star,
  heart: Heart,
  briefcase: Briefcase,
  sparkles: Sparkles,
};

const InterpretationSection = ({
  title,
  icon,
  summary,
  details,
  delay = 0,
}: InterpretationSectionProps) => {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-card rounded-2xl p-6 shadow-card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
          <Icon className="w-5 h-5 text-secondary" />
        </div>
        <h3 className="font-serif font-semibold text-foreground">{title}</h3>
      </div>
      
      <p className="text-foreground leading-relaxed mb-4">{summary}</p>
      
      <div className="space-y-2">
        {details.map((detail, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default InterpretationSection;
