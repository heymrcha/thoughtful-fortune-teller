import { useState } from "react";
import SampleNotice from "@/components/common/SampleNotice";
import { motion } from "framer-motion";
import SubPageHeader from "@/components/common/SubPageHeader";

interface TojeongProps {
  onBack: () => void;
}

const monthlyFortunes = [
  { month: 1, verse: "봄눈 녹아 물이 되니", meaning: "새로운 시작의 기운이 감돌며, 준비해온 일들이 서서히 움직이기 시작합니다." },
  { month: 2, verse: "매화 향기 퍼지는 달", meaning: "좋은 소식이 전해오고, 주변에서 도움의 손길이 닿습니다." },
  { month: 3, verse: "제비 돌아오듯 인연이 오니", meaning: "귀인을 만나거나 좋은 기회가 찾아옵니다." },
  { month: 4, verse: "꽃 피고 나비 날며", meaning: "활기찬 시기입니다. 적극적으로 움직이면 결실이 있습니다." },
  { month: 5, verse: "초록이 짙어가며", meaning: "안정적인 시기입니다. 현재 하는 일에 집중하세요." },
  { month: 6, verse: "여름 기운 가득하니", meaning: "열정을 발휘할 때입니다. 다만 건강 관리에 유의하세요." },
  { month: 7, verse: "서늘한 바람 불어오며", meaning: "변화의 기운이 있습니다. 유연하게 대처하세요." },
  { month: 8, verse: "구름 걷히듯 마음 개이니", meaning: "그동안의 고민이 해결되는 시기입니다." },
  { month: 9, verse: "가을 곡식 익어가며", meaning: "수확의 시기입니다. 노력의 결실을 거둡니다." },
  { month: 10, verse: "단풍잎 붉게 물들며", meaning: "감사의 마음으로 지내면 더 큰 복이 옵니다." },
  { month: 11, verse: "첫눈 내리듯 마음 깨끗이", meaning: "정리와 정돈의 시기입니다. 불필요한 것을 버리세요." },
  { month: 12, verse: "한 해를 마무리하며", meaning: "지난 해를 돌아보고 새해를 준비하는 시간입니다." },
];

const Tojeong = ({ onBack }: TojeongProps) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <SubPageHeader 
        title="토정비결" 
        subtitle="전통 방식의 한 해 운세" 
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
        <h2 className="text-sm text-primary-foreground/80 mb-2">{currentYear}년 토정비결</h2>
        <p className="text-lg font-serif text-primary-foreground leading-relaxed">
          "물고기가 물을 만난 격이라"
        </p>
        <p className="text-sm text-primary-foreground/80 mt-3 leading-relaxed">
          올해는 당신에게 맞는 환경과 기회를 만나는 해입니다. 
          자연스럽게 흐름을 타면 좋은 결과가 따릅니다.
        </p>
      </motion.div>

      {/* One Line */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-5 shadow-card text-center"
      >
        <h3 className="text-sm text-muted-foreground mb-2">한마디 조언</h3>
        <p className="text-lg font-serif text-foreground">
          "때를 기다리되 준비는 게을리 하지 말 것"
        </p>
      </motion.div>

      {/* Total Fortune */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <h3 className="font-serif font-semibold text-foreground mb-4">총운</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          올해는 전반적으로 상승의 기운이 흐르는 해입니다. 
          특히 상반기에 새로운 기회가 찾아오며, 이를 잘 활용하면 하반기에 풍성한 결실을 맺을 수 있습니다.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          다만 급하게 서두르면 놓치는 것이 있으니, 차분하게 상황을 살피며 나아가세요.
          사람과의 관계에서 신뢰를 쌓으면 뜻밖의 도움을 받게 됩니다.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          건강 면에서는 과로를 피하고 충분한 휴식을 취하는 것이 중요합니다.
          재물운은 안정적이나, 큰 투자보다는 꾸준한 저축이 유리합니다.
        </p>
      </motion.div>

      {/* Monthly Fortune */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="space-y-3 pb-8"
      >
        <h3 className="font-serif font-semibold text-foreground">월별 운세</h3>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {monthlyFortunes.map((m) => (
            <button
              key={m.month}
              onClick={() => setSelectedMonth(selectedMonth === m.month ? null : m.month)}
              className={`py-4 rounded-xl text-center transition-all ${
                selectedMonth === m.month 
                  ? 'bg-gradient-premium text-primary-foreground shadow-elevated' 
                  : 'bg-card shadow-soft hover:shadow-card'
              }`}
            >
              <div className={`text-lg font-medium ${selectedMonth === m.month ? 'text-primary-foreground' : 'text-foreground'}`}>
                {m.month}월
              </div>
            </button>
          ))}
        </div>

        {selectedMonth && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-5 shadow-card"
          >
            <h4 className="font-serif font-semibold text-foreground mb-3">{selectedMonth}월</h4>
            <p className="text-lg font-serif text-secondary mb-3">
              "{monthlyFortunes.find(m => m.month === selectedMonth)?.verse}"
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {monthlyFortunes.find(m => m.month === selectedMonth)?.meaning}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Tojeong;
