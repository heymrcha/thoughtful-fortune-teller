import { motion } from "framer-motion";
import { MessageCircle, Phone, Video, Star } from "lucide-react";
import { toast } from "sonner";
import { counselors, type Counselor } from "@/lib/sample-data";

interface ConsultTabProps {
  onNavigate: (destination: string) => void;
  onCounselorSelect: (counselor: Counselor) => void;
}

const ConsultTab = ({ onNavigate, onCounselorSelect }: ConsultTabProps) => {
  const handleConsultTypeClick = (type: string) => {
    toast.info(`${type} 상담을 이용하시려면 상담 선생님을 먼저 선택해 주세요.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-4"
      >
        <h1 className="text-2xl font-serif font-bold text-foreground mb-2">전문 상담</h1>
        <p className="text-muted-foreground">깊이 있는 해석을 원하신다면</p>
      </motion.div>

      {/* Consultation Types */}
      <div className="grid grid-cols-3 gap-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => handleConsultTypeClick("채팅")}
          className="bg-card rounded-2xl p-4 shadow-card text-center hover:shadow-elevated transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-muted mx-auto mb-2 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-secondary" />
          </div>
          <span className="text-sm font-medium text-foreground">채팅상담</span>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => handleConsultTypeClick("전화")}
          className="bg-card rounded-2xl p-4 shadow-card text-center hover:shadow-elevated transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-muted mx-auto mb-2 flex items-center justify-center">
            <Phone className="w-5 h-5 text-secondary" />
          </div>
          <span className="text-sm font-medium text-foreground">전화상담</span>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => handleConsultTypeClick("영상")}
          className="bg-card rounded-2xl p-4 shadow-card text-center hover:shadow-elevated transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-muted mx-auto mb-2 flex items-center justify-center">
            <Video className="w-5 h-5 text-secondary" />
          </div>
          <span className="text-sm font-medium text-foreground">영상상담</span>
        </motion.button>
      </div>

      {/* Counselor List */}
      <div>
        <h2 className="text-lg font-serif font-semibold text-foreground mb-4">상담 선생님</h2>
        <div className="space-y-3 pb-8">
          {counselors.map((counselor, index) => (
            <motion.button
              key={counselor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCounselorSelect(counselor)}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card text-left hover:shadow-elevated transition-shadow"
            >
              <img
                src={counselor.image}
                alt={counselor.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground">{counselor.name}</h3>
                  {counselor.available ? (
                    <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full">
                      상담가능
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full">
                      상담중
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{counselor.specialty}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-secondary fill-secondary" />
                  <span className="font-medium text-foreground">{counselor.rating}</span>
                  <span className="text-muted-foreground">({counselor.reviews})</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ConsultTab;
