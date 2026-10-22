import EmotionalRecommendations from "@/components/today/EmotionalRecommendations";
import { motion } from "framer-motion";
import { ChevronRight, Sun, Moon, Sparkles } from "lucide-react";
import TodayCard from "@/components/today/TodayCard";
import FortuneScore from "@/components/today/FortuneScore";
import { dailyScores } from "@/lib/sample-data";

interface TodayTabProps {
  onNavigate: (destination: string) => void;
}

const TodayTab = ({ onNavigate }: TodayTabProps) => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayName = dayNames[today.getDay()];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Date Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-4"
      >
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
        <h1 className="text-2xl font-serif font-bold text-foreground">{dayName}</h1>
      </motion.div>

      {/* Mind Card - Main Focus */}
      <TodayCard delay={0.1} className="bg-gradient-premium text-primary-foreground">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
            <Sun className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm text-primary-foreground/80 mb-1">오늘의 마음가짐</h2>
            <p className="text-lg font-serif font-medium leading-relaxed">
              "흐름에 맡기되, 중심을 잃지 마세요. 
              오늘은 관계에서 작은 이해가 큰 변화를 만드는 날입니다."
            </p>
          </div>
        </div>
      </TodayCard>

      {/* Short Fortune */}
      <TodayCard delay={0.2}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm text-muted-foreground mb-1">오늘의 총운</h2>
            <p className="text-foreground leading-relaxed">
              작은 결정들이 모여 큰 방향을 만듭니다. 
              급하게 결론짓기보다 여유를 갖고 관찰하세요.
            </p>
          </div>
        </div>
      </TodayCard>

      {/* Score Card */}
      <TodayCard delay={0.3}>
        <h2 className="text-sm text-muted-foreground mb-4">오늘의 점수</h2>
        <div className="space-y-3">
          <FortuneScore label="총운" score={dailyScores.total} delay={0.4} />
          <FortuneScore label="재물" score={dailyScores.wealth} delay={0.5} />
          <FortuneScore label="건강" score={dailyScores.health} delay={0.6} />
          <FortuneScore label="애정" score={dailyScores.love} delay={0.7} />
        </div>
      </TodayCard>

      {/* CTA to Detail */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate("daily-detail")}
        className="w-full flex items-center justify-between p-5 bg-card rounded-2xl shadow-card group"
      >
        <div className="flex items-center gap-3">
          <Moon className="w-5 h-5 text-secondary" />
          <span className="font-medium text-foreground">오늘의 운세 상세 보기</span>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
      </motion.button>

      {/* Emotional Recommendation Preview */}
      <TodayCard delay={0.6} className="pb-8">
        <h2 className="text-sm text-muted-foreground mb-4">오늘의 감성 추천</h2>
        <EmotionalRecommendations />
      </TodayCard>
    </motion.div>
  );
};

export default TodayTab;
