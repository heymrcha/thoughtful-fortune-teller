import { useState } from "react";
import SampleNotice from "@/components/common/SampleNotice";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import SubPageHeader from "@/components/common/SubPageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NameCompatibilityProps {
  onBack: () => void;
}

const NameCompatibility = ({ onBack }: NameCompatibilityProps) => {
  const [step, setStep] = useState<"input" | "result">("input");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  if (step === "input") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SubPageHeader title="이름 궁합" subtitle="이름으로 보는 인연" onBack={onBack} />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-card space-y-4">
          <Input placeholder="내 이름" value={name1} onChange={(e) => setName1(e.target.value)} className="h-12 bg-muted border-0" />
          <div className="flex justify-center"><Heart className="w-6 h-6 text-accent" /></div>
          <Input placeholder="상대 이름" value={name2} onChange={(e) => setName2(e.target.value)} className="h-12 bg-muted border-0" />
        </motion.div>
        
        <Button onClick={() => setStep("result")} disabled={!name1 || !name2} className="w-full h-14 rounded-xl">
          궁합 보기
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <SubPageHeader title="이름 궁합 결과" onBack={() => setStep("input")} />

      <SampleNotice>샘플 결과입니다. 입력한 이름과 관계없이 같은 점수가 표시됩니다.</SampleNotice>
      
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-card rounded-2xl p-6 shadow-card text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-xl font-medium">{name1 || "나"}</span>
          <Heart className="w-8 h-8 text-accent fill-accent" />
          <span className="text-xl font-medium">{name2 || "상대"}</span>
        </div>
        <div className="text-5xl font-bold text-secondary mb-2">87%</div>
        <div className="flex justify-center gap-1">{[1,2,3,4,5].map(i => <Star key={i} className={`w-5 h-5 ${i <= 4 ? 'text-secondary fill-secondary' : 'text-muted'}`} />)}</div>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-premium rounded-2xl p-6 shadow-elevated">
        <p className="text-lg font-serif text-primary-foreground leading-relaxed">
          서로에게 좋은 기운을 전해주는 이름 조합입니다. 함께할 때 긍정적인 에너지가 흐릅니다.
        </p>
      </motion.div>
      
      <Button onClick={() => setStep("input")} variant="outline" className="w-full h-14 rounded-xl">다시 하기</Button>
    </motion.div>
  );
};

export default NameCompatibility;
