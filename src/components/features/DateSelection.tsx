import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Check, X } from "lucide-react";
import SubPageHeader from "@/components/common/SubPageHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DateSelectionProps {
  onBack: () => void;
}

const purposes = [
  { id: "wedding", name: "결혼" },
  { id: "move", name: "이사" },
  { id: "business", name: "개업" },
  { id: "contract", name: "계약" },
  { id: "travel", name: "여행" },
  { id: "other", name: "기타" },
];

const DateSelection = ({ onBack }: DateSelectionProps) => {
  const [step, setStep] = useState<"input" | "result">("input");
  const [purpose, setPurpose] = useState<string>("");

  const recommendedDates = [
    { date: "2026년 2월 15일", day: "일요일", score: 95, reason: "천덕일로 모든 일에 길합니다" },
    { date: "2026년 2월 22일", day: "일요일", score: 90, reason: "황도길일로 결혼에 특히 좋습니다" },
    { date: "2026년 3월 8일", day: "일요일", score: 88, reason: "성일로 새로운 시작에 좋습니다" },
    { date: "2026년 3월 15일", day: "일요일", score: 85, reason: "개일로 이사와 개업에 적합합니다" },
  ];

  const avoidDates = [
    { date: "2026년 2월 1일", reason: "파일로 큰 일을 피하세요" },
    { date: "2026년 2월 10일", reason: "수일로 계약은 피하세요" },
    { date: "2026년 3월 3일", reason: "흑도일로 이사를 피하세요" },
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
          title="택일" 
          subtitle="좋은 날을 선택하는 지혜" 
          onBack={onBack} 
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-premium rounded-2xl p-5 shadow-elevated"
        >
          <p className="text-primary-foreground text-sm leading-relaxed">
            중요한 일을 앞두고 계신가요? 사주와 전통 역학에 기반하여 
            당신에게 가장 좋은 날을 찾아드립니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl p-6 shadow-card space-y-4"
        >
          <h3 className="font-serif font-semibold text-foreground">어떤 일정을 잡으시나요?</h3>
          
          <div className="grid grid-cols-3 gap-2">
            {purposes.map((p) => (
              <button
                key={p.id}
                onClick={() => setPurpose(p.id)}
                className={`py-3 rounded-xl text-center transition-all ${
                  purpose === p.id
                    ? 'bg-gradient-premium text-primary-foreground shadow-elevated'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">희망 기간</label>
            <div className="grid grid-cols-2 gap-2">
              <Select>
                <SelectTrigger className="bg-muted border-0">
                  <SelectValue placeholder="시작일" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-02">2026년 2월</SelectItem>
                  <SelectItem value="2026-03">2026년 3월</SelectItem>
                  <SelectItem value="2026-04">2026년 4월</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-muted border-0">
                  <SelectValue placeholder="종료일" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-02">2026년 2월</SelectItem>
                  <SelectItem value="2026-03">2026년 3월</SelectItem>
                  <SelectItem value="2026-04">2026년 4월</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <Button 
          onClick={() => setStep("result")}
          disabled={!purpose}
          className="w-full h-14 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
        >
          좋은 날 찾기
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
        title="택일 결과" 
        subtitle={`${purposes.find(p => p.id === purpose)?.name || ""} 추천 날짜`}
        onBack={() => setStep("input")} 
      />

      {/* Recommended Dates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <h3 className="font-serif font-semibold text-foreground flex items-center gap-2">
          <Check className="w-5 h-5 text-accent" />
          추천하는 날
        </h3>
        
        {recommendedDates.map((date, index) => (
          <motion.div
            key={date.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.15 }}
            className="bg-card rounded-xl p-4 shadow-soft"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{date.date}</h4>
                  <p className="text-xs text-muted-foreground">{date.day}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-secondary">{date.score}</span>
                <span className="text-sm text-muted-foreground">점</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{date.reason}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Avoid Dates */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3 pb-8"
      >
        <h3 className="font-serif font-semibold text-foreground flex items-center gap-2">
          <X className="w-5 h-5 text-destructive" />
          피해야 할 날
        </h3>
        
        {avoidDates.map((date, index) => (
          <div
            key={date.date}
            className="bg-card rounded-xl p-4 shadow-soft opacity-70"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{date.date}</h4>
                <p className="text-sm text-muted-foreground">{date.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DateSelection;
