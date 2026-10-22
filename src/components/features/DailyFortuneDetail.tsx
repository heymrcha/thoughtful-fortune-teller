import EmotionalRecommendations from "@/components/today/EmotionalRecommendations";
import SampleNotice from "@/components/common/SampleNotice";
import { motion } from "framer-motion";
import { Sun, Zap, AlertTriangle, TrendingUp, Heart, DollarSign, Activity } from "lucide-react";
import SubPageHeader from "@/components/common/SubPageHeader";
import { dailyScores } from "@/lib/sample-data";

interface DailyFortuneDetailProps {
  onBack: () => void;
}

const areaScores = [
  { name: "총운", score: dailyScores.total, icon: TrendingUp, color: "#C4A35A" },
  { name: "애정운", score: dailyScores.love, icon: Heart, color: "#C75146" },
  { name: "재물운", score: dailyScores.wealth, icon: DollarSign, color: "#4A7C59" },
  { name: "건강운", score: dailyScores.health, icon: Activity, color: "#3D5A80" },
];

const DailyFortuneDetail = ({ onBack }: DailyFortuneDetailProps) => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <SubPageHeader 
        title="오늘의 운세" 
        subtitle={formattedDate} 
        onBack={onBack} 
      />

      <SampleNotice>오늘의 운세 샘플입니다. 실제 해석 엔진과 연결되어 있지 않습니다.</SampleNotice>

      {/* One Line Advice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-premium rounded-2xl p-6 shadow-elevated"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
            <Sun className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm text-primary-foreground/80 mb-2">오늘의 한 문장</h2>
            <p className="text-lg font-serif text-primary-foreground leading-relaxed">
              "급한 불부터 끄되, 방향을 잃지 마세요.
              작은 결정이 큰 변화를 만드는 날입니다."
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Guide */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-secondary" />
          <h3 className="font-serif font-semibold text-foreground">오늘의 행동지침</h3>
        </div>
        <div className="space-y-3">
          {[
            "오전에 중요한 결정을 내리세요",
            "점심 시간에는 가까운 사람과 대화를",
            "오후에는 새로운 시도보다 마무리에 집중",
            "저녁에는 충분한 휴식을 취하세요",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-secondary">{index + 1}</span>
              </div>
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scores */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <h3 className="font-serif font-semibold text-foreground mb-4">오늘의 점수</h3>
        <div className="space-y-4">
          {areaScores.map((area, index) => (
            <div key={area.name} className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${area.color}20` }}
              >
                <area.icon className="w-5 h-5" style={{ color: area.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{area.name}</span>
                  <span className="text-sm font-bold" style={{ color: area.color }}>{area.score}점</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${area.score}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: area.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Detailed Interpretation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <h3 className="font-serif font-semibold text-foreground mb-3">오늘의 해설</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          오늘은 화(火)의 기운이 강하게 작용하는 날입니다. 
          열정과 추진력이 넘치지만, 그만큼 급하게 서두르기 쉬우니 주의가 필요합니다.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          특히 대인관계에서는 솔직한 표현이 좋은 결과를 가져옵니다. 
          미루던 대화가 있다면 오늘 용기를 내보세요.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          재물운은 평이하나, 큰 지출은 피하는 것이 좋습니다. 
          건강 면에서는 충분한 수분 섭취가 도움됩니다.
        </p>
      </motion.div>

      {/* Caution */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-muted rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-secondary" />
          <h3 className="font-medium text-foreground">오늘의 주의사항</h3>
        </div>
        <ul className="space-y-2">
          <li className="text-sm text-muted-foreground flex items-start gap-2">
            <span>•</span>
            <span>감정적인 결정은 하루 뒤로 미루세요</span>
          </li>
          <li className="text-sm text-muted-foreground flex items-start gap-2">
            <span>•</span>
            <span>오후 3-5시 사이 중요한 미팅은 피하세요</span>
          </li>
          <li className="text-sm text-muted-foreground flex items-start gap-2">
            <span>•</span>
            <span>무리한 운동보다 가벼운 산책이 좋습니다</span>
          </li>
        </ul>
      </motion.div>

      {/* Emotional Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-card rounded-2xl p-5 shadow-card pb-8"
      >
        <h3 className="font-serif font-semibold text-foreground mb-4">오늘의 감성 추천</h3>
        <EmotionalRecommendations />
      </motion.div>
    </motion.div>
  );
};

export default DailyFortuneDetail;
