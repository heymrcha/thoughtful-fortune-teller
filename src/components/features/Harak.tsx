import { useState } from "react";
import { motion } from "framer-motion";
import SubPageHeader from "@/components/common/SubPageHeader";
import { Button } from "@/components/ui/button";

interface HarakProps {
  onBack: () => void;
}

const Harak = ({ onBack }: HarakProps) => {
  const [viewType, setViewType] = useState<"pre" | "post">("pre");

  const preHexagram = {
    name: "건괘 (乾卦)",
    symbol: "☰",
    lines: ["━━━", "━━━", "━━━", "━━━", "━━━", "━━━"],
    meaning: "하늘",
    description: "순수한 양의 기운으로, 창조와 시작, 강건함을 상징합니다.",
    lineInterpretation: {
      position: "초구 (初九)",
      verse: "잠룡물용 (潛龍勿用)",
      meaning: "잠긴 용은 쓰지 말라. 아직 때가 아니니 조용히 실력을 기르며 기다려야 할 때입니다.",
    }
  };

  const postHexagram = {
    name: "곤괘 (坤卦)",
    symbol: "☷",
    lines: ["━ ━", "━ ━", "━ ━", "━ ━", "━ ━", "━ ━"],
    meaning: "땅",
    description: "순수한 음의 기운으로, 수용과 포용, 순응을 상징합니다.",
    lineInterpretation: {
      position: "초육 (初六)",
      verse: "이상견빙 (履霜堅氷)",
      meaning: "서리를 밟으면 단단한 얼음이 이른다. 작은 징조에서 큰 흐름을 읽어야 합니다.",
    }
  };

  const currentHexagram = viewType === "pre" ? preHexagram : postHexagram;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <SubPageHeader 
        title="하락이수" 
        subtitle="선천운과 후천운의 괘 해석" 
        onBack={onBack} 
      />

      {/* Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2"
      >
        <button
          onClick={() => setViewType("pre")}
          className={`flex-1 py-3 rounded-xl font-medium transition-all ${
            viewType === "pre"
              ? 'bg-gradient-premium text-primary-foreground shadow-elevated'
              : 'bg-card text-foreground shadow-soft'
          }`}
        >
          선천운
        </button>
        <button
          onClick={() => setViewType("post")}
          className={`flex-1 py-3 rounded-xl font-medium transition-all ${
            viewType === "post"
              ? 'bg-gradient-premium text-primary-foreground shadow-elevated'
              : 'bg-card text-foreground shadow-soft'
          }`}
        >
          후천운
        </button>
      </motion.div>

      {/* Hexagram Display */}
      <motion.div
        key={viewType}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-6 shadow-card text-center"
      >
        <h3 className="text-sm text-muted-foreground mb-4">
          {viewType === "pre" ? "선천운 괘" : "후천운 괘"}
        </h3>
        
        <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-muted rounded-full">
          <span className="text-5xl">{currentHexagram.symbol}</span>
        </div>

        <h4 className="text-xl font-serif font-bold text-foreground mb-2">
          {currentHexagram.name}
        </h4>
        <p className="text-sm text-secondary mb-4">{currentHexagram.meaning}</p>
        
        {/* Lines */}
        <div className="bg-muted rounded-xl p-4 mb-4">
          <div className="space-y-1">
            {currentHexagram.lines.map((line, index) => (
              <div 
                key={index}
                className="text-2xl font-mono text-foreground tracking-widest"
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {currentHexagram.description}
        </p>
      </motion.div>

      {/* Line Interpretation */}
      <motion.div
        key={`line-${viewType}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-5 shadow-card"
      >
        <h3 className="font-serif font-semibold text-foreground mb-4">
          {viewType === "pre" ? "선천운 효" : "후천운 효"} 해석
        </h3>
        
        <div className="bg-muted rounded-xl p-4 mb-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">
            {currentHexagram.lineInterpretation.position}
          </p>
          <p className="text-lg font-serif text-secondary">
            "{currentHexagram.lineInterpretation.verse}"
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {currentHexagram.lineInterpretation.meaning}
        </p>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-premium rounded-2xl p-6 shadow-elevated"
      >
        <h3 className="text-sm text-primary-foreground/80 mb-2">종합 해석</h3>
        <p className="text-primary-foreground leading-relaxed">
          {viewType === "pre" 
            ? "선천적으로 강건하고 창의적인 기운을 타고났습니다. 리더십과 추진력이 있으나, 때를 기다리는 지혜가 필요합니다."
            : "후천적으로 포용력과 인내심이 발달합니다. 주변과의 조화를 이루며 순리대로 나아갈 때 성과가 있습니다."
          }
        </p>
      </motion.div>

      <div className="pb-8">
        <Button 
          variant="outline"
          className="w-full h-14 text-lg font-medium rounded-xl"
        >
          전문 상담 받기
        </Button>
      </div>
    </motion.div>
  );
};

export default Harak;
