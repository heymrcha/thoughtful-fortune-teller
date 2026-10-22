import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import BottomNav from "@/components/layout/BottomNav";
import HomeTab from "@/components/tabs/HomeTab";
import TodayTab from "@/components/tabs/TodayTab";
import TarotTab from "@/components/tabs/TarotTab";
import ConsultTab from "@/components/tabs/ConsultTab";
import MyTab from "@/components/tabs/MyTab";
import SajuResult from "@/components/tabs/SajuResult";
import type { Counselor } from "@/lib/sample-data";

// Home Features
import ChildAnalysis from "@/components/features/ChildAnalysis";
import Compatibility from "@/components/features/Compatibility";
import DaeunAnalysis from "@/components/features/DaeunAnalysis";
import YearlyFortune from "@/components/features/YearlyFortune";
import Tojeong from "@/components/features/Tojeong";
import Harak from "@/components/features/Harak";
import Seokjung from "@/components/features/Seokjung";
import DateSelection from "@/components/features/DateSelection";
import CelebrityMatch from "@/components/features/CelebrityMatch";
import FaceReading from "@/components/features/FaceReading";

// Today Features
import DailyFortuneDetail from "@/components/features/DailyFortuneDetail";

// Tarot Features
import TarotReading from "@/components/features/TarotReading";
import NameCompatibility from "@/components/features/NameCompatibility";
import PetNaming from "@/components/features/PetNaming";

// Consult Features
import CounselorDetail from "@/components/features/CounselorDetail";

// My Features
import BirthManagement from "@/components/features/BirthManagement";
import RelationProfile from "@/components/features/RelationProfile";
import Subscription from "@/components/features/Subscription";
import NotificationSettings from "@/components/features/NotificationSettings";
import Settings from "@/components/features/Settings";

type SubPage = 
  | null 
  | "saju" 
  | "child" 
  | "compatibility" 
  | "daeun" 
  | "yearly" 
  | "tojeong" 
  | "harak" 
  | "seokjung" 
  | "datesel" 
  | "celeb"
  | "face-reading"
  | "daily-detail"
  | "tarot-today"
  | "tarot-love"
  | "tarot-health"
  | "tarot-study"
  | "tarot-iking"
  | "name-match"
  | "pet-name"
  | "counselor"
  | "birth"
  | "relations"
  | "subscription"
  | "notification"
  | "settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [subPage, setSubPage] = useState<SubPage>(null);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab, subPage]);

  const handleNavigate = (destination: string) => {
    setSubPage(destination as SubPage);
  };

  const handleBack = () => {
    setSubPage(null);
    setSelectedCounselor(null);
  };

  const handleConsult = () => handleTabChange("consult");

  const handleCounselorSelect = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setSubPage("counselor");
  };

  const renderContent = () => {
    // Sub Pages
    switch (subPage) {
      case "saju":
        return <SajuResult onBack={handleBack} />;
      case "child":
        return <ChildAnalysis onBack={handleBack} onConsult={handleConsult} />;
      case "compatibility":
        return <Compatibility onBack={handleBack} onConsult={handleConsult} />;
      case "daeun":
        return <DaeunAnalysis onBack={handleBack} onConsult={handleConsult} />;
      case "yearly":
        return <YearlyFortune onBack={handleBack} />;
      case "tojeong":
        return <Tojeong onBack={handleBack} />;
      case "harak":
        return <Harak onBack={handleBack} onConsult={handleConsult} />;
      case "seokjung":
        return <Seokjung onBack={handleBack} />;
      case "datesel":
        return <DateSelection onBack={handleBack} />;
      case "celeb":
        return <CelebrityMatch onBack={handleBack} />;
      case "face-reading":
        return <FaceReading onBack={handleBack} />;
      case "daily-detail":
        return <DailyFortuneDetail onBack={handleBack} />;
      case "tarot-today":
        return <TarotReading type="today" title="오늘의 타로" onBack={handleBack} />;
      case "tarot-love":
        return <TarotReading type="love" title="연애운 타로" onBack={handleBack} />;
      case "tarot-health":
        return <TarotReading type="health" title="건강운 타로" onBack={handleBack} />;
      case "tarot-study":
        return <TarotReading type="study" title="학업운 타로" onBack={handleBack} />;
      case "tarot-iking":
        return <TarotReading type="iking" title="주역 타로" onBack={handleBack} />;
      case "name-match":
        return <NameCompatibility onBack={handleBack} />;
      case "pet-name":
        return <PetNaming onBack={handleBack} />;
      case "counselor":
        return selectedCounselor ? (
          <CounselorDetail counselor={selectedCounselor} onBack={handleBack} />
        ) : null;
      case "birth":
        return <BirthManagement onBack={handleBack} />;
      case "relations":
        return <RelationProfile onBack={handleBack} />;
      case "subscription":
        return <Subscription onBack={handleBack} />;
      case "notification":
        return <NotificationSettings onBack={handleBack} />;
      case "settings":
        return <Settings onBack={handleBack} />;
    }

    // Main Tabs
    switch (activeTab) {
      case "home":
        return <HomeTab onNavigate={handleNavigate} />;
      case "today":
        return <TodayTab onNavigate={handleNavigate} />;
      case "tarot":
        return <TarotTab onNavigate={handleNavigate} />;
      case "consult":
        return <ConsultTab onNavigate={handleNavigate} onCounselorSelect={handleCounselorSelect} />;
      case "my":
        return <MyTab onNavigate={handleNavigate} />;
      default:
        return <HomeTab onNavigate={handleNavigate} />;
    }
  };

  const handleTabChange = (tab: string) => {
    setSubPage(null);
    setSelectedCounselor(null);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-lg mx-auto px-4 pb-24">
        <AnimatePresence mode="wait">
          <div key={`${activeTab}:${subPage ?? "main"}`}>{renderContent()}</div>
        </AnimatePresence>
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
