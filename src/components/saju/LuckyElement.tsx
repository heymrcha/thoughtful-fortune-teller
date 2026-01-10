import { motion } from "framer-motion";
import { Compass, Palette } from "lucide-react";

interface LuckyElementProps {
  type: "color" | "direction";
  value: string;
  description: string;
  colorCode?: string;
}

const LuckyElement = ({ type, value, description, colorCode }: LuckyElementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-2xl p-5 shadow-card flex items-center gap-4"
    >
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center"
        style={colorCode ? { backgroundColor: colorCode } : undefined}
      >
        {type === "color" ? (
          <Palette className="w-6 h-6 text-primary-foreground" />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
            <Compass className="w-6 h-6 text-secondary" />
          </div>
        )}
      </div>
      <div>
        <div className="text-sm text-muted-foreground">
          {type === "color" ? "행운의 색" : "행운의 방향"}
        </div>
        <div className="font-serif font-semibold text-lg text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </motion.div>
  );
};

export default LuckyElement;
