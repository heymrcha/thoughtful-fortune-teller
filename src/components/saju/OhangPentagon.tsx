import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface OhangData {
  element: string;
  name: string;
  value: number;
  color: string;
}

interface OhangPentagonProps {
  data: OhangData[];
}

const ohangDetails: Record<string, { 
  title: string; 
  traits: string[]; 
  strength: string; 
  weakness: string;
  compatibility: string;
}> = {
  "木": {
    title: "목(木) - 나무의 기운",
    traits: ["성장과 발전을 상징", "창의성과 유연함", "인자하고 관대함", "새로운 시작의 에너지"],
    strength: "계획력이 뛰어나고 목표를 향해 꾸준히 성장하는 힘이 있습니다.",
    weakness: "너무 고집스럽거나 우유부단할 수 있습니다.",
    compatibility: "수(水)가 도움이 되고, 금(金)과는 조심해야 합니다."
  },
  "火": {
    title: "화(火) - 불의 기운",
    traits: ["열정과 에너지를 상징", "밝고 따뜻한 성격", "표현력이 풍부함", "리더십과 추진력"],
    strength: "사람들에게 영감을 주고 분위기를 밝게 만드는 힘이 있습니다.",
    weakness: "급하고 성급한 판단을 할 수 있습니다.",
    compatibility: "목(木)이 도움이 되고, 수(水)와는 조심해야 합니다."
  },
  "土": {
    title: "토(土) - 흙의 기운",
    traits: ["안정과 중심을 상징", "신뢰와 성실함", "포용력이 크다", "중재자 역할"],
    strength: "어떤 상황에서도 중심을 잡고 조화를 이루는 힘이 있습니다.",
    weakness: "변화를 두려워하거나 고지식할 수 있습니다.",
    compatibility: "화(火)가 도움이 되고, 목(木)과는 조심해야 합니다."
  },
  "金": {
    title: "금(金) - 쇠의 기운",
    traits: ["결단력과 정의를 상징", "원칙을 중시함", "냉철하고 명확함", "완성과 수확"],
    strength: "명확한 판단력으로 일을 마무리하는 힘이 있습니다.",
    weakness: "지나치게 완벽주의적이거나 냉정할 수 있습니다.",
    compatibility: "토(土)가 도움이 되고, 화(火)와는 조심해야 합니다."
  },
  "水": {
    title: "수(水) - 물의 기운",
    traits: ["지혜와 적응력을 상징", "유연하고 깊은 사고", "직관력이 뛰어남", "소통과 흐름"],
    strength: "어떤 환경에도 적응하고 지혜롭게 대처하는 힘이 있습니다.",
    weakness: "우울하거나 불안정할 수 있습니다.",
    compatibility: "금(金)이 도움이 되고, 토(土)와는 조심해야 합니다."
  }
};

