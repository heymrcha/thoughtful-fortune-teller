import { useState } from "react";
import SampleNotice from "@/components/common/SampleNotice";
import { motion } from "framer-motion";
import SubPageHeader from "@/components/common/SubPageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PetNamingProps {
  onBack: () => void;
}

const suggestedNames = [
  { name: "복돌이", meaning: "복을 부르는 아이", element: "土" },
  { name: "하늘이", meaning: "높이 나는 기운", element: "木" },
  { name: "별이", meaning: "빛나는 존재", element: "火" },
  { name: "바다", meaning: "넓고 깊은 마음", element: "水" },
  { name: "금순이", meaning: "귀하고 소중한", element: "金" },
];

const PetNaming = ({ onBack }: PetNamingProps) => {
  const [step, setStep] = useState<"input" | "result">("input");

  if (step === "input") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SubPageHeader title="반려동물 작명" subtitle="특별한 이름을 찾아드립니다" onBack={onBack} />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-card space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">반려동물 종류</label>
            <Select><SelectTrigger className="bg-muted border-0"><SelectValue placeholder="선택하세요" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">강아지</SelectItem>
                <SelectItem value="cat">고양이</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">성별</label>
            <Select><SelectTrigger className="bg-muted border-0"><SelectValue placeholder="선택하세요" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">수컷</SelectItem>
                <SelectItem value="female">암컷</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">태어난 연도</label>
            <Input placeholder="예: 2023" className="bg-muted border-0" />
          </div>
        </motion.div>
        
        <Button onClick={() => setStep("result")} className="w-full h-14 rounded-xl">이름 추천받기</Button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <SubPageHeader title="추천 이름" onBack={() => setStep("input")} />

      <SampleNotice>샘플 추천입니다. 입력한 정보와 관계없이 같은 이름이 표시됩니다.</SampleNotice>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-premium rounded-2xl p-5 shadow-elevated">
        <p className="text-primary-foreground text-sm text-center">사주에 맞는 이름을 추천해 드립니다</p>
      </motion.div>
      
      <div className="space-y-3 pb-8">
        {suggestedNames.map((item, index) => (
          <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-4 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-serif font-bold text-foreground">{item.name}</h4>
              <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-full">{item.element}</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.meaning}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PetNaming;
