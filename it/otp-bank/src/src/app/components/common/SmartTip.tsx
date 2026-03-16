interface SmartTipProps {
  text: string;
  boldText?: string;
  show?: boolean;
}

export function SmartTip({ text, boldText, show = true }: SmartTipProps) {
  if (!show) return null;

  return (
    <div className="mx-6 mt-4 bg-[#141414] border border-[#1E2A14] rounded-[14px] p-3.5 px-4 flex gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-[#C2FF02] flex-shrink-0 mt-1.5" />
      <div className="text-[12px] text-[#666666] leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
        {text}
        {boldText && (
          <span className="font-semibold text-[#999999]"> {boldText}</span>
        )}
      </div>
    </div>
  );
}
