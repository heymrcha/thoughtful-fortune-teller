import { useState } from "react";
import SampleNotice from "@/components/common/SampleNotice";
import { motion } from "framer-motion";
import { Search, Heart, Star } from "lucide-react";
import SubPageHeader from "@/components/common/SubPageHeader";
import { Input } from "@/components/ui/input";

interface CelebrityMatchProps {
  onBack: () => void;
}

const celebrities = [
  { id: 1, name: "아이유", birth: "1993.05.16" },
  { id: 2, name: "뷔 (김태형)", birth: "1995.12.30" },
  { id: 3, name: "수지", birth: "1994.10.10" },
  { id: 4, name: "공유", birth: "1979.07.10" },
  { id: 5, name: "전지현", birth: "1981.10.30" },
  { id: 6, name: "현빈", birth: "1982.09.25" },
];

const CelebrityMatch = ({ onBack }: CelebrityMatchProps) => {
  const [selectedCeleb, setSelectedCeleb] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCelebs = celebrities.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCelebClick = (id: number) => {
    setSelectedCeleb(id);
    setShowResult(true);
  };

  if (showResult && selectedCeleb) {
    const celeb = celebrities.find(c => c.id === selectedCeleb);
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <SubPageHeader 
          title="연예인 궁합 결과" 
          onBack={() => setShowResult(false)} 
        />

      <SampleNotice>샘플 결과입니다. 선택한 연예인과 관계없이 같은 해석이 표시됩니다.</SampleNotice>

        {/* Match Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-card text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-premium flex items-center justify-center mb-2 mx-auto">
                <span className="text-xl text-primary-foreground">나</span>
              </div>
              <p className="text-sm text-muted-foreground">홍길동</p>
            </div>
            <Heart className="w-8 h-8 text-accent fill-accent animate-pulse" />
            <div className="text-center">
              <div
                aria-hidden="true"
                className="w-16 h-16 rounded-full bg-gradient-brass flex items-center justify-center mb-2 mx-auto text-xl font-serif text-primary-foreground"
              >
                {celeb?.name.charAt(0)}
              </div>
              <p className="text-sm text-muted-foreground">{celeb?.name}</p>
            </div>
          </div>
          
          <div className="text-4xl font-bold text-secondary mb-2">78%</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
            ))}
            <Star className="w-5 h-5 text-muted" />
          </div>
          <p className="text-sm text-muted-foreground">서로에게 좋은 영향을 주는 인연</p>
        </motion.div>

        {/* Result Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-premium rounded-2xl p-6 shadow-elevated"
        >
          <h3 className="text-sm text-primary-foreground/80 mb-2">궁합 해석</h3>
          <p className="text-primary-foreground leading-relaxed">
            목(木)과 화(火)의 만남으로, 서로의 에너지를 북돋아 주는 관계입니다.
            함께하면 창의적인 시너지가 발휘됩니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-card space-y-4 pb-8"
        >
          <div>
            <h4 className="font-medium text-foreground mb-2">💕 케미 포인트</h4>
            <p className="text-sm text-muted-foreground">
              유머 감각이 잘 맞고, 서로의 꿈을 응원하는 관계가 됩니다.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">⚡ 주의할 점</h4>
            <p className="text-sm text-muted-foreground">
              둘 다 불의 기운이 있어 감정이 격해질 수 있으니 대화로 풀어가세요.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">🎯 추천 데이트</h4>
            <p className="text-sm text-muted-foreground">
              콘서트, 전시회 등 문화 예술 활동을 함께하면 좋습니다.
            </p>
          </div>
        </motion.div>
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
        title="연예인 궁합" 
        subtitle="좋아하는 연예인과의 궁합은?" 
        onBack={onBack} 
      />

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          placeholder="연예인 이름을 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 bg-card border-0 rounded-xl shadow-soft"
        />
      </motion.div>

      {/* Celebrity List */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3 pb-8"
      >
        <h3 className="font-serif font-semibold text-foreground">인기 연예인</h3>
        
        {filteredCelebs.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">검색 결과가 없습니다.</p>
        )}

        <div className="grid grid-cols-2 gap-3">
          {filteredCelebs.map((celeb, index) => (
            <motion.button
              key={celeb.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index + 0.2 }}
              onClick={() => handleCelebClick(celeb.id)}
              className="bg-card rounded-xl p-4 shadow-soft hover:shadow-card transition-all text-left"
            >
              <div
                aria-hidden="true"
                className="w-14 h-14 rounded-full bg-gradient-brass flex items-center justify-center mx-auto mb-3 text-lg font-serif text-primary-foreground"
              >
                {celeb.name.charAt(0)}
              </div>
              <h4 className="font-medium text-foreground text-center">{celeb.name}</h4>
              <p className="text-xs text-muted-foreground text-center mt-1">{celeb.birth}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CelebrityMatch;
