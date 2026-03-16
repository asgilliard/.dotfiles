import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';

const F = { fontFamily: "'Onest', sans-serif" };

const monthlyData = [
  { month: 'Янв', income: 80000, expense: 62000 },
  { month: 'Фев', income: 80000, expense: 58000 },
  { month: 'Мар', income: 80000, expense: 71000 },
  { month: 'Апр', income: 85000, expense: 55000 },
  { month: 'Май', income: 85000, expense: 60000 },
  { month: 'Июн', income: 85000, expense: 67000 },
  { month: 'Июл', income: 90000, expense: 72000 },
  { month: 'Авг', income: 90000, expense: 54000 },
  { month: 'Сен', income: 85000, expense: 61000 },
  { month: 'Окт', income: 85000, expense: 58000 },
  { month: 'Ноя', income: 85000, expense: 64000 },
  { month: 'Дек', income: 85000, expense: 42000 },
];

const topCats = [
  { label: 'Продукты', total: 198400, color: '#C2FF02', emoji: '🛒' },
  { label: 'Кафе',     total: 134200, color: '#FF7D32', emoji: '☕' },
  { label: 'Транспорт',total: 52800,  color: '#F0B429', emoji: '🚕' },
  { label: 'Спорт',    total: 48600,  color: '#3A7D44', emoji: '🏋️' },
  { label: 'Красота',  total: 38400,  color: '#9D70C1', emoji: '💄' },
];

export function YearSummary() {
  const navigate = useNavigate();
  const totalIncome  = monthlyData.reduce((s, d) => s + d.income, 0);
  const totalExpense = monthlyData.reduce((s, d) => s + d.expense, 0);
  const totalSaved   = totalIncome - totalExpense;
  const maxVal = Math.max(...monthlyData.map(d => d.income));
  const bestMonth = monthlyData.reduce((a, b) => (b.income - b.expense > a.income - a.expense ? b : a));

  return (
    <div className="max-w-[390px] mx-auto bg-[#0D0D0D] min-h-screen pb-8">
      <StatusBar />
      <div className="h-11 px-6 flex items-center justify-between">
        <button onClick={() => navigate('/lifestyle')} className="text-[#555]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-[17px] font-bold text-[#F5F5F5]" style={F}>Итоги 2025</div>
        <div className="w-5" />
      </div>

      {/* Stats */}
      <div className="px-5 mt-2 grid grid-cols-3 gap-3">
        {[
          { label: 'Доходы',      value: `${(totalIncome / 1000000).toFixed(2)}м`,  color: '#C2FF02' },
          { label: 'Расходы',     value: `${(totalExpense / 1000000).toFixed(2)}м`, color: '#FF7D32' },
          { label: 'Сэкономлено', value: `${(totalSaved / 1000).toFixed(0)}к ₽`,   color: '#3A7D44' },
        ].map(s => (
          <div key={s.label} className="bg-[#141414] rounded-xl p-3 text-center">
            <div className="text-[10px] text-[#555] mb-1" style={F}>{s.label}</div>
            <div className="text-[15px] font-black" style={{ color: s.color, ...F }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="px-5 mt-4">
        <div className="bg-[#141414] rounded-2xl p-4">
          <div className="text-[13px] font-bold text-[#F5F5F5] mb-3" style={F}>Помесячно</div>
          <div className="flex items-end gap-1 h-24">
            {monthlyData.map(d => {
              const incH = Math.round((d.income / maxVal) * 80);
              const expH = Math.round((d.expense / maxVal) * 80);
              const isBest = d.month === bestMonth.month;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex gap-px items-end" style={{ height: '80px' }}>
                    <div className="flex-1 rounded-t-sm" style={{ height: incH, background: isBest ? '#C2FF02' : '#2A3A0A' }} />
                    <div className="flex-1 rounded-t-sm" style={{ height: expH, background: isBest ? '#FF7D32' : '#2A1A0A' }} />
                  </div>
                  <span className="text-[7px] text-[#333]" style={F}>{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 text-[11px] text-[#555]" style={F}>
            Лучший месяц: <span className="text-[#C2FF02] font-semibold">{bestMonth.month}</span> — сэкономлено {(bestMonth.income - bestMonth.expense).toLocaleString()} ₽
          </div>
        </div>
      </div>

      {/* Top categories */}
      <div className="px-5 mt-4">
        <div className="text-[13px] font-bold text-[#F5F5F5] mb-3" style={F}>Топ категорий</div>
        <div className="space-y-2">
          {topCats.map((cat, i) => (
            <div key={cat.label} className="bg-[#141414] rounded-xl p-3.5 flex items-center gap-3">
              <div className="text-[11px] font-black text-[#444] w-4" style={F}>{i + 1}</div>
              <span className="text-lg">{cat.emoji}</span>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-[#C0C0C0]" style={F}>{cat.label}</div>
                <div className="mt-1 h-1 bg-[#222] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(cat.total / topCats[0].total) * 100}%`, background: cat.color }} />
                </div>
              </div>
              <div className="text-[13px] font-bold text-[#F5F5F5]" style={F}>{(cat.total / 1000).toFixed(0)}к ₽</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-5 mt-4">
        <div className="bg-[#141414] rounded-2xl p-4">
          <div className="text-[13px] font-bold text-[#F5F5F5] mb-3" style={F}>Достижения</div>
          {[
            { emoji: '🔥', text: '42 дня без сигарет — личный рекорд' },
            { emoji: '💪', text: '8 месяцев с тренировками' },
            { emoji: '💰', text: 'Сэкономил 10%+ от дохода в 6 месяцах из 12' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
              <span className="text-xl flex-shrink-0">{a.emoji}</span>
              <span className="text-[13px] text-[#888]" style={F}>{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
