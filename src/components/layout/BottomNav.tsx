import { motion } from "framer-motion";
import { Home, Sun, Sparkles, MessageCircle, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "홈", icon: Home },
  { id: "today", label: "오늘하루", icon: Sun },
  { id: "tarot", label: "타로", icon: Sparkles },
  { id: "consult", label: "상담", icon: MessageCircle },
  { id: "my", label: "MY", icon: User },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center w-16 h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-1 w-10 h-10 rounded-full bg-primary/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[10px] mt-1 transition-colors duration-200 ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area for mobile */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  );
};

export default BottomNav;
