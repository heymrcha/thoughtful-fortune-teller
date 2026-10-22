import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, User, Trash2 } from "lucide-react";
import SubPageHeader from "@/components/common/SubPageHeader";
import { Button } from "@/components/ui/button";
import { relationProfiles } from "@/lib/sample-data";

interface RelationProfileProps {
  onBack: () => void;
}

const RelationProfile = ({ onBack }: RelationProfileProps) => {
  const [profiles] = useState(relationProfiles);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <SubPageHeader title="관계 프로필 관리" subtitle="가족, 친구 정보" onBack={onBack} />
      
      <div className="space-y-3">
        {profiles.map((profile, index) => (
          <motion.div key={profile.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-4 shadow-soft flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <User className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{profile.name}</h4>
              <p className="text-sm text-muted-foreground">{profile.relation} · {profile.birth}</p>
            </div>
            <Button disabled variant="ghost" size="icon" aria-label={`${profile.name} 삭제 (준비 중)`} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </Button>
          </motion.div>
        ))}
      </div>
      
      <Button disabled variant="outline" className="w-full h-14 rounded-xl gap-2">
        <Plus className="w-5 h-5" /> 새 프로필 추가
      </Button>
    </motion.div>
  );
};

export default RelationProfile;
