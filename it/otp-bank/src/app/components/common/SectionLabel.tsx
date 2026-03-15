interface SectionLabelProps {
  children: string;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div
      className="text-[11px] font-semibold text-[#333333] uppercase tracking-[0.1em]"
      style={{ fontFamily: "'Onest', sans-serif" }}
    >
      {children}
    </div>
  );
}
