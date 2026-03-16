import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';

const F = { fontFamily: "'Onest', sans-serif" };

const monthData = [
  { month: 'Авг', income: 82000, expense: 54000 },
  { month: 'Сен', income: 85000, expense: 61000 },
  { month: 'Окт', income: 85000, expense: 58000 },
  { month: 'Ноя', income: 85000, expense: 64280 },
  { month: 'Дек', income: 85000, expense: 42000 },
];

const catData = [
  { label: 'Продукты', amount: 18200, color: '#C2FF02' },
  { label: 'Кафе',     amount: 12400, color: '#FF7D32' },
  { label: 'Транспорт',amount: 4500,  color: '#F0B429' },
  { label: 'Спорт',    amount: 4500,  color: '#3A7D44' },
  { label: 'Красота',  amount: 3200,  color: '#9D70C1' },
  { label: 'Одежда',   amount: 2800,  color: '#7B5EA7' },
];

export function Analytics() {
  const navigate = useNavigate();
  const maxVal = Math.max(...monthData.map(d => d.income));
  const total = catData.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen pb-6">
      <StatusBar />
      <div className="h-11 px-6 flex items-center justify-between">
        <button onClick={() => navigate('/lifestyle')} className="text-[#555]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-[17px] font-bold text-[#F5F5F5]" style={F}>Анализ</div>
        <div className="w-5" />
      </div>

      <div className="px-6 mt-4 space-y-4">
        {/* Bar chart */}
        <div className="bg-[#141414] rounded-2xl p-4">
          <div className="text-[14px] font-bold text-[#F5F5F5] mb-3" style={F}>Доходы и расходы</div>
          <div className="flex items-end gap-2 h-32 mb-3">
            {monthData.map((d, i) => {
              const incH = Math.round((d.income / maxVal) * 112);
              const expH = Math.round((d.expense / maxVal) * 112);
              const cur = i === monthData.length - 1;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex gap-0.5 items-end" style={{ height: '112px' }}>
                    <div className="flex-1 rounded-t-sm" style={{ height: incH, background: cur ? '#C2FF02' : '#2A3A0A' }} />
                    <div className="flex-1 rounded-t-sm" style={{ height: expH, background: cur ? '#FF7D32' : '#2A1A0A' }} />
                  </div>
                  <span className="text-[9px] text-[#444]" style={F}>{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4">
            {[{ c: '#C2FF02', l: 'Доходы' }, { c: '#FF7D32', l: 'Расходы' }].map(x => (
              <div key={x.l} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: x.c }} />
                <span className="text-[11px] text-[#666]" style={F}>{x.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie */}
        <div className="bg-[#141414] rounded-2xl p-4">
          <div className="text-[14px] font-bold text-[#F5F5F5] mb-3" style={F}>Структура расходов</div>
          <div className="flex gap-4 items-center">
            <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0">
              {(() => {
                let angle = -90;
                return catData.map(cat => {
                  const sweep = (cat.amount / total) * 360;
                  const start = angle; angle += sweep;
                  const r = 40, cx = 50, cy = 50;
                  const x1 = cx + r * Math.cos(start * Math.PI / 180);
                  const y1 = cy + r * Math.sin(start * Math.PI / 180);
                  const x2 = cx + r * Math.cos((start + sweep) * Math.PI / 180);
                  const y2 = cy + r * Math.sin((start + sweep) * Math.PI / 180);
                  return <path key={cat.label} d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2} Z`} fill={cat.color} opacity="0.85" />;
                });
              })()}
              <circle cx="50" cy="50" r="22" fill="#141414" />
            </svg>
            <div className="flex-1 space-y-1.5">
              {catData.map(cat => (
                <div key={cat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                    <span className="text-[11px] text-[#888]" style={F}>{cat.label}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#C0C0C0]" style={F}>{Math.round(cat.amount / total * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Savings rate */}
        <div className="bg-[#141414] rounded-2xl p-4">
          <div className="text-[14px] font-bold text-[#F5F5F5] mb-3" style={F}>Норма сбережений</div>
          {monthData.slice(-3).map(d => {
            const rate = Math.round(((d.income - d.expense) / d.income) * 100);
            return (
              <div key={d.month} className="mb-3 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span className="text-[12px] text-[#888]" style={F}>{d.month}</span>
                  <span className="text-[12px] font-semibold" style={{ color: rate >= 20 ? '#C2FF02' : rate >= 10 ? '#F0B429' : '#E05252', ...F }}>{rate}%</span>
                </div>
                <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.min(rate, 100)}%`, background: rate >= 20 ? '#C2FF02' : rate >= 10 ? '#F0B429' : '#E05252' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
