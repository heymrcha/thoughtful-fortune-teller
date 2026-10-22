import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SubPageHeader from "@/components/common/SubPageHeader";
import { Button } from "@/components/ui/button";

interface TarotReadingProps {
  type: string;
  title: string;
  onBack: () => void;
}

const cardMeanings = {
  "THE FOOL": { meaning: "새로운 시작", desc: "두려움 없이 새로운 여정을 시작할 때입니다. 순수한 마음으로 앞으로 나아가세요." },
  "THE MAGICIAN": { meaning: "창조의 힘", desc: "당신 안에 필요한 모든 것이 있습니다. 의지와 집중으로 원하는 것을 만들어가세요." },
  "THE HIGH PRIESTESS": { meaning: "직관과 지혜", desc: "내면의 목소리에 귀 기울이세요. 답은 이미 당신 안에 있습니다." },
  "THE EMPRESS": { meaning: "풍요와 성장", desc: "창의성과 풍요의 시기입니다. 자신을 돌보고 주변을 가꾸세요." },
  "THE STAR": { meaning: "희망과 영감", desc: "어둠 뒤에 빛이 있습니다. 희망을 잃지 말고 앞으로 나아가세요." },
};

const TarotReading = ({ type, title, onBack }: TarotReadingProps) => {
  const [step, setStep] = useState<"select" | "result">("select");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = Object.keys(cardMeanings);

  useEffect(() => {
    if (!selectedCard || step !== "select") return;
    const timeout = window.setTimeout(() => setStep("result"), 500);
    return () => window.clearTimeout(timeout);
  }, [selectedCard, step]);

  const resetReading = () => {
    setSelectedCard(null);
    setStep("select");
  };

  const handleCardSelect = (card: string) => {
    if (selectedCard) return;
    setSelectedCard(card);
  };

  if (step === "select") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <SubPageHeader title={title} subtitle="카드를 선택하세요" onBack={onBack} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-premium rounded-2xl p-5 shadow-elevated text-center"
        >
          <p className="text-primary-foreground text-sm">
            마음을 가라앉히고, 끌리는 카드 한 장을 선택하세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-5 gap-2">
          {cards.map((card, index) => (
            <Button
              key={card}
              aria-label={`${index + 1}번째 카드 선택`}
              disabled={selectedCard !== null}
              onClick={() => handleCardSelect(card)}
              className="h-auto p-0 aspect-[2/3] bg-gradient-brass rounded-lg shadow-elevated flex items-center justify-center"
            >
              <span className="text-2xl">🃏</span>
            </Button>
          ))}
        </div>
      </motion.div>
    );
  }

  const cardInfo = cardMeanings[selectedCard as keyof typeof cardMeanings];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <SubPageHeader title={title} subtitle="카드 해석" onBack={resetReading} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-card rounded-2xl p-6 shadow-elevated text-center"
      >
        <div className="w-32 h-48 mx-auto mb-4 bg-gradient-premium rounded-xl flex items-center justify-center shadow-elevated">
          <span className="text-4xl">✨</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-foreground mb-1">{selectedCard}</h3>
        <p className="text-secondary font-medium">{cardInfo?.meaning}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-premium rounded-2xl p-6 shadow-elevated"
      >
        <h3 className="text-sm text-primary-foreground/80 mb-2">카드의 메시지</h3>
        <p className="text-lg font-serif text-primary-foreground leading-relaxed">
          {cardInfo?.desc}
        </p>
      </motion.div>

      <div className="pb-8">
        <Button onClick={resetReading} variant="outline" className="w-full h-14 rounded-xl">
          다시 뽑기
        </Button>
      </div>
    </motion.div>
  );
};

export default TarotReading;
