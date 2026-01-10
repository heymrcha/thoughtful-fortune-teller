import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Home, Heart, Award, Plane } from "lucide-react";
import SubPageHeader from "@/components/common/SubPageHeader";

interface SeokjungProps {
  onBack: () => void;
}

const categories = [
  { 
    id: "money", 
    name: "금전/사업/주식", 
    icon: DollarSign,
    summary: "신중한 투자와 안정적인 운용이 길합니다",
    content: "올해 금전운은 전반적으로 안정적입니다. 큰 투자보다는 꾸준한 저축과 안정적인 운용이 유리합니다. 사업을 하시는 분은 새로운 사업보다 기존 사업을 공고히 하는 것이 좋습니다. 주식은 단기 매매보다 장기 투자가 적합하며, 무리한 차입은 피하세요."
  },
  { 
    id: "house", 
    name: "개업/이사/매매", 
    icon: Home,
    summary: "봄과 가을이 이사와 매매에 길합니다",
    content: "개업은 3월과 9월이 좋은 시기입니다. 이사는 동쪽이나 남동쪽 방향이 유리하며, 여름철 이사는 피하는 것이 좋습니다. 부동산 매매는 상반기에 결정하면 좋은 결과가 있으나, 서두르지 말고 충분히 검토 후 결정하세요."
  },
  { 
    id: "love", 
    name: "애정/결혼/부부", 
    icon: Heart,
    summary: "진심으로 다가가면 좋은 인연을 만납니다",
    content: "미혼인 분은 봄과 초여름에 좋은 인연을 만날 수 있습니다. 소개보다는 자연스러운 만남이 더 길합니다. 결혼을 준비 중이라면 가을이 좋은 시기입니다. 부부 사이에는 대화와 이해가 중요하며, 작은 것에 감사하는 마음이 관계를 깊게 합니다."
  },
  { 
    id: "exam", 
    name: "시험/승진/합격", 
    icon: Award,
    summary: "꾸준한 노력이 결실을 맺는 해입니다",
    content: "학업운이 좋아 시험에서 좋은 결과를 기대할 수 있습니다. 다만 과신은 금물이니 끝까지 최선을 다하세요. 승진운도 양호하나, 조급해하지 말고 현재 위치에서 성실함을 보여주는 것이 중요합니다. 자격증이나 새로운 배움에도 좋은 시기입니다."
  },
  { 
    id: "travel", 
    name: "여행/출장/출산", 
    icon: Plane,
    summary: "가까운 곳부터 시작하면 길이 열립니다",
    content: "여행은 가까운 곳부터 시작하면 좋습니다. 먼 곳의 여행은 충분한 준비 후에 떠나세요. 출장은 좋은 결과를 가져올 수 있으나, 건강 관리에 유의하세요. 출산을 계획 중이라면 봄과 가을이 태기가 좋은 시기입니다."
  },
];

const Seokjung = ({ onBack }: SeokjungProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <SubPageHeader 
        title="석중결" 
        subtitle="상황별 심화 운세 해석" 
        onBack={onBack} 
      />

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-premium rounded-2xl p-6 shadow-elevated"
      >
        <h2 className="text-sm text-primary-foreground/80 mb-2">한마디 조언</h2>
        <p className="text-lg font-serif text-primary-foreground">
          "급히 먹는 밥이 체하니, 천천히 가도 갈 길은 간다"
        </p>
      </motion.div>

      {/* Total Fortune */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <h3 className="font-serif font-semibold text-foreground mb-3">총운</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          올해는 차분하게 준비하고 실행하는 것이 좋은 해입니다. 
          급하게 서두르면 실수가 생기고, 여유를 가지면 기회가 보입니다. 
          주변 사람들과의 관계를 소중히 하면 뜻밖의 도움을 받게 됩니다.
        </p>
      </motion.div>

      {/* Category Cards */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3 pb-8"
      >
        <h3 className="font-serif font-semibold text-foreground">상황별 운세</h3>
        
        {categories.map((category, index) => (
          <motion.div key={category.id}>
            <button
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className="w-full bg-card rounded-xl p-4 shadow-soft hover:shadow-card transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.summary}</p>
                </div>
              </div>
            </button>
            
            {selectedCategory === category.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-muted rounded-xl p-4 mt-2 ml-4"
              >
                <p className="text-sm text-foreground leading-relaxed">
                  {category.content}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Seokjung;
