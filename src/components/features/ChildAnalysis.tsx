import { useState } from "react";
import { motion } from "framer-motion";
import SubPageHeader from "@/components/common/SubPageHeader";
import { InputForm, BirthInput, FormField } from "@/components/common/InputForm";
import { Button } from "@/components/ui/button";
import OhangChart from "@/components/saju/OhangChart";
import InterpretationSection from "@/components/saju/InterpretationSection";

interface ChildAnalysisProps {
  onBack: () => void;
}

const ChildAnalysis = ({ onBack }: ChildAnalysisProps) => {
  const [step, setStep] = useState<"input" | "result">("input");

  const ohangData = [
    { element: "木", name: "목", value: 35, color: "#4A7C59" },
    { element: "火", name: "화", value: 20, color: "#C75146" },
    { element: "土", name: "토", value: 15, color: "#C4A35A" },
    { element: "金", name: "금", value: 15, color: "#8B8B8B" },
    { element: "水", name: "수", value: 15, color: "#3D5A80" },
  ];

  if (step === "input") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <SubPageHeader 
          title="자녀분석" 
          subtitle="아이의 타고난 성향과 잠재력" 
          onBack={onBack} 
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-premium rounded-2xl p-5 shadow-elevated"
        >
          <p className="text-primary-foreground text-sm leading-relaxed">
            자녀의 생년월일시를 입력하시면, 아이가 타고난 기질과 성향, 
            그에 맞는 양육 방향을 안내해 드립니다.
          </p>
        </motion.div>

        <InputForm title="자녀 정보 입력">
          <BirthInput label="" />
        </InputForm>

        <Button 
          onClick={() => setStep("result")}
          className="w-full h-14 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          분석 시작
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <SubPageHeader 
        title="자녀분석 결과" 
        subtitle="민수 (2018년 3월 15일)" 
        onBack={() => setStep("input")} 
      />

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-premium rounded-2xl p-6 shadow-elevated"
      >
        <h2 className="text-sm text-primary-foreground/80 mb-2">핵심 성향</h2>
        <p className="text-lg font-serif text-primary-foreground leading-relaxed">
          민수는 호기심이 많고 창의적인 목(木)의 기운을 가진 아이입니다.
          새로운 것을 탐구하고 성장하려는 에너지가 강합니다.
        </p>
      </motion.div>

      {/* Saju Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <h3 className="font-serif font-semibold text-foreground mb-4">자녀 사주명조</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { heavenly: "甲", earthly: "子", label: "시주" },
            { heavenly: "乙", earthly: "卯", label: "일주" },
            { heavenly: "丙", earthly: "寅", label: "월주" },
            { heavenly: "戊", earthly: "戌", label: "년주" },
          ].map((pillar, index) => (
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

      {/* Ohang */}
      <OhangChart data={ohangData} />

      {/* Interpretations */}
      <InterpretationSection
        title="자녀 성향"
        icon="star"
        summary="호기심과 탐구심이 강하며, 새로운 환경에 빠르게 적응합니다. 창의적인 아이디어가 풍부하고 자유로운 것을 좋아합니다."
        details={[
          "배움에 대한 열정이 강합니다",
          "친구들 사이에서 리더 역할을 할 수 있습니다",
          "규칙적인 환경보다 유연한 환경에서 성장합니다",
        ]}
        delay={0.3}
      />

      <InterpretationSection
        title="학습 가이드"
        icon="briefcase"
        summary="체험형 학습과 프로젝트 기반 교육이 효과적입니다. 아이가 스스로 발견하고 탐구할 수 있는 환경을 제공해 주세요."
        details={[
          "과학, 예술 등 창의력을 발휘할 수 있는 분야",
          "야외 활동과 자연 관찰이 도움됩니다",
          "스스로 선택하게 하면 동기부여가 높아집니다",
        ]}
        delay={0.4}
      />

      <InterpretationSection
        title="양육 조언"
        icon="heart"
        summary="아이의 자율성을 존중하면서도 일관된 경계를 제시해 주세요. 실패를 두려워하지 않도록 응원하는 것이 중요합니다."
        details={[
          "과정을 칭찬하면 도전 정신이 자랍니다",
          "규칙은 함께 정하면 더 잘 따릅니다",
          "충분한 휴식과 재충전 시간이 필요합니다",
        ]}
        delay={0.5}
      />

      <div className="pb-8">
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

export default ChildAnalysis;
