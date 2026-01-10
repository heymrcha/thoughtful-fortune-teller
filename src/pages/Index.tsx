import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BottomNav from "@/components/layout/BottomNav";
import HomeTab from "@/components/tabs/HomeTab";
import TodayTab from "@/components/tabs/TodayTab";
import TarotTab from "@/components/tabs/TarotTab";
import ConsultTab from "@/components/tabs/ConsultTab";
import MyTab from "@/components/tabs/MyTab";
import SajuResult from "@/components/tabs/SajuResult";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showSajuResult, setShowSajuResult] = useState(false);

  const handleNavigate = (destination: string) => {
    if (destination === "saju") {
      setShowSajuResult(true);
    } else if (destination === "today") {
      setActiveTab("today");
    }
  };

  const renderTab = () => {
    if (showSajuResult) {
      return <SajuResult onBack={() => setShowSajuResult(false)} />;
    }

    switch (activeTab) {
      case "home":
        return <HomeTab onNavigate={handleNavigate} />;
      case "today":
        return <TodayTab />;
      case "tarot":
        return <TarotTab />;
      case "consult":
        return <ConsultTab />;
      case "my":
        return <MyTab />;
      default:
        return <HomeTab onNavigate={handleNavigate} />;
    }
  };

  const handleTabChange = (tab: string) => {
    setShowSajuResult(false);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 pb-24">
        <AnimatePresence mode="wait">
          {renderTab()}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
