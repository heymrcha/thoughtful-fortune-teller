import { getRecommendations } from "@/lib/prototype-rules";

const EmotionalRecommendations = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 gap-3">
    {getRecommendations(count).map((item) => (
      <div key={item.id} className="bg-muted rounded-xl p-4 text-center">
        {item.id === "color" ? (
          <div className="w-8 h-8 rounded-full mx-auto mb-1 bg-sage" />
        ) : (
          <div className="text-2xl mb-1">{item.emoji}</div>
        )}
        <div className="text-xs text-muted-foreground">{item.label}</div>
        <div className="text-sm font-medium text-foreground mt-1">{item.value}</div>
      </div>
    ))}
  </div>
);

export default EmotionalRecommendations;