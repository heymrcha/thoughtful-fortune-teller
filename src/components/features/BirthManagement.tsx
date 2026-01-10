import { motion } from "framer-motion";
import SubPageHeader from "@/components/common/SubPageHeader";
import { BirthInput } from "@/components/common/InputForm";
import { Button } from "@/components/ui/button";

interface BirthManagementProps {
  onBack: () => void;
}

const BirthManagement = ({ onBack }: BirthManagementProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <SubPageHeader title="생년월일시 관리" subtitle="나의 정보를 수정합니다" onBack={onBack} />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-card">
        <BirthInput />
      </motion.div>
      
      <Button className="w-full h-14 rounded-xl">저장하기</Button>
    </motion.div>
  );
};

export default BirthManagement;
