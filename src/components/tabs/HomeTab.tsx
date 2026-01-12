import { motion } from "framer-motion";
import {
  Compass,
  Users,
  Baby,
  Heart,
  TrendingUp,
  Calendar,
  BookOpen,
  FileText,
  Star,
  ScanFace,
} from "lucide-react";
import CoreServiceCard from "@/components/home/CoreServiceCard";
import ServiceCard from "@/components/home/ServiceCard";
import SectionHeader from "@/components/home/SectionHeader";

interface HomeTabProps {
  onNavigate: (destination: string) => void;
}

const HomeTab = ({ onNavigate }: HomeTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-4"
      >
        <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
          더포춘
        </h1>
        <p className="text-muted-foreground">
          당신의 삶에 깊이 있는 통찰을 더합니다
        </p>
      </motion.div>

      {/* Core 3 Services */}
      <section>
        <SectionHeader title="핵심 해석" subtitle="나를 이해하는 첫걸음" />
        <div className="grid gap-4">
          <CoreServiceCard
            title="사주명리"
            subtitle="나의 본질과 삶의 흐름"
            icon={Compass}
            gradient="bg-gradient-premium text-primary-foreground"
            delay={0.1}
            onClick={() => onNavigate("saju")}
          />
          <div className="grid grid-cols-2 gap-4">
            <CoreServiceCard
              title="오늘의 운세"
              subtitle="하루의 방향"
              icon={Star}
              gradient="bg-primary text-primary-foreground"
              delay={0.2}
              onClick={() => onNavigate("daily-detail")}
            />
            <CoreServiceCard
              title="자녀분석"
              subtitle="소중한 아이 이해"
              icon={Baby}
              gradient="bg-secondary text-secondary-foreground"
              delay={0.3}
              onClick={() => onNavigate("child")}
            />
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section>
        <SectionHeader title="AI 서비스" subtitle="인공지능 기반 분석" />
        <div className="space-y-3">
          <ServiceCard
            title="AI 관상"
            description="얼굴 사진으로 보는 관상 분석"
            icon={ScanFace}
            delay={0.1}
            onClick={() => onNavigate("face-reading")}
          />
        </div>
      </section>

      {/* Situational */}
      <section>
        <SectionHeader title="상황별 해석" subtitle="관계와 흐름을 살피다" />
        <div className="space-y-3">
          <ServiceCard
            title="궁합"
            description="두 사람의 인연과 관계 해석"
            icon={Heart}
            delay={0.1}
            onClick={() => onNavigate("compatibility")}
          />
          <ServiceCard
            title="대운분석"
            description="10년 단위 삶의 큰 흐름"
            icon={TrendingUp}
            delay={0.15}
            onClick={() => onNavigate("daeun")}
          />
        </div>
      </section>

      {/* Seasonal */}
      <section>
        <SectionHeader title="시기별 운세" subtitle="올해의 흐름을 읽다" />
        <div className="space-y-3">
          <ServiceCard
            title="신년운세"
            description="올해의 전체 운세와 월별 해석"
            icon={Calendar}
            delay={0.1}
            onClick={() => onNavigate("yearly")}
          />
          <ServiceCard
            title="토정비결"
            description="전통 방식의 한 해 운세"
            icon={BookOpen}
            delay={0.15}
            onClick={() => onNavigate("tojeong")}
          />
        </div>
      </section>

      {/* Classic / Deep */}
      <section>
        <SectionHeader title="고전·심화" subtitle="더 깊은 통찰" />
        <div className="space-y-3">
          <ServiceCard
            title="석중결"
            description="상황별 심화 운세 해석"
            icon={FileText}
            delay={0.1}
            onClick={() => onNavigate("seokjung")}
          />
        </div>
      </section>

      {/* Celebrity Match - Fun */}
      <section className="pb-8">
        <SectionHeader title="재미" />
        <ServiceCard
          title="연예인 궁합"
          description="좋아하는 연예인과의 궁합은?"
          icon={Users}
          delay={0.1}
          onClick={() => onNavigate("celeb")}
        />
      </section>
    </motion.div>
  );
};

export default HomeTab;
