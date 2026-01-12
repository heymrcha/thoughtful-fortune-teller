import { motion } from "framer-motion";

interface OhangData {
  element: string;
  name: string;
  value: number;
  color: string;
}

interface OhangPentagonProps {
  data: OhangData[];
}

const OhangPentagon = ({ data }: OhangPentagonProps) => {
  const maxValue = Math.max(...data.map((d) => d.value));
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

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-sm text-muted-foreground mb-4">오행 균형 차트</h3>
      <div className="flex justify-center">
        <svg width="240" height="240" viewBox="0 0 240 240">
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
            fill="url(#pentagonGradient)"
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
          
          {/* 데이터 포인트 */}
          {dataPoints.map((point, i) => (
            <motion.circle
              key={`point-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.3 }}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={data[i].color}
              stroke="white"
              strokeWidth="2"
            />
          ))}
          
          {/* 라벨 */}
          {data.map((item, i) => {
            const labelPos = getLabelPoint(i);
            return (
              <g key={`label-${i}`}>
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-serif"
                  fill={item.color}
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
          <div key={item.element} className="flex items-center gap-1.5">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">
              {item.element} {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OhangPentagon;
