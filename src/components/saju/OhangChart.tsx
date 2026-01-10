import { motion } from "framer-motion";

interface OhangData {
  element: string;
  name: string;
  value: number;
  color: string;
}

interface OhangChartProps {
  data: OhangData[];
}

const OhangChart = ({ data }: OhangChartProps) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-sm text-muted-foreground mb-4">오행 분석</h3>
      <div className="flex items-end justify-between gap-2 h-32">
        {data.map((item, index) => (
          <div key={item.element} className="flex flex-col items-center flex-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / maxValue) * 100}%` }}
              transition={{ delay: 0.1 * index, duration: 0.6, ease: "easeOut" }}
              className="w-full rounded-t-lg relative overflow-hidden"
              style={{ backgroundColor: item.color, minHeight: "8px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/20" />
            </motion.div>
            <div className="mt-2 text-center">
              <div className="text-lg font-serif">{item.element}</div>
              <div className="text-xs text-muted-foreground">{item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OhangChart;
