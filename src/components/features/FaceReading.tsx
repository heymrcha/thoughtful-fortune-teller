import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, Sparkles, ArrowLeft, Share2, RotateCcw, Heart, AlertTriangle, Scissors, Palette, Shirt, Droplets, Briefcase, MessageCircle, Users, Star, TrendingUp, Flame, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FaceReadingProps {
  onBack: () => void;
}

interface AnimalType {
  name: string;
  emoji: string;
  description: string;
  percentage: number;
}

interface PersonalityScore {
  name: string;
  score: number;
  icon: React.ElementType;
  color: string;
}

interface Compatibility {
  animal: string;
  emoji: string;
  reason: string;
}

interface StyleAdvice {
  category: string;
  icon: React.ElementType;
  advice: string;
}

interface AnimalReadingResult {
  mainAnimal: AnimalType;
  candidates: AnimalType[];
  personalityScores: PersonalityScore[];
  personalityTraits: string[];
  facialFeatures: string[];
  physiognomyBasis: string[];
  strengths: string[];
  cautions: string[];
  suitableJobs: string[];
  communicationTips: string[];
  compatibility: {
    good: Compatibility[];
    caution: Compatibility[];
  };
  styleAdvice: StyleAdvice[];
}

const mockResult: AnimalReadingResult = {
  mainAnimal: {
    name: "여우상",
    emoji: "🦊",
    description: "날카로운 지성과 매력적인 분위기를 가진 당신은 전통 관상학에서 '여우상'으로 분류됩니다. 눈매가 살짝 올라가고 턱선이 갸름하며, 전체적으로 세련되고 영리한 인상을 풍깁니다.",
    percentage: 87,
  },
  candidates: [
    { name: "고양이상", emoji: "🐱", description: "도도하고 우아한 매력", percentage: 72 },
    { name: "사슴상", emoji: "🦌", description: "순수하고 청초한 이미지", percentage: 58 },
    { name: "토끼상", emoji: "🐰", description: "귀엽고 친근한 인상", percentage: 45 },
  ],
  personalityScores: [
    { name: "리더십", score: 78, icon: TrendingUp, color: "hsl(var(--primary))" },
    { name: "따뜻함", score: 65, icon: Flame, color: "hsl(var(--destructive))" },
    { name: "창의성", score: 92, icon: Sparkles, color: "hsl(var(--accent-foreground))" },
    { name: "안정성", score: 70, icon: Shield, color: "hsl(var(--secondary-foreground))" },
    { name: "민첩성", score: 88, icon: Zap, color: "hsl(var(--primary))" },
  ],
  personalityTraits: [
    "상황 판단력이 뛰어나며 위기 상황에서도 냉정함을 유지합니다",
    "사교성이 좋아 다양한 사람들과 쉽게 어울립니다",
    "호기심이 많고 새로운 것을 배우는 데 적극적입니다",
    "직관력이 뛰어나 상대방의 의도를 빠르게 파악합니다",
    "독립적이며 자신만의 방식을 추구하는 경향이 있습니다",
  ],
  facialFeatures: [
    "눈꼬리가 살짝 올라가 날카로우면서도 매력적인 눈매",
    "갸름하고 정돈된 턱선으로 세련된 인상",
    "오똑한 코로 지적인 분위기 연출",
    "얇고 정교한 입술로 세밀한 표현력",
    "넓은 이마로 지혜와 통찰력을 상징",
  ],
  physiognomyBasis: [
    "동양 관상학에서 눈꼬리가 올라간 형태는 '봉안(鳳眼)'에 가까워 지혜와 영민함을 나타냅니다",
    "갸름한 턱선은 결단력과 추진력을 상징하며, 목표 지향적 성향을 보여줍니다",
    "코의 높이와 형태는 자존심과 성취욕을 반영하며, 중년 이후의 재물복과 연관됩니다",
    "입술의 두께와 모양은 표현력과 언변, 그리고 음식복을 나타냅니다",
  ],
  strengths: [
    "뛰어난 분석력과 판단력으로 복잡한 상황에서도 최적의 해결책을 찾아냅니다",
    "매력적인 화술로 사람들을 설득하고 이끄는 능력이 탁월합니다",
    "변화에 빠르게 적응하며 위기를 기회로 바꾸는 능력이 있습니다",
    "세심한 관찰력으로 다른 사람들이 놓치는 부분을 포착합니다",
    "창의적 사고로 혁신적인 아이디어를 제시합니다",
  ],
  cautions: [
    "지나친 계산적 사고는 진정성이 없어 보일 수 있으니 주의하세요",
    "독립적 성향이 강해 팀워크에서 고립될 수 있습니다",
    "예민한 직관력이 때로는 지나친 의심으로 이어질 수 있습니다",
    "완벽주의 성향으로 인해 스트레스를 받기 쉽습니다",
    "감정 표현에 인색해 오해를 받을 수 있으니 솔직함이 필요합니다",
  ],
  suitableJobs: [
    "전략 컨설턴트",
    "마케팅 전문가",
    "크리에이티브 디렉터",
    "투자 분석가",
    "심리 상담사",
    "외교관",
    "변호사",
    "미디어 기획자",
  ],
  communicationTips: [
    "첫인상이 날카롭게 보일 수 있으니 미소로 부드러움을 더하세요",
    "상대방의 이야기를 경청하는 모습을 적극적으로 보여주세요",
    "직접적인 조언보다 공감을 먼저 표현하면 신뢰를 얻습니다",
    "논리적 설명과 함께 감성적 요소를 가미하면 설득력이 높아집니다",
    "비언어적 소통(표정, 제스처)을 활용해 친근감을 표현하세요",
  ],
  compatibility: {
    good: [
      { animal: "강아지상", emoji: "🐕", reason: "여우상의 날카로움을 순수함으로 중화시켜 균형 잡힌 관계를 형성합니다" },
      { animal: "곰상", emoji: "🐻", reason: "든든한 안정감을 제공하며, 서로 부족한 부분을 채워주는 상생 관계입니다" },
      { animal: "부엉이상", emoji: "🦉", reason: "지적인 대화를 나누며 서로의 성장을 자극하는 좋은 파트너입니다" },
    ],
    caution: [
      { animal: "호랑이상", emoji: "🐯", reason: "두 가지 강한 성향이 충돌하여 주도권 다툼이 생길 수 있습니다" },
      { animal: "독수리상", emoji: "🦅", reason: "비슷한 날카로움으로 인해 경쟁 관계로 발전할 가능성이 있습니다" },
    ],
  },
  styleAdvice: [
    { category: "헤어스타일", icon: Scissors, advice: "갸름한 얼굴형을 살리는 레이어드 컷이나 웨이브 펌이 잘 어울립니다. 앞머리는 옆으로 자연스럽게 넘기거나, 시스루 뱅으로 부드러움을 더하세요." },
    { category: "메이크업", icon: Palette, advice: "눈꼬리를 살린 아이라인으로 날카로운 매력을 강조하되, 립은 코랄이나 피치톤으로 부드러움을 더하세요. 하이라이터로 광대뼈를 은은하게 강조하면 입체감이 살아납니다." },
    { category: "패션", icon: Shirt, advice: "슬림핏 정장이나 미니멀한 원피스가 세련된 이미지를 극대화합니다. 포인트 액세서리로 개성을 표현하고, 모노톤 컬러에 와인이나 네이비 포인트를 활용하세요." },
    { category: "컬러", icon: Droplets, advice: "블랙, 화이트, 그레이 같은 무채색이 기본이며, 버건디, 에메랄드, 네이비 같은 깊은 컬러가 지적인 분위기를 살려줍니다. 골드 액세서리로 고급스러움을 더하세요." },
  ],
};

