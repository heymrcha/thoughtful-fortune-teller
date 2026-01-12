import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SajuChart from "@/components/saju/SajuChart";
import OhangChart from "@/components/saju/OhangChart";
import OhangPentagon from "@/components/saju/OhangPentagon";
import InterpretationSection from "@/components/saju/InterpretationSection";
import LuckyElement from "@/components/saju/LuckyElement";

interface SajuResultProps {
  onBack: () => void;
}

const SajuResult = ({ onBack }: SajuResultProps) => {
  const pillars = [
    { heavenly: "甲", earthly: "子", label: "시주" },
    { heavenly: "丙", earthly: "寅", label: "일주" },
    { heavenly: "戊", earthly: "辰", label: "월주" },
    { heavenly: "庚", earthly: "午", label: "년주" },
  ];

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
      {/* Header */}
      <div className="flex items-center gap-3 pt-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-card flex items-center justify-center shadow-soft"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-serif font-bold text-foreground">사주명리</h1>
          <p className="text-sm text-muted-foreground">나의 본질과 삶의 흐름</p>
        </div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-premium rounded-2xl p-6 shadow-elevated"
      >
        <h2 className="text-sm text-primary-foreground/80 mb-2">핵심 요약</h2>
        <p className="text-lg font-serif text-primary-foreground leading-relaxed">
          당신은 따뜻한 불의 기운을 가진 사람입니다. 
          솔직하고 열정적이며, 사람들을 이끄는 리더십이 있습니다.
          다만 때로는 급한 성정을 다스리는 지혜가 필요합니다.
        </p>
      </motion.div>

      {/* Saju Chart */}
      <SajuChart pillars={pillars} />

      {/* Ohang Pentagon Chart - 오각형 */}
      <OhangPentagon data={ohangData} />

      {/* Ohang Bar Analysis - 막대 */}
      <OhangChart data={ohangData} />

      {/* Il-gan Symbol */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-6 shadow-card text-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-brass mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl font-serif text-primary-foreground">丙</span>
        </div>
        <h3 className="font-serif font-semibold text-foreground mb-2">일간: 丙火 (병화)</h3>
        <p className="text-muted-foreground leading-relaxed">
          태양처럼 밝고 따뜻한 기운을 가졌습니다. 
          주변을 환하게 비추며, 정직하고 솔직한 성격의 소유자입니다.
        </p>
      </motion.div>

      {/* Interpretation Sections */}
      <InterpretationSection
        title="성향 분석"
        icon="star"
        summary="활발하고 적극적인 성격으로, 새로운 일을 시작하는 것을 두려워하지 않습니다. 리더십이 있으며 사람들에게 영감을 주는 능력이 있습니다."
        details={[
          "긍정적이고 낙천적인 태도로 주변을 밝게 합니다",
          "직접 행동하며 결과를 만들어내는 추진력이 있습니다",
          "때로는 성급한 판단을 할 수 있어 신중함이 필요합니다",
        ]}
        delay={0.4}
      />

      <InterpretationSection
        title="인간관계"
        icon="heart"
        summary="사교적이고 따뜻한 성격으로 많은 사람들과 좋은 관계를 맺습니다. 진실된 마음으로 다가가며, 상대방에게 신뢰를 줍니다."
        details={[
          "친구를 소중히 여기며 의리가 있습니다",
          "갈등 상황에서도 중재자 역할을 잘 합니다",
          "가까운 사이에서는 솔직한 표현이 때론 상처가 될 수 있습니다",
        ]}
        delay={0.5}
      />

      <InterpretationSection
        title="직업 적성"
        icon="briefcase"
        summary="창의성과 리더십을 발휘할 수 있는 분야에서 빛을 발합니다. 사람을 이끌거나 새로운 것을 만들어내는 일에 적합합니다."
        details={[
          "경영, 기획, 마케팅 등 전략적 사고가 필요한 분야",
          "예술, 디자인 등 창의력을 발휘하는 분야",
          "교육, 상담 등 사람과 소통하는 분야",
        ]}
        delay={0.6}
      />

      <InterpretationSection
        title="보완할 점"
        icon="sparkles"
        summary="급한 성정을 다스리고, 인내심을 기르는 것이 중요합니다. 타인의 의견에도 귀 기울이는 여유가 필요합니다."
        details={[
          "결정을 내리기 전 충분히 생각하는 시간을 가지세요",
          "비판적인 피드백도 성장의 기회로 받아들이세요",
          "휴식과 재충전의 시간을 충분히 확보하세요",
        ]}
        delay={0.7}
      />

      {/* Lucky Elements */}
      <div className="grid grid-cols-1 gap-4 pb-8">
        <LuckyElement
          type="color"
          value="파란색 계열"
          description="수(水)의 기운으로 균형을 맞춥니다"
          colorCode="#3D5A80"
        />
        <LuckyElement
          type="direction"
          value="북쪽"
          description="수(水)의 방향으로 안정을 가져옵니다"
        />
      </div>
    </motion.div>
  );
};

export default SajuResult;
