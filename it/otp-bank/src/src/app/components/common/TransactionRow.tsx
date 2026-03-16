interface TransactionRowProps {
  icon: string;
  name: string;
  meta: string;
  amount: string;
  type?: 'expense' | 'income' | 'upcoming';
  showActions?: boolean;
  onPayNow?: () => void;
  onEdit?: () => void;
}

export function TransactionRow({
  icon,
  name,
  meta,
  amount,
  type = 'expense',
  showActions = false,
  onPayNow,
  onEdit,
}: TransactionRowProps) {
  const amountColor = {
    expense: '#888888',
    income: '#3A7D44',
    upcoming: '#C2FF02',
  }[type];

  return (
    <div className="border-b border-[#161616] pb-3 pt-3 first:pt-0">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-[34px] h-[34px] rounded-[10px] bg-[#181818] flex items-center justify-center flex-shrink-0">
          <span className="text-sm">{icon}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium text-[#C0C0C0]">{name}</div>
          <div className="text-[10px] text-[#444444] mt-0.5" style={{ fontFamily: "'Onest', sans-serif" }}>
            {meta}
          </div>
        </div>

        {/* Amount */}
        <div
          className="text-[13px] font-semibold"
          style={{ color: amountColor, fontFamily: "'Onest', sans-serif" }}
        >
          {amount}
        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex gap-2 mt-1.5">
          {onPayNow && (
            <button
              onClick={onPayNow}
              className="text-[11px] font-semibold text-[#C2FF02] py-1"
              style={{ fontFamily: "'Onest', sans-serif" }}
            >
              Оплатить сейчас
            </button>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-[11px] font-semibold text-[#555555] py-1"
              style={{ fontFamily: "'Onest', sans-serif" }}
            >
              Изменить
            </button>
          )}
        </div>
      )}
    </div>
  );
}
