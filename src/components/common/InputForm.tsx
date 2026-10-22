import { useState, useId } from "react";
import { getBirthYears, getBirthDayCount } from "@/lib/prototype-rules";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface InputFormProps {
  title?: string;
  children: React.ReactNode;
}

export const InputForm = ({ title, children }: InputFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-card space-y-4"
    >
      {title && <h3 className="font-serif font-semibold text-foreground mb-4">{title}</h3>}
      {children}
    </motion.div>
  );
};

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
    </div>
  );
};

export interface BirthData {
  name: string;
  year: string;
  month: string;
  day: string;
  hour: string;
  calendarType: string;
  gender: string;
}

interface BirthInputProps {
  label?: string;
  // 한 화면에 입력 폼이 여러 개일 때 스크린리더가 구분할 수 있도록 접근성 이름에 붙인다
  ariaPrefix?: string;
  onComplete?: (data: BirthData) => void;
}

export const BirthInput = ({ label, ariaPrefix, onComplete }: BirthInputProps) => {
  const id = useId();
  const prefix = ariaPrefix || label || "내 정보";
  const [data, setData] = useState<BirthData>({ name: "", year: "", month: "", day: "", hour: "", calendarType: "solar", gender: "male" });
  const update = (field: keyof BirthData, value: string) => {
    const next = { ...data, [field]: value };
    if (Number(next.day) > getBirthDayCount(next.year, next.month, next.calendarType)) next.day = "";
    setData(next);
    onComplete?.(next);
  };
  const dayCount = getBirthDayCount(data.year, data.month, data.calendarType);
  return (
    <div className="space-y-4">
      {label && <h4 className="text-sm font-medium text-foreground">{label}</h4>}
      
      <FormField label="이름">
        <Input aria-label={`${prefix} 이름`} value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="이름을 입력하세요" className="bg-muted border-0" />
      </FormField>
      
      <div className="grid grid-cols-3 gap-2">
        <FormField label="년">
          <Select value={data.year} onValueChange={(value) => update("year", value)}>
            <SelectTrigger aria-label={`${prefix} 년도`} className="bg-muted border-0">
              <SelectValue placeholder="년도" />
            </SelectTrigger>
            <SelectContent>
              {getBirthYears().map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}년
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="월">
          <Select value={data.month} onValueChange={(value) => update("month", value)}>
            <SelectTrigger aria-label={`${prefix} 월`} className="bg-muted border-0">
              <SelectValue placeholder="월" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {month}월
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="일">
          <Select value={data.day} onValueChange={(value) => update("day", value)}>
            <SelectTrigger aria-label={`${prefix} 일`} className="bg-muted border-0">
              <SelectValue placeholder="일" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: dayCount }, (_, i) => i + 1).map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}일
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField label="태어난 시간">
        <Select value={data.hour} onValueChange={(value) => update("hour", value)}>
          <SelectTrigger aria-label={`${prefix} 태어난 시간`} className="bg-muted border-0">
            <SelectValue placeholder="시간 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unknown">모름</SelectItem>
            <SelectItem value="23-01">子時 (23:00-01:00)</SelectItem>
            <SelectItem value="01-03">丑時 (01:00-03:00)</SelectItem>
            <SelectItem value="03-05">寅時 (03:00-05:00)</SelectItem>
            <SelectItem value="05-07">卯時 (05:00-07:00)</SelectItem>
            <SelectItem value="07-09">辰時 (07:00-09:00)</SelectItem>
            <SelectItem value="09-11">巳時 (09:00-11:00)</SelectItem>
            <SelectItem value="11-13">午時 (11:00-13:00)</SelectItem>
            <SelectItem value="13-15">未時 (13:00-15:00)</SelectItem>
            <SelectItem value="15-17">申時 (15:00-17:00)</SelectItem>
            <SelectItem value="17-19">酉時 (17:00-19:00)</SelectItem>
            <SelectItem value="19-21">戌時 (19:00-21:00)</SelectItem>
            <SelectItem value="21-23">亥時 (21:00-23:00)</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="양력/음력">
        <RadioGroup value={data.calendarType} onValueChange={(value) => update("calendarType", value)} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="solar" id={`${id}-solar`} />
            <Label htmlFor={`${id}-solar`} className="text-foreground">양력</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lunar" id={`${id}-lunar`} />
            <Label htmlFor={`${id}-lunar`} className="text-foreground">음력</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lunar-leap" id={`${id}-lunar-leap`} />
            <Label htmlFor={`${id}-lunar-leap`} className="text-foreground">음력(윤달)</Label>
          </div>
        </RadioGroup>
      </FormField>

      <FormField label="성별">
        <RadioGroup value={data.gender} onValueChange={(value) => update("gender", value)} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id={`${id}-male`} />
            <Label htmlFor={`${id}-male`} className="text-foreground">남성</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id={`${id}-female`} />
            <Label htmlFor={`${id}-female`} className="text-foreground">여성</Label>
          </div>
        </RadioGroup>
      </FormField>
    </div>
  );
};

export default InputForm;
