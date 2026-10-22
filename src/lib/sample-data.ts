// 프로토타입 전체에서 공유하는 샘플 데이터. 화면마다 복사해 두면 값이 어긋나므로 한 곳에서만 관리한다.
export interface Counselor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  available: boolean;
  image: string;
}

export const counselors: Counselor[] = [
  {
    id: 1,
    name: "혜안 선생",
    specialty: "사주명리 · 궁합",
    rating: 4.9,
    reviews: 1234,
    available: true,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "명월 선생",
    specialty: "타로 · 신년운세",
    rating: 4.8,
    reviews: 892,
    available: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "청운 선생",
    specialty: "자녀분석 · 대운",
    rating: 4.9,
    reviews: 567,
    available: false,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

export const relationProfiles = [
  { id: 1, name: "김영희", relation: "배우자", birth: "1992.08.20" },
  { id: 2, name: "홍민수", relation: "자녀", birth: "2018.03.15" },
];

// 오늘하루 탭과 오늘의 운세 상세가 같은 점수를 보여주도록 공유한다
export const dailyScores = {
  total: 78,
  love: 71,
  wealth: 65,
  health: 82,
};
