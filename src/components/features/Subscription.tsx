import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import SubPageHeader from "@/components/common/SubPageHeader";
import { Button } from "@/components/ui/button";

interface SubscriptionProps {
  onBack: () => void;
}

const plans = [
  { id: "free", name: "무료", price: "0원", features: ["기본 사주 해석", "오늘의 운세", "타로 1일 1회"] },
  { id: "basic", name: "베이직", price: "9,900원/월", features: ["모든 무료 기능", "궁합 분석", "월별 운세", "타로 무제한"], popular: false },
  { id: "premium", name: "프리미엄", price: "19,900원/월", features: ["모든 베이직 기능", "대운 분석", "전문 상담 할인", "우선 응대"], popular: true },
];

const Subscription = ({ onBack }: SubscriptionProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <SubPageHeader title="구독 · 결제" subtitle="현재: 무료 플랜" onBack={onBack} />
      
      <div className="space-y-4 pb-8">
        {plans.map((plan, index) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
            className={`bg-card rounded-2xl p-5 shadow-card relative ${plan.popular ? 'ring-2 ring-secondary' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-secondary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-1">
                <Crown className="w-3 h-3" /> 인기
              </div>
            )}
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-serif font-bold text-lg text-foreground">{plan.name}</h3>
              <span className="text-lg font-bold text-secondary">{plan.price}</span>
            </div>
            <ul className="space-y-2 mb-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-accent" /> {feature}
                </li>
              ))}
            </ul>
            <Button variant={plan.popular ? "default" : "outline"} className="w-full rounded-xl">
              {plan.id === "free" ? "현재 플랜" : "구독하기"}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Subscription;
