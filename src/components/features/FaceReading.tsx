import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, Sparkles, ArrowLeft, Eye, Smile, CircleDot, Brain, Heart, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FaceReadingProps {
  onBack: () => void;
}

interface FaceReadingResult {
  overall: {
    score: number;
    description: string;
  };
  features: {
    icon: React.ElementType;
    name: string;
    title: string;
    score: number;
    description: string;
    details: string;
  }[];
  fortune: {
    icon: React.ElementType;
    category: string;
    prediction: string;
    advice: string;
  }[];
  summary: string;
}

const mockResult: FaceReadingResult = {
  overall: {
    score: 85,
    description: "조화롭고 균형 잡힌 관상으로, 타고난 복과 지혜가 돋보입니다.",
  },
  features: [
    {
      icon: Eye,
      name: "eyes",
      title: "눈 (안목)",
      score: 88,
      description: "맑고 깊은 눈빛",
      details: "통찰력이 뛰어나며 사람을 보는 안목이 탁월합니다. 진실과 거짓을 구별하는 능력이 있어 인간관계에서 속지 않는 편입니다.",
    },
    {
      icon: CircleDot,
      name: "nose",
      title: "코 (재복)",
      score: 82,
      description: "반듯하고 균형 잡힌 코",
      details: "재물복이 있으며 중년 이후 안정적인 경제력을 갖추게 됩니다. 자수성가의 기운이 있어 본인의 노력으로 성공할 가능성이 높습니다.",
    },
    {
      icon: Smile,
      name: "mouth",
      title: "입 (언복)",
      score: 90,
      description: "단정하고 복스러운 입",
      details: "말솜씨가 좋고 설득력이 있습니다. 언변으로 인해 좋은 기회를 얻을 수 있으며, 음식복도 함께 따릅니다.",
    },
    {
      icon: Brain,
      name: "forehead",
      title: "이마 (지혜)",
      score: 78,
      description: "넓고 시원한 이마",
      details: "초년운이 좋으며 학업에 뛰어난 재능을 보입니다. 논리적 사고와 계획 능력이 출중하여 리더십을 발휘할 수 있습니다.",
    },
  ],
  fortune: [
    {
      icon: Heart,
      category: "애정운",
      prediction: "진실된 사랑을 만날 상입니다",
      advice: "외모보다 마음을 보는 눈이 있어, 좋은 인연을 알아보는 능력이 있습니다. 30대에 인연을 만나면 백년해로할 가능성이 높습니다.",
    },
    {
      icon: Briefcase,
      category: "직업운",
      prediction: "창의적인 분야에서 두각",
      advice: "예술, 기획, 컨설팅 등 아이디어를 활용하는 직업에서 성공할 기질이 보입니다. 안정적인 직장보다는 전문성을 살린 독립이 맞습니다.",
    },
    {
      icon: Users,
      category: "대인운",
      prediction: "귀인이 따르는 상",
      advice: "주변 사람들에게 신뢰를 주는 인상으로, 어려울 때 도움의 손길이 찾아옵니다. 인맥을 소중히 하면 큰 기회로 연결됩니다.",
    },
  ],
  summary: "전체적으로 복이 많고 지혜로운 관상입니다. 특히 눈과 입의 조화가 뛰어나 대인관계와 커뮤니케이션에서 강점을 보입니다. 중년 이후 안정과 성공이 예상되며, 꾸준한 노력이 뒷받침된다면 원하는 바를 이룰 수 있는 상입니다.",
};

const FaceReading = ({ onBack }: FaceReadingProps) => {
  const [step, setStep] = useState<"upload" | "analyzing" | "result">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
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

    // Simulate analysis progress
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
    setExpandedFeature(null);
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
          <h1 className="text-lg font-bold">AI 관상</h1>
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
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold">AI 관상 분석</h2>
              <p className="text-muted-foreground text-sm">
                얼굴 사진을 업로드하면 AI가<br />
                당신의 관상을 분석해드립니다
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
                  관상 분석 시작
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
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">관상 분석 중...</h2>
              <p className="text-muted-foreground text-sm">
                AI가 얼굴의 특징을 분석하고 있습니다
              </p>
            </div>

            <div className="w-full max-w-xs space-y-2">
              <Progress value={Math.min(analysisProgress, 100)} className="h-2" />
              <p className="text-center text-sm text-muted-foreground">
                {Math.min(Math.round(analysisProgress), 100)}%
              </p>
            </div>

            <div className="text-center text-xs text-muted-foreground space-y-1">
              <p>눈의 형태 분석 중...</p>
              <p>코의 비율 측정 중...</p>
              <p>전체 조화 평가 중...</p>
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
            {/* Overall Score */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-premium rounded-2xl p-6 text-primary-foreground text-center"
            >
              <p className="text-sm opacity-80 mb-2">종합 관상 점수</p>
              <div className="text-5xl font-bold mb-2">
                {mockResult.overall.score}
                <span className="text-2xl">점</span>
              </div>
              <p className="text-sm opacity-90">{mockResult.overall.description}</p>
            </motion.div>

            {/* Feature Analysis */}
            <section className="space-y-3">
              <h3 className="font-bold text-lg">부위별 분석</h3>
              {mockResult.features.map((feature, index) => {
                const Icon = feature.icon;
                const isExpanded = expandedFeature === feature.name;

                return (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-card rounded-xl border border-border overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedFeature(isExpanded ? null : feature.name)
                      }
                      className="w-full p-4 flex items-center gap-4 text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{feature.title}</span>
                          <span className="text-primary font-bold">
                            {feature.score}점
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {feature.description}
                        </p>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.details}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </section>

            {/* Fortune Predictions */}
            <section className="space-y-3">
              <h3 className="font-bold text-lg">운세 예측</h3>
              <div className="space-y-3">
                {mockResult.fortune.map((fortune, index) => {
                  const Icon = fortune.icon;
                  return (
                    <motion.div
                      key={fortune.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-card rounded-xl border border-border p-4"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <Icon className="w-5 h-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{fortune.category}</p>
                          <p className="text-sm text-primary">
                            {fortune.prediction}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {fortune.advice}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-muted/50 rounded-xl p-4"
            >
              <h3 className="font-bold mb-2">💫 종합 해석</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mockResult.summary}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={resetAnalysis}>
                다시 분석하기
              </Button>
              <Button className="flex-1 bg-gradient-premium">
                결과 저장하기
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaceReading;
