import { motion } from "framer-motion";
import SubPageHeader from "@/components/common/SubPageHeader";
import OhangChart from "@/components/saju/OhangChart";
import InterpretationSection from "@/components/saju/InterpretationSection";
import LuckyElement from "@/components/saju/LuckyElement";
import { Button } from "@/components/ui/button";

interface DaeunAnalysisProps {
  onBack: () => void;
}

const daeunPeriods = [
  { age: "1-10", heavenly: "甲", earthly: "子", current: false },
  { age: "11-20", heavenly: "乙", earthly: "丑", current: false },
  { age: "21-30", heavenly: "丙", earthly: "寅", current: false },
  { age: "31-40", heavenly: "丁", earthly: "卯", current: true },
  { age: "41-50", heavenly: "戊", earthly: "辰", current: false },
  { age: "51-60", heavenly: "己", earthly: "巳", current: false },
  { age: "61-70", heavenly: "庚", earthly: "午", current: false },
  { age: "71-80", heavenly: "辛", earthly: "未", current: false },
];

const DaeunAnalysis = ({ onBack }: DaeunAnalysisProps) => {
  const ohangData = [
    { element: "木", name: "목", value: 30, color: "#4A7C59" },
    { element: "火", name: "화", value: 25, color: "#C75146" },
    { element: "土", name: "토", value: 15, color: "#C4A35A" },
    { element: "金", name: "금", value: 20, color: "#8B8B8B" },
    { element: "水", name: "수", value: 10, color: "#3D5A80" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <SubPageHeader 
        title="대운분석" 
        subtitle="10년 단위 삶의 큰 흐름" 
        onBack={onBack} 
      />

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-premium rounded-2xl p-6 shadow-elevated"
      >
        <h2 className="text-sm text-primary-foreground/80 mb-2">현재 대운 (31-40세)</h2>
        <p className="text-lg font-serif text-primary-foreground leading-relaxed">
          정묘(丁卯) 대운으로, 목(木)과 화(火)의 기운이 조화를 이루는 시기입니다.
          창의성과 성장의 에너지가 강하게 작용합니다.
        </p>
      </motion.div>

      {/* Saju Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <h3 className="font-serif font-semibold text-foreground mb-4">사주명조</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { heavenly: "甲", earthly: "子", label: "시주" },
            { heavenly: "丙", earthly: "寅", label: "일주" },
            { heavenly: "戊", earthly: "辰", label: "월주" },
            { heavenly: "庚", earthly: "午", label: "년주" },
          ].map((pillar) => (
            <div key={pillar.label} className="text-center">
              <div className="text-xs text-muted-foreground mb-2">{pillar.label}</div>
              <div className="bg-muted rounded-lg py-3">
                <div className="text-xl font-serif text-secondary">{pillar.heavenly}</div>
                <div className="text-xl font-serif text-foreground mt-1">{pillar.earthly}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Daeun Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <h3 className="font-serif font-semibold text-foreground mb-4">대운 흐름</h3>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max">
            {daeunPeriods.map((period, index) => (
              <div 
                key={period.age} 
                className={`text-center flex-shrink-0 ${period.current ? 'opacity-100' : 'opacity-60'}`}
              >
                <div className="text-xs text-muted-foreground mb-2">{period.age}세</div>
                <div 
                  className={`rounded-lg py-3 px-4 ${
                    period.current 
                      ? 'bg-gradient-premium shadow-elevated' 
                      : 'bg-muted'
                  }`}
                >
                  <div className={`text-lg font-serif ${period.current ? 'text-primary-foreground' : 'text-secondary'}`}>
                    {period.heavenly}
                  </div>
                  <div className={`text-lg font-serif mt-1 ${period.current ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {period.earthly}
                  </div>
                </div>
                {period.current && (
                  <div className="mt-2 text-xs text-secondary font-medium">현재</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Ohang */}
      <OhangChart data={ohangData} />

      {/* Interpretations */}
      <InterpretationSection
        title="현재 대운 분석"
        icon="star"
        summary="정묘(丁卯) 대운은 창의성과 성장의 시기입니다. 새로운 시작과 도전에 유리하며, 특히 배움과 자기계발에서 좋은 결실을 맺을 수 있습니다."
        details={[
          "새로운 프로젝트나 사업을 시작하기 좋은 시기",
          "학업이나 자격증 취득에 유리합니다",
          "인간관계가 확장되며 좋은 인연을 만날 수 있습니다",
        ]}
        delay={0.3}
      />

      <InterpretationSection
        title="주의할 점"
        icon="sparkles"
        summary="화(火) 기운이 강해지므로 급한 결정을 피하고, 충분한 검토 후 행동하는 것이 좋습니다. 건강 면에서는 심장과 혈액순환에 주의가 필요합니다."
        details={[
          "감정적인 결정보다 이성적인 판단을 우선하세요",
          "충분한 휴식과 규칙적인 운동이 필요합니다",
          "재정적인 결정은 신중하게 하세요",
        ]}
        delay={0.4}
      />

      {/* Lucky Elements */}
      <div className="grid grid-cols-1 gap-4 pb-8">
        <LuckyElement
          type="color"
          value="파란색 계열"
          description="수(水)의 기운으로 화(火)를 조절합니다"
          colorCode="#3D5A80"
        />
        <LuckyElement
          type="direction"
          value="북쪽"
          description="수(水)의 방향으로 균형을 찾습니다"
        />
        <Button 
          variant="outline"
          className="w-full h-14 text-lg font-medium rounded-xl"
        >
          전문 상담 받기
        </Button>
      </div>
    </motion.div>
  );
};

export default DaeunAnalysis;
