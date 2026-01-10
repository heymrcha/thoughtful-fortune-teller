import { motion } from "framer-motion";
import { Sparkles, Heart, Activity, BookOpen, Layers } from "lucide-react";

const tarotItems = [
  { id: "today", title: "오늘의 타로", desc: "하루의 메시지를 받아보세요", icon: Sparkles },
  { id: "love", title: "연애운 타로", desc: "사랑의 흐름을 확인하세요", icon: Heart },
  { id: "health", title: "건강운 타로", desc: "건강의 방향을 살펴보세요", icon: Activity },
  { id: "study", title: "학업운 타로", desc: "학업의 기운을 점쳐보세요", icon: BookOpen },
  { id: "iking", title: "주역 타로", desc: "동양 고전의 지혜", icon: Layers },
];

const TarotTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-4"
      >
        <h1 className="text-2xl font-serif font-bold text-foreground mb-2">타로 & 네이밍</h1>
        <p className="text-muted-foreground">가볍게 즐기는 직관의 세계</p>
      </motion.div>

      {/* Tarot Grid */}
      <div className="space-y-3">
        {tarotItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 p-5 bg-card rounded-2xl shadow-card text-left group hover:shadow-elevated transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-brass flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Naming Section */}
      <div className="pt-4">
        <h2 className="text-lg font-serif font-semibold text-foreground mb-4">이름의 힘</h2>
        <div className="grid grid-cols-2 gap-3 pb-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-card rounded-2xl p-5 shadow-card text-center"
          >
            <div className="text-3xl mb-2">💑</div>
            <h3 className="font-medium text-foreground">이름 궁합</h3>
            <p className="text-xs text-muted-foreground mt-1">이름으로 보는 인연</p>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.98 }}
            className="bg-card rounded-2xl p-5 shadow-card text-center"
          >
            <div className="text-3xl mb-2">🐾</div>
            <h3 className="font-medium text-foreground">반려동물 작명</h3>
            <p className="text-xs text-muted-foreground mt-1">특별한 이름 추천</p>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TarotTab;