const FaceReading = ({ onBack }: FaceReadingProps) => {
  const [step, setStep] = useState<"upload" | "analyzing" | "result">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    setStep("analyzing");
    setAnalysisProgress(0);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep("result"), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setStep("upload");
    setAnalysisProgress(0);
  };

  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "나의 동물관상 결과",
          text: `나의 동물상은 ${mockResult.mainAnimal.emoji} ${mockResult.mainAnimal.name}입니다!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("공유 취소됨");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border"
      >
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">AI 동물관상</h1>
          <div className="w-9" />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Upload Step */}
        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <span className="text-3xl">🦊</span>
              </div>
              <h2 className="text-xl font-bold">동물관상 분석</h2>
              <p className="text-muted-foreground text-sm">
                40가지 전통 동물관상 중<br />
                당신의 유형을 AI가 분석합니다
              </p>
            </div>

            {/* Image Preview or Upload Area */}
            <div className="space-y-4">
              {selectedImage ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative aspect-square rounded-2xl overflow-hidden border-2 border-primary/20"
                >
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={resetAnalysis}
                    className="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-2xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
                >
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <Camera className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">사진 업로드</p>
                    <p className="text-sm text-muted-foreground">
                      정면 얼굴 사진을 선택해주세요
                    </p>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {!selectedImage && (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-14"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    갤러리
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    카메라
                  </Button>
                </div>
              )}

              {selectedImage && (
                <Button
                  className="w-full h-14 text-lg bg-gradient-premium"
                  onClick={startAnalysis}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  동물상 분석 시작
                </Button>
              )}
            </div>

            {/* Tips */}
            <div className="bg-muted/50 rounded-xl p-4 space-y-2">
              <p className="font-medium text-sm">📸 좋은 분석을 위한 팁</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 정면을 바라보는 사진이 좋아요</li>
                <li>• 밝은 조명에서 촬영한 사진을 사용해주세요</li>
                <li>• 얼굴이 선명하게 보이는 사진을 선택해주세요</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Analyzing Step */}
        {step === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 flex flex-col items-center justify-center min-h-[60vh] space-y-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">🔮</span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">동물상 분석 중...</h2>
              <p className="text-muted-foreground text-sm">
                40가지 동물관상 중 당신의 유형을 찾고 있습니다
              </p>
            </div>

            <div className="w-full max-w-xs space-y-2">
              <Progress value={Math.min(analysisProgress, 100)} className="h-2" />
              <p className="text-center text-sm text-muted-foreground">
                {Math.min(Math.round(analysisProgress), 100)}%
              </p>
            </div>

            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>얼굴 특징 분석 중...</p>
              <p>동물 유형 매칭 중...</p>
              <p>성격 특성 파악 중...</p>
            </div>
          </motion.div>
        )}

        {/* Result Step */}
        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 space-y-6"
          >
            {/* 1. Main Animal Result */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-premium rounded-2xl p-6 text-primary-foreground text-center"
            >
              <p className="text-sm opacity-80 mb-3">당신의 동물상은</p>
              <div className="text-6xl mb-3">{mockResult.mainAnimal.emoji}</div>
              <div className="text-3xl font-bold mb-2">
                {mockResult.mainAnimal.name}
                <span className="text-lg ml-2 opacity-80">
                  ({mockResult.mainAnimal.percentage}% 일치)
                </span>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                {mockResult.mainAnimal.description}
              </p>
            </motion.div>

            {/* 2. Candidate Animals */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                상위 후보 동물상
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {mockResult.candidates.map((candidate, index) => (
                  <div
                    key={candidate.name}
                    className="bg-card rounded-xl border border-border p-3 text-center"
                  >
                    <div className="text-3xl mb-2">{candidate.emoji}</div>
                    <p className="font-medium text-sm">{candidate.name}</p>
                    <p className="text-xs text-primary">{candidate.percentage}%</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {candidate.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 3. Personality Scores */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h3 className="font-bold text-lg">📊 성격 특성 점수</h3>
              <div className="bg-card rounded-xl border border-border p-4 space-y-4">
                {mockResult.personalityScores.map((score) => {
                  const Icon = score.icon;
                  return (
                    <div key={score.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{score.name}</span>
                        </div>
                        <span className="text-sm font-bold text-primary">
                          {score.score}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score.score}%` }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* 4. Personality Traits */}
            <ResultSection
              title="🧠 성격 특성"
              items={mockResult.personalityTraits}
              delay={0.4}
            />

            {/* 5. Facial Features */}
            <ResultSection
              title="👤 얼굴 특징"
              items={mockResult.facialFeatures}
              delay={0.45}
            />

            {/* 6. Physiognomy Basis */}
            <ResultSection
              title="📜 관상학적 근거"
              items={mockResult.physiognomyBasis}
              delay={0.5}
            />

            {/* 7. Strengths */}
            <ResultSection
              title="✨ 장점"
              items={mockResult.strengths}
              delay={0.55}
              variant="positive"
            />

            {/* 8. Cautions */}
            <ResultSection
              title="⚠️ 주의사항"
              items={mockResult.cautions}
              delay={0.6}
              variant="warning"
            />

            {/* 9. Suitable Jobs */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="space-y-3"
            >
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                적합한 직업
              </h3>
              <div className="flex flex-wrap gap-2">
                {mockResult.suitableJobs.map((job) => (
                  <span
                    key={job}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {job}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* 10. Communication Tips */}
            <ResultSection
              title="💬 커뮤니케이션 팁"
              items={mockResult.communicationTips}
              delay={0.7}
              icon={MessageCircle}
            />

            {/* 11. Compatibility */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="space-y-3"
            >
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                동물상 궁합
              </h3>
              <div className="space-y-3">
                {/* Good Compatibility */}
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="font-medium text-sm">잘 맞는 동물상</span>
                  </div>
                  <div className="space-y-3">
                    {mockResult.compatibility.good.map((item) => (
                      <div key={item.animal} className="flex gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <p className="font-medium text-sm">{item.animal}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Caution Compatibility */}
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="font-medium text-sm">주의가 필요한 동물상</span>
                  </div>
                  <div className="space-y-3">
                    {mockResult.compatibility.caution.map((item) => (
                      <div key={item.animal} className="flex gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <p className="font-medium text-sm">{item.animal}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 12. Style Advice */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <h3 className="font-bold text-lg">💄 스타일 조언</h3>
              <div className="grid grid-cols-2 gap-3">
                {mockResult.styleAdvice.map((style) => {
                  const Icon = style.icon;
                  return (
                    <div
                      key={style.category}
                      className="bg-card rounded-xl border border-border p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">{style.category}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {style.advice}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* 13. Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex gap-3 pt-4"
            >
              <Button variant="outline" className="flex-1" onClick={resetAnalysis}>
                <RotateCcw className="w-4 h-4 mr-2" />
                다시 분석하기
              </Button>
              <Button className="flex-1 bg-gradient-premium" onClick={shareResult}>
                <Share2 className="w-4 h-4 mr-2" />
                결과 공유하기
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Component for Result Sections
interface ResultSectionProps {
  title: string;
  items: string[];
  delay: number;
  variant?: "default" | "positive" | "warning";
  icon?: React.ElementType;
}

const ResultSection = ({
  title,
  items,
  delay,
  variant = "default",
  icon: Icon,
}: ResultSectionProps) => {
  const bgColors = {
    default: "bg-card",
    positive: "bg-emerald-50 dark:bg-emerald-950/20",
    warning: "bg-amber-50 dark:bg-amber-950/20",
  };

  const bulletColors = {
    default: "bg-primary",
    positive: "bg-emerald-500",
    warning: "bg-amber-500",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-3"
    >
      <h3 className="font-bold text-lg flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-primary" />}
        {title}
      </h3>
      <div className={`${bgColors[variant]} rounded-xl border border-border p-4`}>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex gap-3 text-sm">
              <span
                className={`w-1.5 h-1.5 rounded-full ${bulletColors[variant]} mt-2 flex-shrink-0`}
              />
              <span className="text-muted-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default FaceReading;
