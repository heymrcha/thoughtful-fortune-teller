import { useState } from "react";
import SampleNotice from "@/components/common/SampleNotice";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, DollarSign, Heart, BookOpen, Activity } from "lucide-react";
import SubPageHeader from "@/components/common/SubPageHeader";

interface YearlyFortuneProps {
  onBack: () => void;
}

const months = [
  { month: 1, fortune: "새로운 시작의 기운이 강합니다. 계획을 세우고 첫 발을 내딛기 좋은 달입니다.", score: 75 },
  { month: 2, fortune: "대인관계에서 좋은 소식이 있을 수 있습니다. 적극적인 소통이 도움됩니다.", score: 80 },
  { month: 3, fortune: "재물운이 상승합니다. 투자나 재정 관리에 신경 쓰면 좋은 결과가 있습니다.", score: 85 },
  { month: 4, fortune: "건강에 주의가 필요한 달입니다. 무리하지 말고 충분한 휴식을 취하세요.", score: 65 },
  { month: 5, fortune: "창의적인 아이디어가 빛을 발하는 시기입니다. 새로운 도전을 시도해 보세요.", score: 82 },
  { month: 6, fortune: "가족과의 시간이 중요한 달입니다. 소통과 이해가 필요합니다.", score: 70 },
  { month: 7, fortune: "에너지가 충만한 시기입니다. 목표를 향해 적극적으로 나아가세요.", score: 88 },
  { month: 8, fortune: "변화의 기운이 있습니다. 유연하게 대처하면 기회로 만들 수 있습니다.", score: 72 },
  { month: 9, fortune: "학업과 자기계발에 좋은 시기입니다. 배움에 투자하세요.", score: 78 },
  { month: 10, fortune: "인간관계가 깊어지는 달입니다. 진정성 있는 소통이 중요합니다.", score: 75 },
  { month: 11, fortune: "수확의 시기입니다. 그동안의 노력이 결실을 맺기 시작합니다.", score: 90 },
  { month: 12, fortune: "한 해를 정리하고 새해를 준비하는 시기입니다. 성찰의 시간을 가지세요.", score: 77 },
];

const areaFortunes = [
  { icon: DollarSign, name: "재물운", score: 78, color: "#C4A35A", 
    summary: "전반적으로 안정적인 재물운입니다. 상반기에는 지출 관리에 신경 쓰고, 하반기에는 새로운 수입원이 생길 수 있습니다." },
  { icon: Heart, name: "애정운", score: 82, color: "#C75146",
    summary: "인연을 만날 기회가 많은 해입니다. 진심으로 다가가면 좋은 관계를 시작할 수 있습니다." },
  { icon: BookOpen, name: "학업운", score: 85, color: "#4A7C59",
    summary: "배움에 대한 열정이 결실을 맺는 해입니다. 새로운 분야에 도전해 보세요." },
  { icon: Activity, name: "건강운", score: 70, color: "#3D5A80",
    summary: "건강 관리에 특별히 신경 써야 하는 해입니다. 규칙적인 운동과 충분한 휴식이 중요합니다." },
];

const YearlyFortune = ({ onBack }: YearlyFortuneProps) => {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <SubPageHeader 
        title="신년운세" 
        subtitle={`${currentYear}년 운세`} 
        onBack={onBack} 
      />

      <SampleNotice />

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-premium rounded-2xl p-6 shadow-elevated"
      >
        <h2 className="text-sm text-primary-foreground/80 mb-2">{currentYear}년 총운</h2>
        <p className="text-lg font-serif text-primary-foreground leading-relaxed">
          올해는 성장과 도약의 해입니다. 새로운 기회가 찾아오며, 
          그동안 준비해온 것들이 빛을 발하기 시작합니다. 
          다만 급하게 서두르기보다 차분하게 준비하는 것이 중요합니다.
        </p>
      </motion.div>

      {/* One Line Advice */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-5 shadow-card text-center"
      >
        <h3 className="text-sm text-muted-foreground mb-2">올해의 한마디</h3>
        <p className="text-lg font-serif text-foreground">
          "물 흐르듯 자연스럽게, 그러나 방향은 잃지 말 것"
        </p>
      </motion.div>

      {/* Area Fortunes */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="font-serif font-semibold text-foreground">영역별 운세</h3>
        {areaFortunes.map((area, index) => (
          <div key={area.name} className="bg-card rounded-xl p-4 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${area.color}20` }}
              >
                <area.icon className="w-5 h-5" style={{ color: area.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{area.name}</span>
                  <span className="text-sm font-bold" style={{ color: area.color }}>{area.score}점</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full mt-1">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${area.score}%`, backgroundColor: area.color }}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground pl-13">{area.summary}</p>
          </div>
        ))}
      </motion.div>

      {/* Monthly Fortune */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="space-y-3 pb-8"
      >
        <h3 className="font-serif font-semibold text-foreground">월별 운세</h3>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {months.map((m) => (
            <button
              key={m.month}
              onClick={() => setExpandedMonth(expandedMonth === m.month ? null : m.month)}
              className={`py-3 rounded-xl text-center transition-all ${
                expandedMonth === m.month 
                  ? 'bg-gradient-premium text-primary-foreground shadow-elevated' 
                  : 'bg-card shadow-soft hover:shadow-card'
              }`}
            >
              <div className={`text-sm font-medium ${expandedMonth === m.month ? 'text-primary-foreground' : 'text-foreground'}`}>
                {m.month}월
              </div>
              <div className={`text-xs mt-1 ${expandedMonth === m.month ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                {m.score}점
              </div>
            </button>
          ))}
        </div>
        
        {expandedMonth && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card rounded-xl p-5 shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif font-semibold text-foreground">{expandedMonth}월 운세</h4>
              <span className="text-sm font-bold text-secondary">
                {months.find(m => m.month === expandedMonth)?.score}점
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {months.find(m => m.month === expandedMonth)?.fortune}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default YearlyFortune;
