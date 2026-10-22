import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SubPageHeader from "@/components/common/SubPageHeader";
import { BirthInput } from "@/components/common/InputForm";
import { Button } from "@/components/ui/button";
import { isBirthComplete } from "@/lib/prototype-rules";

interface BirthManagementProps {
  onBack: () => void;
}

const BirthManagement = ({ onBack }: BirthManagementProps) => {
  const [complete, setComplete] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <SubPageHeader title="생년월일시 관리" subtitle="나의 정보를 수정합니다" onBack={onBack} />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-card">
        <BirthInput onComplete={(data) => setComplete(isBirthComplete(data))} />
      </motion.div>
      
      <Button disabled={!complete} onClick={() => toast.info("입력을 확인했습니다. 프로토타입에서는 정보가 저장되지 않습니다.")} className="w-full h-14 rounded-xl">저장하기</Button>
    </motion.div>
  );
};

export default BirthManagement;
