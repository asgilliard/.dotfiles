import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';

interface Payment {
  icon: string;
  name: string;
  type: string;
  amount: string;
  amountNum: number;
  hasWarning: boolean;
  onCard?: string;
  needed?: string;
}

const allPayments: Record<number, Payment[]> = {
  17: [
    { icon: '🏦', name: 'Кредит ОТП', type: 'Автосписание', amount: '4 200 ₽', amountNum: 4200, hasWarning: true, onCard: '2 100 ₽', needed: '2 100 ₽' },
    { icon: '📺', name: 'Netflix', type: 'Подписка', amount: '799 ₽', amountNum: 799, hasWarning: false },
  ],
  20: [
    { icon: '🏠', name: 'Коммунальные', type: 'Автоплатёж · прогноз', amount: '~3 500 ₽', amountNum: 3500, hasWarning: false },
  ],
  22: [
    { icon: '📱', name: 'Мобильная связь', type: 'Автосписание', amount: '600 ₽', amountNum: 600, hasWarning: false },
    { icon: '🎵', name: 'Spotify', type: 'Подписка', amount: '269 ₽', amountNum: 269, hasWarning: false },
  ],
  25: [
    { icon: '🏦', name: 'Рассрочка iPhone', type: 'Автосписание', amount: '5 000 ₽', amountNum: 5000, hasWarning: false },
    { icon: '💪', name: 'Фитнес', type: 'Подписка', amount: '3 400 ₽', amountNum: 3400, hasWarning: false },
  ],
};

const dayDotColor = (day: number): string | null => {
  const payments = allPayments[day];
  if (!payments) return null;
  const total = payments.reduce((s, p) => s + p.amountNum, 0);
  if (total > 3000) return '#E05252';
  if (total > 500) return '#F0B429';
  return '#555555';
};

const dayTotal = (day: number): number =>
  (allPayments[day] || []).reduce((s, p) => s + p.amountNum, 0);

const monthTotal = Object.values(allPayments).reduce(
  (s, arr) => s + arr.reduce((ss, p) => ss + p.amountNum, 0), 0
);

const dayNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export function Calendar() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(17);
  const today = 15;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const payments = allPayments[selectedDay] || [];
  const total = dayTotal(selectedDay);

  // Dec 2025: 1st is Monday (index 1)
  const getDayName = (day: number) => dayNames[(day % 7)];

  return (
    <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen pb-6">
      <StatusBar />

      <div className="h-11 px-6 flex items-center justify-between">
        <button className="text-[#555555]" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-[17px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>
          Календарь платежей
        </div>
        <div className="w-5" />
      </div>

      {/* Month strip — full scroll */}
      <div className="mt-4 px-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-0.5">
          {days.map((day) => {
            const dot = dayDotColor(day);
            const isSelected = day === selectedDay;
            const isToday = day === today;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className="flex-shrink-0 w-[46px] h-[58px] flex flex-col items-center justify-center gap-0.5 rounded-[10px] transition-colors"
                style={{ background: isSelected ? '#C8F135' : 'transparent' }}
              >
                <span
                  className="text-[10px] font-medium uppercase"
                  style={{
                    fontFamily: 'Manrope',
                    color: isSelected ? '#000' : '#333333',
                  }}
                >
                  {getDayName(day)}
                </span>
                <span
                  className="text-[15px] font-semibold"
                  style={{
                    fontFamily: 'Manrope',
                    color: isSelected ? '#000000' : isToday ? '#E8E8E8' : '#666666',
                  }}
                >
                  {day}
                </span>
                {dot && !isSelected ? (
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: dot }} />
                ) : (
                  <div className="w-1 h-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day summary */}
      <div className="px-6 mt-5">
        <div className="text-[17px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>
          {selectedDay} декабря, {getDayName(selectedDay).toLowerCase()}
        </div>
        {total > 0 ? (
          <div className="text-[13px] text-[#888888] mt-0.5" style={{ fontFamily: 'Manrope' }}>
            Итого: {total.toLocaleString()} ₽
          </div>
        ) : (
          <div className="text-[13px] text-[#444444] mt-0.5" style={{ fontFamily: 'Manrope' }}>
            Платежей нет
          </div>
        )}
      </div>

      {/* Payments list */}
      <div className="px-6 mt-3 space-y-3">
        {payments.length === 0 ? (
          <div className="bg-[#141414] rounded-[14px] p-6 text-center">
            <div className="text-2xl mb-2">✓</div>
            <div className="text-[13px] text-[#555555]" style={{ fontFamily: 'Manrope' }}>
              Свободный день, платежей нет
            </div>
          </div>
        ) : (
          payments.map((payment, index) => (
            <div key={index} className="bg-[#141414] rounded-[14px] p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#1C1C1C] rounded-[10px] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">{payment.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-[#C0C0C0]" style={{ fontFamily: 'Manrope' }}>{payment.name}</div>
                  <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.1em] mt-0.5" style={{ fontFamily: 'Manrope' }}>
                    {payment.type}
                  </div>
                </div>
                <div className="text-[15px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>{payment.amount}</div>
              </div>

              <div className="mt-3 flex gap-2">
                <button className="h-8 px-3.5 bg-[#C8F135] rounded-lg text-[11px] font-bold text-[#000000] active:scale-[0.97] transition-transform">
                  Оплатить сейчас
                </button>
                <button className="h-8 px-3.5 bg-transparent border border-[#2A2A2A] rounded-lg text-[11px] font-semibold text-[#666666] active:scale-[0.97] transition-transform">
                  Изменить
                </button>
              </div>

              {payment.hasWarning && (
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C1A] flex-shrink-0" />
                  <div className="text-[11px] font-medium text-[#FF5C1A]" style={{ fontFamily: 'Manrope' }}>
                    На карте {payment.onCard} — не хватает {payment.needed}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Month footer */}
      <div className="mx-6 mt-5 bg-[#141414] rounded-xl p-3.5 px-4">
        <div className="flex justify-between items-center">
          <div className="text-[13px] text-[#666666]" style={{ fontFamily: 'Manrope' }}>Всего в декабре</div>
          <div className="text-[13px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>{monthTotal.toLocaleString()} ₽</div>
        </div>
        <div className="mt-2 flex gap-4">
          {[
            { label: 'Кредиты', amount: 9200, color: '#E05252' },
            { label: 'Подписки', amount: 4468, color: '#F0B429' },
            { label: 'ЖКХ', amount: 3500, color: '#888888' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[11px] text-[#555555]" style={{ fontFamily: 'Manrope' }}>
                {item.label} {item.amount.toLocaleString()} ₽
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
