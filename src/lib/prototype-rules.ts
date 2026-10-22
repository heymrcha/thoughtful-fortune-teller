export const getBirthYears = (year = new Date().getFullYear()) =>
  Array.from({ length: 100 }, (_, index) => year - index);

export const getBirthDayCount = (year: string, month: string, calendarType: string) => {
  if (calendarType !== "solar") return 30;
  if (!year || !month) return 31;
  return new Date(Number(year), Number(month), 0).getDate();
};

export const validatePhoto = (file: Pick<File, "type" | "size">): string | null => {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return "JPG, PNG 또는 WebP 사진을 선택해주세요.";
  }
  if (file.size === 0) return "빈 파일은 사용할 수 없습니다.";
  if (file.size > 10 * 1024 * 1024) return "10MB 이하의 사진을 선택해주세요.";
  return null;
};

export const recommendationItems = [
  { id: "book", emoji: "📚", label: "오늘의 책", value: "멈추면 비로소 보이는 것들" },
  { id: "movie", emoji: "🎬", label: "오늘의 영화", value: "어바웃 타임" },
  { id: "color", emoji: "", label: "행운의 색", value: "세이지 그린" },
  { id: "direction", emoji: "🧭", label: "행운의 방향", value: "동쪽" },
  { id: "music", emoji: "🎵", label: "오늘의 음악", value: "잔잔한 재즈" },
  { id: "drink", emoji: "🍵", label: "오늘의 음료", value: "캐모마일 차" },
  { id: "number", emoji: "🔢", label: "행운의 숫자", value: "3, 7, 12" },
  { id: "item", emoji: "💎", label: "행운의 아이템", value: "자수정" },
];

export const getRecommendations = (count = 8) => {
  const safeCount = Number.isFinite(count) ? Math.min(8, Math.max(4, Math.floor(count))) : 8;
  return recommendationItems.slice(0, safeCount);
};

type BirthFields = Partial<Record<"year" | "month" | "day" | "hour", string>>;

// 시간은 "모름"도 유효한 선택이므로 값이 비어 있는지만 확인한다
export const isBirthComplete = (data: BirthFields) =>
  Boolean(data.year && data.month && data.day && data.hour);

export const shuffle = <T,>(items: readonly T[], random: () => number = Math.random): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
