import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';

const F = { fontFamily: "'Onest', sans-serif" };

interface Payment {
  icon: string; name: string; type: string;
  amount: string; amountNum: number;
  hasWarning: boolean; onCard?: string; needed?: string;
}

const allPayments: Record<number, Payment[]> = {
  17: [
    { icon: '🏦', name: 'Кредит ОТП', type: 'Автосписание', amount: '4 200 ₽', amountNum: 4200, hasWarning: true, onCard: '2 100 ₽', needed: '2 100 ₽' },
    { icon: '📺', name: 'Netflix', type: 'Подписка', amount: '799 ₽', amountNum: 799, hasWarning: false },
  ],
  20: [{ icon: '🏠', name: 'Коммунальные', type: 'Автоплатёж · прогноз', amount: '~3 500 ₽', amountNum: 3500, hasWarning: false }],
  22: [
    { icon: '📱', name: 'Мобильная связь', type: 'Автосписание', amount: '600 ₽', amountNum: 600, hasWarning: false },
    { icon: '🎵', name: 'Spotify', type: 'Подписка', amount: '269 ₽', amountNum: 269, hasWarning: false },
  ],
  25: [
    { icon: '🏦', name: 'Рассрочка iPhone', type: 'Автосписание', amount: '5 000 ₽', amountNum: 5000, hasWarning: false },
    { icon: '💪', name: 'Фитнес', type: 'Подписка', amount: '3 400 ₽', amountNum: 3400, hasWarning: false },
  ],
  28: [{ icon: '💰', name: 'Зарплата', type: 'Поступление', amount: '85 000 ₽', amountNum: 85000, hasWarning: false }],
};

const dotColor = (day: number) => {
  const p = allPayments[day];
  if (!p) return null;
  const total = p.reduce((s, x) => s + x.amountNum, 0);
  if (total >= 85000) return '#3A7D44';
  if (total > 3000) return '#E05252';
  if (total > 500) return '#F0B429';
  return '#555';
};

const dayNames = ['вс','пн','вт','ср','чт','пт','сб'];
const monthTotal = Object.values(allPayments)
  .flat().filter(p => p.amountNum < 85000)
  .reduce((s, p) => s + p.amountNum, 0);

// December 2025 starts on Monday (index 1)
const DEC_START_DOW = 1;
const DAYS_IN_DEC = 31;

