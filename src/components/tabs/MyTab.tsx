import { motion } from "framer-motion";
import { User, Users, CreditCard, Bell, Settings, ChevronRight, Calendar } from "lucide-react";
import { relationProfiles } from "@/lib/sample-data";

interface MyTabProps {
  onNavigate: (destination: string) => void;
}

const menuItems = [
  { id: "birth", title: "생년월일시 관리", desc: "나의 정보 수정", icon: Calendar },
  { id: "relations", title: "관계 프로필 관리", desc: "가족, 친구 정보", icon: Users },
  { id: "subscription", title: "구독 · 결제", desc: "구독 상태 확인", icon: CreditCard },
  { id: "notification", title: "알림 설정", desc: "푸시 알림 관리", icon: Bell },
  { id: "settings", title: "설정", desc: "앱 설정", icon: Settings },
];

const MyTab = ({ onNavigate }: MyTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4"
      >
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-premium flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-foreground">홍길동</h1>
              <p className="text-sm text-muted-foreground">1990년 5월 15일 오전 7시</p>
              <p className="text-sm text-muted-foreground">양력 · 남성</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-4 shadow-card text-center"
        >
          <div className="text-2xl font-bold text-secondary">12</div>
          <div className="text-xs text-muted-foreground mt-1">해석 기록</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl p-4 shadow-card text-center"
        >
          <div className="text-2xl font-bold text-secondary">{relationProfiles.length}</div>
          <div className="text-xs text-muted-foreground mt-1">등록된 관계</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-4 shadow-card text-center"
        >
          <div className="text-2xl font-bold text-secondary">30일</div>
          <div className="text-xs text-muted-foreground mt-1">연속 방문</div>
        </motion.div>
      </div>

      {/* Menu List */}
      <div className="space-y-2 pb-8">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft text-left group hover:shadow-card transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Icon className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MyTab;
