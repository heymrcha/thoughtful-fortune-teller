import { motion } from "framer-motion";
import { Moon, Sun, Globe, HelpCircle, FileText, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubPageHeader from "@/components/common/SubPageHeader";

interface SettingsProps {
  onBack: () => void;
}

const settingsItems = [
  { icon: Moon, label: "다크 모드", desc: "어두운 테마 사용" },
  { icon: Globe, label: "언어 설정", desc: "한국어" },
  { icon: HelpCircle, label: "고객센터", desc: "문의 및 도움말" },
  { icon: FileText, label: "이용약관", desc: "서비스 이용약관" },
  { icon: FileText, label: "개인정보처리방침", desc: "개인정보 보호" },
];

const Settings = ({ onBack }: SettingsProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <SubPageHeader title="설정" subtitle="앱 설정" onBack={onBack} />
      
      <div className="space-y-2">
        {settingsItems.map((item, index) => (
          <Button disabled variant="ghost" key={item.label}
            className="w-full h-auto whitespace-normal bg-card rounded-xl p-4 shadow-soft flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <item.icon className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{item.label}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Button>
        ))}
      </div>
      
      <Button disabled variant="ghost"
        className="w-full h-auto bg-destructive/10 rounded-xl p-4 flex items-center gap-4 text-left">
        <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
          <LogOut className="w-5 h-5 text-destructive" />
        </div>
        <span className="font-medium text-destructive">로그아웃</span>
      </Button>
      
      <p className="text-center text-xs text-muted-foreground pb-8">버전 1.0.0</p>
    </motion.div>
  );
};

export default Settings;
