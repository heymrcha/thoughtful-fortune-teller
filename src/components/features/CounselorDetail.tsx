import { motion } from "framer-motion";
import { ArrowLeft, Star, MessageCircle, Phone, Video, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CounselorDetailProps {
  counselor: {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    available: boolean;
    image: string;
  };
  onBack: () => void;
}

const CounselorDetail = ({ counselor, onBack }: CounselorDetailProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="flex items-center gap-3 pt-4">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center shadow-soft">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-serif font-bold text-foreground">상담사 프로필</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-card text-center">
        <img src={counselor.image} alt={counselor.name} className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4" />
        <h2 className="text-xl font-serif font-bold text-foreground mb-1">{counselor.name}</h2>
        <p className="text-sm text-muted-foreground mb-3">{counselor.specialty}</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="w-5 h-5 text-secondary fill-secondary" />
          <span className="font-bold text-foreground">{counselor.rating}</span>
          <span className="text-muted-foreground">({counselor.reviews} 리뷰)</span>
        </div>
        {counselor.available ? (
          <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium">상담 가능</span>
        ) : (
          <span className="inline-block px-4 py-1.5 bg-muted text-muted-foreground rounded-full text-sm">상담중</span>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-5 shadow-card">
        <h3 className="font-serif font-semibold text-foreground mb-3">소개</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          20년 이상의 명리학 연구와 상담 경험을 바탕으로, 삶의 방향과 선택에 대한 깊이 있는 조언을 드립니다. 특히 인간관계와 직업 선택 상담에 전문성을 가지고 있습니다.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-4 shadow-soft text-center">
          <Clock className="w-5 h-5 text-secondary mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">3,200+</div>
          <div className="text-xs text-muted-foreground">상담 시간</div>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-soft text-center">
          <Award className="w-5 h-5 text-secondary mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">20년</div>
          <div className="text-xs text-muted-foreground">경력</div>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-soft text-center">
          <Star className="w-5 h-5 text-secondary mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">98%</div>
          <div className="text-xs text-muted-foreground">만족도</div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3 pb-8">
        <h3 className="font-serif font-semibold text-foreground">상담 방식 선택</h3>
        <Button className="w-full h-14 justify-start gap-3 rounded-xl" variant="outline">
          <MessageCircle className="w-5 h-5" /> 채팅 상담 <span className="ml-auto text-secondary">10,000원/15분</span>
        </Button>
        <Button className="w-full h-14 justify-start gap-3 rounded-xl" variant="outline">
          <Phone className="w-5 h-5" /> 전화 상담 <span className="ml-auto text-secondary">20,000원/15분</span>
        </Button>
        <Button className="w-full h-14 justify-start gap-3 rounded-xl" variant="outline">
          <Video className="w-5 h-5" /> 영상 상담 <span className="ml-auto text-secondary">30,000원/15분</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default CounselorDetail;
