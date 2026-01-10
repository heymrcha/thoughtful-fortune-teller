import { motion } from "framer-motion";

interface PillarData {
  heavenly: string;
  earthly: string;
  label: string;
}

interface SajuChartProps {
  pillars: PillarData[];
}

const SajuChart = ({ pillars }: SajuChartProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-sm text-muted-foreground mb-4 text-center">사주명조</h3>
      <div className="grid grid-cols-4 gap-2">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="text-center"
          >
            <div className="text-xs text-muted-foreground mb-2">{pillar.label}</div>
            <div className="bg-primary rounded-lg p-3 mb-1">
              <span className="text-xl font-serif text-primary-foreground">
                {pillar.heavenly}
              </span>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <span className="text-xl font-serif text-foreground">
                {pillar.earthly}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SajuChart;
