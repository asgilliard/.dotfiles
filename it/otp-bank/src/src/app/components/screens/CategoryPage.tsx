import { useParams, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';

const F = { fontFamily: "'Onest', sans-serif" };

const CATEGORIES: Record<string, {
  label: string; emoji: string; color: string; colorDark: string;
  spent: number; budget: number; delta: string; isUp: boolean;
  transactions: { icon: string; name: string; date: string; amount: number }[];
  tip: string; product: string;
}> = {
  sport: {
    label: 'Спорт', emoji: '🏋️', color: '#C2FF02', colorDark: '#749901',
    spent: 4500, budget: 5000, delta: '+5%', isUp: true,
    transactions: [
      { icon: '🏋️', name: 'World Class', date: '10 дек', amount: -4500 },
      { icon: '👟', name: 'Спортмастер', date: '3 дек', amount: -2800 },
      { icon: '🏊', name: 'Бассейн Олимп', date: '1 дек', amount: -800 },
    ],
    tip: 'Вы тратили на спорт на 5% больше обычного. Хотите оптимизировать?',
    product: 'Кешбэк 5% на спортивные товары с картой ОТП Sport.',
  },
  food: {
    label: 'Продукты', emoji: '🛒', color: '#FF7D32', colorDark: '#994B1E',
    spent: 18200, budget: 20000, delta: '-8%', isUp: false,
    transactions: [
      { icon: '🛒', name: 'Пятёрочка', date: '14 дек', amount: -1247 },
      { icon: '🛒', name: 'ВкусВилл', date: '12 дек', amount: -3400 },
      { icon: '🛒', name: 'Перекрёсток', date: '8 дек', amount: -2100 },
      { icon: '🚚', name: 'Самокат', date: '6 дек', amount: -890 },
    ],
    tip: 'Расходы на продукты снизились на 8% — отличный результат.',
    product: 'Кешбэк 3% на продукты в партнёрских магазинах.',
  },
  beauty: {
    label: 'Красота', emoji: '💄', color: '#9D70C1', colorDark: '#4A355B',
    spent: 3200, budget: 4000, delta: '+2%', isUp: true,
    transactions: [
      { icon: '💅', name: 'Beauty Studio', date: '11 дек', amount: -1800 },
      { icon: '🧴', name: 'Золотое Яблоко', date: '5 дек', amount: -1400 },
    ],
    tip: 'Траты на красоту в норме. Так держать.',
    product: 'Кешбэк 7% на косметику и уход с картой ОТП.',
  },
  health: {
    label: 'Здоровье', emoji: '💊', color: '#3A7D44', colorDark: '#1A3A1A',
    spent: 2100, budget: 3000, delta: '-15%', isUp: false,
    transactions: [
      { icon: '💊', name: 'Аптека Самсон', date: '12 дек', amount: -890 },
      { icon: '🏥', name: 'Клиника Медси', date: '7 дек', amount: -1200 },
    ],
    tip: 'Траты на здоровье снизились — хороший знак или пропускаешь визиты?',
    product: 'ДМС от ОТП — страховка с покрытием 300+ клиник от 999 ₽/мес.',
  },
  fashion: {
    label: 'Мода', emoji: '👗', color: '#9D70C1', colorDark: '#6B4A8C',
    spent: 2800, budget: 4000, delta: '-12%', isUp: false,
    transactions: [
      { icon: '👗', name: 'Zara', date: '9 дек', amount: -2800 },
    ],
    tip: 'Траты на одежду снизились — больше на другое.',
    product: 'Рассрочка 0% на одежду через ОТП Покупки.',
  },
};

// Простой line chart из SVG
function MiniLineChart({ color }: { color: string }) {
  // Данные: янв-фев-мар (декабрь — текущий, уменьшение)
  const points = [
    { x: 0, y: 80 },
    { x: 60, y: 55 },
    { x: 120, y: 70 },
    { x: 180, y: 40 },
    { x: 240, y: 60 },
    { x: 295, y: 35 },
  ];
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const months = ['авг', 'сен', 'окт', 'ноя', 'дек'];

  return (
    <div className="bg-[rgba(45,45,45,0.66)] backdrop-blur-sm rounded-2xl p-4 mt-4">
      <div className="text-[12px] text-[#888] mb-2" style={F}>Динамика трат</div>
      <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none">
        {/* Area fill */}
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${d} L 295 80 L 0 80 Z`}
          fill="url(#lineGrad)"
        />
        <path d={d} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Last point dot */}
        <circle cx={points[points.length-1].x} cy={points[points.length-1].y} r="4" fill={color} />
        {/* Vertical dashed line at last point */}
        <line x1={points[points.length-1].x} y1="0" x2={points[points.length-1].x} y2="80" stroke={color} strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
      </svg>
      <div className="flex justify-between mt-1">
        {months.map(m => (
          <span key={m} className="text-[10px] text-[#555]" style={F}>{m}</span>
        ))}
      </div>
    </div>
  );
}

export function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cat = CATEGORIES[id ?? ''] ?? CATEGORIES['sport'];
  const pct = Math.round((cat.spent / cat.budget) * 100);

  return (
    <div
      className="max-w-[390px] mx-auto min-h-screen overflow-y-auto pb-8"
      style={{ background: '#0D0D0D' }}
    >
      {/* Фоновое свечение цвета категории */}
      <div
        className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${cat.color}22 0%, transparent 70%)`,
        }}
      />

      <StatusBar />

      {/* Back */}
      <div className="relative z-10 px-5 pt-3">
        <button
          onClick={() => navigate('/lifestyle')}
          className="w-8 h-8 bg-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Hero */}
      <div className="relative z-10 px-5 pt-4 text-center">
        <div className="text-[64px] leading-none" style={F}>{cat.emoji}</div>
        <div className="text-[48px] font-black text-[#F5F5F5] mt-2" style={F}>{cat.label}</div>
        <div className="text-[32px] font-bold mt-1" style={{ color: cat.color, ...F }}>
          {cat.spent.toLocaleString()} ₽
        </div>
        <div className="text-[15px] text-white/60 mt-1" style={F}>вы потратили за декабрь</div>
      </div>

      {/* Stats cards */}
      <div className="px-5 mt-6 grid grid-cols-2 gap-3 relative z-10">
        <div className="bg-[rgba(45,45,45,0.66)] backdrop-blur-sm rounded-2xl p-4">
          <div className="text-[32px] font-bold text-[#F5F5F5]" style={F}>{pct}%</div>
          <div className="text-[13px] text-white/50 mt-0.5" style={F}>от всех расходов</div>
        </div>
        <div className="bg-[rgba(45,45,45,0.66)] backdrop-blur-sm rounded-2xl p-4">
          <div className="text-[32px] font-bold" style={{ color: cat.isUp ? '#E05252' : '#3A7D44', ...F }}>
            {cat.delta}
          </div>
          <div className="text-[13px] text-white/50 mt-0.5" style={F}>к прошлому месяцу</div>
        </div>
      </div>

      {/* Budget progress */}
      <div className="px-5 mt-4 relative z-10">
        <div className="bg-[rgba(45,45,45,0.66)] backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-[13px] text-white/50" style={F}>Бюджет</span>
            <span className="text-[13px] font-semibold text-[#F5F5F5]" style={F}>
              {cat.spent.toLocaleString()} / {cat.budget.toLocaleString()} ₽
            </span>
          </div>
          <div className="h-2 bg-[#333] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${Math.min(pct, 100)}%`, background: cat.color }}
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-5 relative z-10">
        <MiniLineChart color={cat.color} />
      </div>

      {/* Transactions */}
      <div className="px-5 mt-4 relative z-10">
        <div className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-2" style={F}>
          Операции
        </div>
        <div className="bg-[rgba(45,45,45,0.66)] backdrop-blur-sm rounded-2xl overflow-hidden">
          {cat.transactions.map((tx, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0">
              <div className="w-9 h-9 bg-[rgba(255,255,255,0.08)] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-base">{tx.icon}</span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#F5F5F5]" style={F}>{tx.name}</div>
                <div className="text-[10px] text-white/40 mt-0.5" style={F}>{tx.date}</div>
              </div>
              <span className="text-[13px] font-semibold text-[#888]" style={F}>
                {tx.amount.toLocaleString()} ₽
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Smart tip */}
      <div className="px-5 mt-4 relative z-10">
        <div className="rounded-2xl p-4 border" style={{ background: cat.color + '15', borderColor: cat.color + '40' }}>
          <div className="flex gap-2 items-start">
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: cat.color }} />
            <span className="text-[13px] text-white/70 leading-relaxed" style={F}>{cat.tip}</span>
          </div>
        </div>
      </div>

      {/* Product offer - нативная реклама как у Киры */}
      <div className="mx-5 mt-4 relative z-10 rounded-2xl overflow-hidden">
        <div
          className="p-5"
          style={{ background: `linear-gradient(135deg, ${cat.color}33 0%, ${cat.colorDark}22 100%)` }}
        >
          <div className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-2" style={F}>
            Предложение от ОТП
          </div>
          <div className="text-[15px] text-[#F5F5F5] leading-relaxed mb-4" style={F}>
            {cat.product}
          </div>
          <button
            className="px-5 py-2.5 rounded-2xl text-[13px] font-bold text-black active:scale-95 transition-transform"
            style={{ background: cat.color }}
          >
            узнать больше
          </button>
        </div>
      </div>
    </div>
  );
}
