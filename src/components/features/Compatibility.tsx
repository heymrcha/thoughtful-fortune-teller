import { useState } from "react";
import SampleNotice from "@/components/common/SampleNotice";
import { motion } from "framer-motion";
import { Heart, Sparkles, AlertTriangle, MessageCircle } from "lucide-react";
import SubPageHeader from "@/components/common/SubPageHeader";
import { InputForm, BirthInput, type BirthData } from "@/components/common/InputForm";
import { isBirthComplete } from "@/lib/prototype-rules";
import { Button } from "@/components/ui/button";

interface CompatibilityProps {
  onBack: () => void;
  onConsult: () => void;
}

const Compatibility = ({ onBack, onConsult }: CompatibilityProps) => {
  const [step, setStep] = useState<"input" | "result">("input");
  const [mine, setMine] = useState<BirthData | null>(null);
  const [partner, setPartner] = useState<BirthData | null>(null);
  const canSubmit = Boolean(mine && partner && isBirthComplete(mine) && isBirthComplete(partner));

  if (step === "input") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <SubPageHeader 
          title="궁합" 
          subtitle="두 사람의 인연과 관계 해석" 
          onBack={onBack} 
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-premium rounded-2xl p-5 shadow-elevated"
        >
          <p className="text-primary-foreground text-sm leading-relaxed">
            두 사람의 사주를 바탕으로 관계의 강점과 주의점, 
            그리고 함께 성장할 수 있는 방향을 안내해 드립니다.
          </p>
        </motion.div>

        <InputForm title="내 정보">
          <BirthInput ariaPrefix="내 정보" onComplete={setMine} />
        </InputForm>

        <InputForm title="상대방 정보">
          <BirthInput ariaPrefix="상대방 정보" onComplete={setPartner} />
        </InputForm>

        <Button 
          onClick={() => setStep("result")}
          disabled={!canSubmit}
          className="w-full h-14 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          궁합 보기
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
        title="궁합 결과" 
        subtitle={`${mine?.name || "나"} ♥ ${partner?.name || "상대방"}`} 
        onBack={() => setStep("input")} 
      />

      <SampleNotice />

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 shadow-card text-center"
      >
        <div className="flex items-center justify-center gap-8 mb-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-premium flex items-center justify-center mb-2">
              <span className="text-2xl font-serif text-primary-foreground">丙</span>
            </div>
            <p className="text-sm text-muted-foreground">{mine?.name || "나"}</p>
          </div>
          <Heart className="w-8 h-8 text-accent fill-accent" />
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-brass flex items-center justify-center mb-2">
              <span className="text-2xl font-serif text-primary-foreground">壬</span>
            </div>
            <p className="text-sm text-muted-foreground">{partner?.name || "상대방"}</p>
          </div>
        </div>
        <div className="text-3xl font-bold text-secondary mb-1">85점</div>
        <p className="text-sm text-muted-foreground">서로를 성장시키는 좋은 인연</p>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-gradient-premium rounded-2xl p-6 shadow-elevated"
      >
        <h2 className="text-sm text-primary-foreground/80 mb-2">관계 요약</h2>
        <p className="text-lg font-serif text-primary-foreground leading-relaxed">
          불(火)과 물(水)의 만남으로, 서로의 기운을 조절해주는 보완적인 관계입니다.
          함께할 때 균형을 이루며 성장할 수 있습니다.
        </p>
      </motion.div>

      {/* Ohang Compatibility */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <h3 className="font-serif font-semibold text-foreground mb-4">오행 상성</h3>
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="text-center">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: "#C75146" }}
            >
              <span className="text-white font-serif text-xl">火</span>
            </div>
            <p className="text-xs text-muted-foreground">병화</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl">↔</div>
            <p className="text-xs text-muted-foreground mt-1">상극</p>
          </div>
          <div className="text-center">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: "#3D5A80" }}
            >
              <span className="text-white font-serif text-xl">水</span>
            </div>
            <p className="text-xs text-muted-foreground">임수</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-2">
          화(火)와 수(水)는 서로를 조절하며 균형을 만듭니다
        </p>
      </motion.div>

      {/* Strengths */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="font-serif font-semibold text-foreground">관계의 강점</h3>
        </div>
        <div className="space-y-3">
          {[
            "서로의 부족한 부분을 채워주는 보완 관계",
            "함께할 때 정서적 안정감을 느낍니다",
            "같은 방향을 바라보며 성장할 수 있습니다",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cautions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-secondary" />
          <h3 className="font-serif font-semibold text-foreground">주의할 점</h3>
        </div>
        <div className="space-y-3">
          {[
            "서로 다른 속도에 대한 이해가 필요합니다",
            "급한 결정보다 대화를 통해 합의하세요",
            "각자의 공간과 시간을 존중해 주세요",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Advice */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-serif font-semibold text-foreground">관계 조언</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          서로의 다름을 인정하고 존중할 때, 이 관계는 더욱 깊어집니다.
          상대방의 방식을 바꾸려 하기보다 이해하려는 노력이 중요합니다.
          함께 새로운 경험을 하면서 추억을 쌓아가세요.
        </p>
      </motion.div>

      <div className="pb-8">
        <Button 
          variant="outline"
          onClick={onConsult}
          className="w-full h-14 text-lg font-medium rounded-xl"
        >
          전문 상담 받기
        </Button>
      </div>
    </motion.div>
  );
};

export default Compatibility;