export function Calendar() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(17);
  const [expanded, setExpanded] = useState(false);
  const today = 15;

  const payments = allPayments[selectedDay] || [];
  const total = payments.reduce((s, p) => s + p.amountNum, 0);

  // Build grid for full month view
  const gridCells: (number | null)[] = [];
  for (let i = 0; i < DEC_START_DOW; i++) gridCells.push(null);
  for (let d = 1; d <= DAYS_IN_DEC; d++) gridCells.push(d);
  while (gridCells.length % 7 !== 0) gridCells.push(null);

  return (
    <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen pb-6">
      <StatusBar />

      <div className="h-11 px-6 flex items-center justify-between">
        <button className="text-[#555555]" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-[17px] font-bold text-[#F5F5F5]" style={F}>Календарь платежей</div>
        <button onClick={() => setExpanded(!expanded)} className="text-[#555555]">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Month header */}
      <div className="px-6 py-2 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[#F5F5F5]" style={F}>Декабрь 2025</span>
        <span className="text-[11px] text-[#555]" style={F}>{expanded ? 'Свернуть' : 'Весь месяц'}</span>
      </div>

      {/* ── COLLAPSED: horizontal day strip ── */}
      {!expanded && (
        <div className="px-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-0.5">
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
              const dot = dotColor(day);
              const isSelected = day === selectedDay;
              const isToday = day === today;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className="flex-shrink-0 w-[44px] h-[58px] flex flex-col items-center justify-center gap-0.5 rounded-[10px] transition-colors"
                  style={{ background: isSelected ? '#C2FF02' : 'transparent' }}
                >
                  <span className="text-[10px] font-medium" style={{ color: isSelected ? '#000' : '#333', ...F }}>
                    {dayNames[(DEC_START_DOW + day - 1) % 7]}
                  </span>
                  <span className="text-[15px] font-bold" style={{ color: isSelected ? '#000' : isToday ? '#F5F5F5' : '#666', ...F }}>
                    {day}
                  </span>
                  {dot && !isSelected
                    ? <div className="w-1 h-1 rounded-full" style={{ background: dot }} />
                    : <div className="w-1 h-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── EXPANDED: full month grid ── */}
      {expanded && (
        <div className="px-4 mt-1">
          {/* Day of week headers */}
          <div className="grid grid-cols-7 mb-1">
            {['пн','вт','ср','чт','пт','сб','вс'].map(d => (
              <div key={d} className="text-center py-1">
                <span className="text-[10px] font-medium text-[#444]" style={F}>{d}</span>
              </div>
            ))}
          </div>
          {/* Grid */}
          <div className="grid grid-cols-7 gap-1">
            {gridCells.map((day, i) => {
              if (!day) return <div key={i} />;
              const dot = dotColor(day);
              const isSelected = day === selectedDay;
              const isToday = day === today;
              return (
                <button
                  key={i}
                  onClick={() => { setSelectedDay(day); setExpanded(false); }}
                  className="aspect-square flex flex-col items-center justify-center rounded-xl relative transition-colors"
                  style={{ background: isSelected ? '#C2FF02' : isToday ? '#1C1C1C' : 'transparent' }}
                >
                  <span className="text-[13px] font-semibold" style={{ color: isSelected ? '#000' : isToday ? '#F5F5F5' : '#888', ...F }}>
                    {day}
                  </span>
                  {dot && (
                    <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: isSelected ? '#000' : dot }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected day */}
      <div className="px-6 mt-4">
        <div className="text-[17px] font-bold text-[#F5F5F5]" style={F}>
          {selectedDay} декабря, {dayNames[(DEC_START_DOW + selectedDay - 1) % 7]}
        </div>
        {total > 0
          ? <div className="text-[13px] text-[#888888] mt-0.5" style={F}>Итого: {total.toLocaleString()} ₽</div>
          : <div className="text-[13px] text-[#444444] mt-0.5" style={F}>Платежей нет</div>
        }
      </div>

      {/* Payment cards */}
      <div className="px-6 mt-3 space-y-3">
        {payments.length === 0 ? (
          <div className="bg-[#141414] rounded-[14px] p-6 text-center">
            <div className="text-2xl mb-2">✓</div>
            <div className="text-[13px] text-[#555555]" style={F}>Свободный день</div>
          </div>
        ) : payments.map((p, i) => (
          <div key={i} className="bg-[#141414] rounded-[14px] p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-[#1C1C1C] rounded-[10px] flex items-center justify-center flex-shrink-0">
                <span className="text-sm">{p.icon}</span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#C0C0C0]" style={F}>{p.name}</div>
                <div className="text-[11px] text-[#444444] uppercase tracking-[0.1em] mt-0.5" style={F}>{p.type}</div>
              </div>
              <div className="text-[15px] font-bold" style={{ color: p.amountNum >= 85000 ? '#3A7D44' : '#F5F5F5', ...F }}>
                {p.amount}
              </div>
            </div>
            {p.amountNum < 85000 && (
              <div className="mt-3 flex gap-2">
                <button className="h-8 px-3.5 bg-[#C2FF02] rounded-lg text-[11px] font-bold text-[#000000] active:scale-[0.97]" style={F}>
                  Оплатить сейчас
                </button>
                <button className="h-8 px-3.5 border border-[#2A2A2A] rounded-lg text-[11px] font-semibold text-[#666666] active:scale-[0.97]" style={F}>
                  Изменить
                </button>
              </div>
            )}
            {p.hasWarning && (
              <div className="mt-2.5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF7D32] flex-shrink-0" />
                <div className="text-[11px] font-medium text-[#FF7D32]" style={F}>
                  На карте {p.onCard} — не хватает {p.needed}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mx-6 mt-5 bg-[#141414] rounded-xl p-3.5 px-4">
        <div className="flex justify-between items-center">
          <div className="text-[13px] text-[#666666]" style={F}>Расходы в декабре</div>
          <div className="text-[13px] font-bold text-[#F5F5F5]" style={F}>{monthTotal.toLocaleString()} ₽</div>
        </div>
        <div className="mt-2 flex gap-3 flex-wrap">
          {[{c:'#E05252',l:'Кредиты'},{c:'#F0B429',l:'Подписки'},{c:'#888',l:'ЖКХ'}].map(x => (
            <div key={x.l} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: x.c }} />
              <span className="text-[10px] text-[#555]" style={F}>{x.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
