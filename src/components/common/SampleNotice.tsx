interface SampleNoticeProps {
  children?: string;
}

// 프로토타입은 해석 엔진이 연결되어 있지 않으므로 결과 화면마다 샘플임을 밝힌다
const SampleNotice = ({ children = "샘플 결과입니다. 입력하신 정보로 계산한 해석이 아닙니다." }: SampleNoticeProps) => (
  <p role="note" className="text-xs text-muted-foreground text-center">
    {children}
  </p>
);

export default SampleNotice;
