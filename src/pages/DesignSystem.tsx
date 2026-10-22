import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

const DesignSystem = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(label);
      toast.success(`${label} 복사됨`);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopiedColor(null), 2000);
    } catch {
      toast.error("복사하지 못했습니다. 텍스트를 직접 선택해 복사해주세요.");
    }
  };

  const semanticColors = [
    { name: "Background", var: "--background", value: "40 30% 97%", class: "bg-background" },
    { name: "Foreground", var: "--foreground", value: "230 25% 15%", class: "bg-foreground" },
    { name: "Card", var: "--card", value: "40 25% 99%", class: "bg-card" },
    { name: "Primary", var: "--primary", value: "230 45% 22%", class: "bg-primary" },
    { name: "Primary Foreground", var: "--primary-foreground", value: "40 30% 97%", class: "bg-primary-foreground" },
    { name: "Secondary", var: "--secondary", value: "38 35% 55%", class: "bg-secondary" },
    { name: "Muted", var: "--muted", value: "40 20% 92%", class: "bg-muted" },
    { name: "Muted Foreground", var: "--muted-foreground", value: "230 15% 45%", class: "bg-muted-foreground" },
    { name: "Accent", var: "--accent", value: "150 20% 45%", class: "bg-accent" },
    { name: "Destructive", var: "--destructive", value: "0 65% 50%", class: "bg-destructive" },
    { name: "Border", var: "--border", value: "40 15% 88%", class: "bg-border" },
  ];

  const extendedColors = [
    { name: "Brass", var: "--brass", value: "38 50% 50%", class: "bg-brass" },
    { name: "Brass Light", var: "--brass-light", value: "40 45% 75%", class: "bg-brass-light" },
    { name: "Brass Glow", var: "--brass-glow", value: "40 60% 60%", class: "bg-brass-glow" },
    { name: "Indigo Deep", var: "--indigo-deep", value: "230 50% 18%", class: "bg-indigo-deep" },
    { name: "Indigo Light", var: "--indigo-light", value: "230 35% 55%", class: "bg-indigo-light" },
    { name: "Cream", var: "--cream", value: "40 30% 95%", class: "bg-cream" },
    { name: "Cream Dark", var: "--cream-dark", value: "40 20% 88%", class: "bg-cream-dark" },
    { name: "Sage", var: "--sage", value: "150 25% 40%", class: "bg-sage" },
    { name: "Sage Light", var: "--sage-light", value: "150 20% 75%", class: "bg-sage-light" },
    { name: "Ink", var: "--ink", value: "230 25% 10%", class: "bg-ink" },
    { name: "Ink Light", var: "--ink-light", value: "230 15% 35%", class: "bg-ink-light" },
  ];

  const gradients = [
    { name: "Premium", var: "--gradient-premium", class: "bg-gradient-premium" },
    { name: "Brass", var: "--gradient-brass", class: "bg-gradient-brass" },
    { name: "Cream", var: "--gradient-cream", class: "bg-gradient-cream" },
    { name: "Card", var: "--gradient-card", class: "bg-gradient-card" },
  ];

  const shadows = [
    { name: "Soft", var: "--shadow-soft", class: "shadow-soft" },
    { name: "Card", var: "--shadow-card", class: "shadow-card" },
    { name: "Elevated", var: "--shadow-elevated", class: "shadow-elevated" },
    { name: "Brass", var: "--shadow-brass", class: "shadow-brass" },
  ];

  const typography = [
    { name: "Display Large", class: "text-4xl font-serif font-bold", sample: "사주명리 분석" },
    { name: "Display Medium", class: "text-3xl font-serif font-bold", sample: "오늘의 운세" },
    { name: "Heading 1", class: "text-2xl font-serif font-semibold", sample: "제목 스타일" },
    { name: "Heading 2", class: "text-xl font-semibold", sample: "부제목 스타일" },
    { name: "Heading 3", class: "text-lg font-medium", sample: "섹션 제목" },
    { name: "Body Large", class: "text-base", sample: "본문 텍스트입니다. 기본적인 내용을 표시합니다." },
    { name: "Body", class: "text-sm", sample: "작은 본문 텍스트입니다." },
    { name: "Caption", class: "text-xs text-muted-foreground", sample: "캡션 및 보조 텍스트" },
  ];

  const spacing = [
    { name: "xs", value: "0.25rem (4px)", class: "w-1 h-4" },
    { name: "sm", value: "0.5rem (8px)", class: "w-2 h-4" },
    { name: "md", value: "1rem (16px)", class: "w-4 h-4" },
    { name: "lg", value: "1.5rem (24px)", class: "w-6 h-4" },
    { name: "xl", value: "2rem (32px)", class: "w-8 h-4" },
    { name: "2xl", value: "3rem (48px)", class: "w-12 h-4" },
  ];

  const borderRadius = [
    { name: "sm", value: "calc(var(--radius) - 4px)", class: "rounded-sm w-16 h-16" },
    { name: "md", value: "calc(var(--radius) - 2px)", class: "rounded-md w-16 h-16" },
    { name: "lg", value: "var(--radius) = 1rem", class: "rounded-lg w-16 h-16" },
    { name: "full", value: "9999px", class: "rounded-full w-16 h-16" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="홈으로 돌아가기" onClick={() => window.location.assign("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Design System</h1>
            <p className="text-sm text-muted-foreground">더포춘 앱 디자인 가이드</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Color Palette - Semantic */}
        <section>
          <h2 className="text-xl font-serif font-semibold mb-2">Semantic Colors</h2>
          <p className="text-sm text-muted-foreground mb-6">기본 시맨틱 컬러 토큰 (HSL 형식)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {semanticColors.map((color) => (
              <div
                key={color.name}
                className="group cursor-pointer"
                onClick={() => copyToClipboard(`hsl(${color.value})`, color.name)}
              >
                <div className={`${color.class} h-20 rounded-lg border border-border mb-2 flex items-center justify-center`}>
                  {copiedColor === color.name ? (
                    <Check className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <Copy className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                  )}
                </div>
                <p className="text-sm font-medium">{color.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{color.var}</p>
                <p className="text-xs text-muted-foreground font-mono">{color.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Color Palette - Extended */}
        <section>
          <h2 className="text-xl font-serif font-semibold mb-2">Extended Colors</h2>
          <p className="text-sm text-muted-foreground mb-6">확장 컬러 팔레트</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {extendedColors.map((color) => (
              <div
                key={color.name}
                className="group cursor-pointer"
                onClick={() => copyToClipboard(`hsl(${color.value})`, color.name)}
              >
                <div className={`${color.class} h-20 rounded-lg border border-border mb-2 flex items-center justify-center`}>
                  {copiedColor === color.name ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                  )}
                </div>
                <p className="text-sm font-medium">{color.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{color.var}</p>
                <p className="text-xs text-muted-foreground font-mono">{color.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gradients */}
        <section>
          <h2 className="text-xl font-serif font-semibold mb-2">Gradients</h2>
          <p className="text-sm text-muted-foreground mb-6">그라디언트 스타일</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gradients.map((gradient) => (
              <div key={gradient.name}>
                <div className={`${gradient.class} h-24 rounded-lg border border-border mb-2`} />
                <p className="text-sm font-medium">{gradient.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{gradient.var}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows */}
        <section>
          <h2 className="text-xl font-serif font-semibold mb-2">Shadows</h2>
          <p className="text-sm text-muted-foreground mb-6">그림자 스타일</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {shadows.map((shadow) => (
              <div key={shadow.name}>
                <div className={`${shadow.class} bg-card h-24 rounded-lg mb-2`} />
                <p className="text-sm font-medium">{shadow.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{shadow.var}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-xl font-serif font-semibold mb-2">Typography</h2>
          <p className="text-sm text-muted-foreground mb-6">
            폰트: Noto Serif KR (제목), Pretendard (본문)
          </p>
          <div className="space-y-4">
            {typography.map((type) => (
              <div key={type.name} className="flex flex-col md:flex-row md:items-baseline gap-4 py-3 border-b border-border">
                <span className="w-32 text-sm text-muted-foreground">{type.name}</span>
                <span className={type.class}>{type.sample}</span>
                <span className="text-xs text-muted-foreground font-mono break-words md:ml-auto">{type.class}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-xl font-serif font-semibold mb-2">Spacing</h2>
          <p className="text-sm text-muted-foreground mb-6">간격 시스템</p>
          <div className="space-y-3">
            {spacing.map((space) => (
              <div key={space.name} className="flex items-center gap-4">
                <span className="w-12 text-sm font-medium">{space.name}</span>
                <div className={`${space.class} bg-primary rounded`} />
                <span className="text-sm text-muted-foreground">{space.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <h2 className="text-xl font-serif font-semibold mb-2">Border Radius</h2>
          <p className="text-sm text-muted-foreground mb-6">모서리 둥글기</p>
          <div className="flex flex-wrap gap-6">
            {borderRadius.map((radius) => (
              <div key={radius.name} className="text-center">
                <div className={`${radius.class} bg-primary mb-2`} />
                <p className="text-sm font-medium">{radius.name}</p>
                <p className="text-xs text-muted-foreground">{radius.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Components */}
        <section>
          <h2 className="text-xl font-serif font-semibold mb-2">Components</h2>
          <p className="text-sm text-muted-foreground mb-6">UI 컴포넌트 예시</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Buttons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inputs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="기본 입력 필드" />
                <Input placeholder="비활성화됨" disabled />
              </CardContent>
            </Card>

            {/* Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm">Switch</span>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <span className="text-sm">Slider</span>
                  <Slider defaultValue={[50]} max={100} />
                </div>
                <div className="space-y-2">
                  <span className="text-sm">Progress</span>
                  <Progress value={66} />
                </div>
              </CardContent>
            </Card>

            {/* Cards */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="shadow-soft">
                    <CardContent className="p-4">
                      <p className="font-medium">Shadow Soft</p>
                      <p className="text-sm text-muted-foreground">기본 카드 그림자</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-card">
                    <CardContent className="p-4">
                      <p className="font-medium">Shadow Card</p>
                      <p className="text-sm text-muted-foreground">카드용 그림자</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-elevated">
                    <CardContent className="p-4">
                      <p className="font-medium">Shadow Elevated</p>
                      <p className="text-sm text-muted-foreground">강조된 그림자</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Design Tokens Export */}
        <section>
          <h2 className="text-xl font-serif font-semibold mb-2">Design Tokens</h2>
          <p className="text-sm text-muted-foreground mb-6">Figma 또는 다른 도구에서 사용할 수 있는 토큰</p>
          <Card>
            <CardContent className="p-4">
              <pre className="text-xs overflow-x-auto bg-muted p-4 rounded-lg">
{`{
  "colors": {
    "primary": "hsl(230, 45%, 22%)",
    "secondary": "hsl(38, 35%, 55%)",
    "accent": "hsl(150, 20%, 45%)",
    "background": "hsl(40, 30%, 97%)",
    "foreground": "hsl(230, 25%, 15%)",
    "muted": "hsl(40, 20%, 92%)",
    "brass": "hsl(38, 50%, 50%)",
    "sage": "hsl(150, 25%, 40%)"
  },
  "typography": {
    "fontFamily": {
      "serif": "Noto Serif KR, Georgia, serif",
      "sans": "Pretendard, system-ui, sans-serif"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "borderRadius": {
    "default": "16px"
  }
}`}
              </pre>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={() => {
                  void copyToClipboard(JSON.stringify({
                    colors: {
                      primary: "hsl(230, 45%, 22%)",
                      secondary: "hsl(38, 35%, 55%)",
                      accent: "hsl(150, 20%, 45%)",
                      background: "hsl(40, 30%, 97%)",
                      foreground: "hsl(230, 25%, 15%)",
                      muted: "hsl(40, 20%, 92%)",
                      brass: "hsl(38, 50%, 50%)",
                      sage: "hsl(150, 25%, 40%)"
                    },
                    typography: {
                      fontFamily: {
                        serif: "Noto Serif KR, Georgia, serif",
                        sans: "Pretendard, system-ui, sans-serif"
                      }
                    },
                    spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px" },
                    borderRadius: { default: "16px" }
                  }, null, 2), "JSON 토큰");
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                JSON 복사
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default DesignSystem;
