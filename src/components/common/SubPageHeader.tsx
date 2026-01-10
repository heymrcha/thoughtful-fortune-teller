import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface SubPageHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
}

const SubPageHeader = ({ title, subtitle, onBack }: SubPageHeaderProps) => {
  return (
    <div className="flex items-center gap-3 pt-4">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="w-10 h-10 rounded-xl bg-card flex items-center justify-center shadow-soft"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </motion.button>
      <div>
        <h1 className="text-xl font-serif font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
};

export default SubPageHeader;
