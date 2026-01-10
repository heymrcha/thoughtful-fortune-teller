import { motion } from "framer-motion";
import SubPageHeader from "@/components/common/SubPageHeader";
import { Switch } from "@/components/ui/switch";

interface NotificationSettingsProps {
  onBack: () => void;
}

const notifications = [
  { id: "daily", label: "오늘의 운세 알림", desc: "매일 아침 운세를 받아보세요", enabled: true },
  { id: "weekly", label: "주간 운세 알림", desc: "매주 월요일 주간 운세", enabled: true },
  { id: "event", label: "이벤트 알림", desc: "할인 및 특별 행사 안내", enabled: false },
  { id: "consult", label: "상담 알림", desc: "상담 예약 및 답변 알림", enabled: true },
];

const NotificationSettings = ({ onBack }: NotificationSettingsProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <SubPageHeader title="알림 설정" subtitle="푸시 알림 관리" onBack={onBack} />
      
      <div className="space-y-3 pb-8">
        {notifications.map((item, index) => (
          <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-4 shadow-soft flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{item.label}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
            <Switch defaultChecked={item.enabled} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationSettings;