const OhangPentagon = ({ data }: OhangPentagonProps) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const maxValue = Math.max(1, ...data.map((d) => Number.isFinite(d.value) ? d.value : 0));
  const centerX = 120;
  const centerY = 120;
  const maxRadius = 90;

  // 오행 순서: 목(상단) → 화(우상) → 토(우하) → 금(좌하) → 수(좌상)
  const angles = [
    -90,   // 목 (상단)
    -18,   // 화 (우상)
    54,    // 토 (우하)
    126,   // 금 (좌하)
    198,   // 수 (좌상)
  ];

  const getPoint = (index: number, value: number) => {
    const angle = (angles[index] * Math.PI) / 180;
    const radius = (value / maxValue) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const getOuterPoint = (index: number) => {
    const angle = (angles[index] * Math.PI) / 180;
    return {
      x: centerX + maxRadius * Math.cos(angle),
      y: centerY + maxRadius * Math.sin(angle),
    };
  };

  const getLabelPoint = (index: number) => {
    const angle = (angles[index] * Math.PI) / 180;
    const radius = maxRadius + 24;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // 오각형 외곽선 생성
  const outerPoints = data.map((_, i) => getOuterPoint(i));
  const outerPath = outerPoints.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';

  // 데이터 값 오각형 생성
  const dataPoints = data.map((item, i) => getPoint(i, item.value));
  const dataPath = dataPoints.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';

  // 중간 그리드 라인 (50% 위치)
  const midPoints = data.map((_, i) => {
    const angle = (angles[i] * Math.PI) / 180;
    const radius = maxRadius * 0.5;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });
  const midPath = midPoints.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';

  const selectedData = selectedElement ? data.find(d => d.element === selectedElement) : null;
  const selectedDetail = selectedElement ? ohangDetails[selectedElement] : null;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-sm text-muted-foreground mb-4">오행 균형 차트</h3>
      <p className="text-xs text-muted-foreground mb-4 text-center">각 오행을 터치하면 상세 설명을 볼 수 있습니다</p>
      <div className="flex justify-center">
        <svg width="240" height="240" viewBox="0 0 240 240" className="max-w-full" aria-label="오행 균형 차트">
          {/* 외곽 오각형 */}
          <path
            d={outerPath}
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1"
            opacity="0.2"
          />
          
          {/* 중간 오각형 (50%) */}
          <path
            d={midPath}
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1"
            opacity="0.1"
            strokeDasharray="4 4"
          />
          
          {/* 축 라인 */}
          {outerPoints.map((point, i) => (
            <line
              key={`axis-${i}`}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              opacity="0.15"
            />
          ))}
          
          {/* 데이터 영역 */}
          <motion.path
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            d={dataPath}
            fill="hsl(var(--primary) / 0.2)"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            style={{ transformOrigin: `${centerX}px ${centerY}px` }}
          />
          
          {/* 그라디언트 정의 */}
          <defs>
            <linearGradient id="pentagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* 데이터 포인트 - 클릭 가능 */}
          {dataPoints.map((point, i) => (
            <motion.circle
              key={`point-${i}`}
              initial={{ scale: 0 }}
              animate={{ 
                scale: selectedElement === data[i].element ? 1.3 : 1,
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.3 }}
              cx={point.x}
              cy={point.y}
              r="8"
              fill={data[i].color}
              stroke="hsl(var(--card))"
              strokeWidth={selectedElement === data[i].element ? 3 : 2}
              onClick={() => setSelectedElement(data[i].element)}
              style={{ cursor: "pointer" }}
            />
          ))}
          
          {/* 라벨 - 클릭 가능 */}
          {data.map((item, i) => {
            const labelPos = getLabelPoint(i);
            return (
              <g 
                key={`label-${i}`} 
                onClick={() => setSelectedElement(item.element)}
                style={{ cursor: "pointer" }}
              >
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-serif"
                  fill={item.color}
                  fontWeight={selectedElement === item.element ? "bold" : "normal"}
                >
                  {item.element}
                </text>
                <text
                  x={labelPos.x}
                  y={labelPos.y + 14}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[10px]"
                  fill="hsl(var(--muted-foreground))"
                >
                  {item.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* 범례 */}
      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {data.map((item) => (
          <Button variant="ghost" aria-label={`${item.name} 상세 설명`} aria-pressed={selectedElement === item.element}
            key={item.element}
            onClick={() => setSelectedElement(item.element)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${
              selectedElement === item.element 
                ? "bg-muted ring-2 ring-offset-1" 
                : "hover:bg-muted/50"
            }`}
            style={{ 
              outlineColor: selectedElement === item.element ? item.color : undefined,
              boxShadow: selectedElement === item.element ? `0 0 0 2px ${item.color}` : undefined
            }}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">
              {item.element} {item.value}
            </span>
          </Button>
        ))}
      </div>

      {/* 상세 설명 팝업 */}
      <AnimatePresence>
        {selectedElement && selectedDetail && selectedData && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 overflow-hidden"
          >
            <div 
              className="rounded-xl p-5 relative bg-muted"
              
            >
              {/* 닫기 버튼 */}
              <Button variant="ghost" size="icon" aria-label="오행 설명 닫기"
                onClick={() => setSelectedElement(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </Button>

              {/* 헤더 */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: selectedData.color }}
                >
                  <span className="text-2xl font-serif text-primary-foreground">{selectedElement}</span>
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-foreground pr-8">{selectedDetail.title}</h4>
                  <p className="text-sm text-muted-foreground">현재 수치: {selectedData.value}</p>
                </div>
              </div>

              {/* 특성 */}
              <div className="mb-4">
                <h5 className="text-xs text-muted-foreground mb-2 font-medium">주요 특성</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedDetail.traits.map((trait, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-full bg-background/60 text-foreground"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* 장점 */}
              <div className="mb-3">
                <h5 className="text-xs text-muted-foreground mb-1 font-medium">💪 강점</h5>
                <p className="text-sm text-foreground">{selectedDetail.strength}</p>
              </div>

              {/* 약점 */}
              <div className="mb-3">
                <h5 className="text-xs text-muted-foreground mb-1 font-medium">⚠️ 주의점</h5>
                <p className="text-sm text-foreground">{selectedDetail.weakness}</p>
              </div>

              {/* 상생상극 */}
              <div>
                <h5 className="text-xs text-muted-foreground mb-1 font-medium">🔄 관계</h5>
                <p className="text-sm text-foreground">{selectedDetail.compatibility}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OhangPentagon;
