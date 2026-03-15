import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';
import { SectionLabel } from '../common/SectionLabel';
import { SmartTip } from '../common/SmartTip';

type ModeType = 'health' | 'economy' | 'savings' | 'investor';

export function Modes() {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<ModeType>('health');

  const modes: { id: ModeType; label: string }[] = [
    { id: 'health', label: 'Здоровье' },
    { id: 'economy', label: 'Экономия' },
    { id: 'savings', label: 'Накопления' },
    { id: 'investor', label: 'Инвестор' },
  ];

  return (
    <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen pb-6">
      <StatusBar />

      <div className="h-11 px-6 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="text-[#555555]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-[17px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>
          Режимы
        </div>
        <div className="w-5" />
      </div>

      {/* Mode Selector */}
      <div className="px-6 mt-6 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`px-5 py-2 rounded-[20px] text-[13px] font-medium whitespace-nowrap transition-colors ${
              activeMode === mode.id ? 'bg-[#C8F135] text-[#000000]' : 'bg-[#141414] text-[#555555]'
            }`}
            style={{ fontFamily: 'Manrope' }}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {activeMode === 'health' && <HealthMode />}
      {activeMode === 'economy' && <EconomyMode />}
      {activeMode === 'savings' && <SavingsMode />}
      {activeMode === 'investor' && <InvestorMode />}
    </div>
  );
}

/* ── HEALTH ─────────────────────────────────────── */
function HealthMode() {
  return (
    <div className="mt-6">
      <div className="mx-6 bg-[#141414] rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3A7D44]" />
          <div className="text-[17px] font-semibold text-[#3A7D44]" style={{ fontFamily: 'Manrope' }}>
            Всё в порядке
          </div>
        </div>
        <div className="text-[13px] text-[#666666] mt-1.5" style={{ fontFamily: 'Manrope' }}>
          Долговая нагрузка 28% — в норме для твоего профиля
        </div>

        <div className="h-px bg-[#222222] my-4" />

        <div className="space-y-2">
          <div className="flex justify-between text-[13px] text-[#666666]" style={{ fontFamily: 'Manrope' }}>
            <span>Доходы</span>
            <span>Обязательные</span>
          </div>
          <div className="h-1.5 bg-[#222222] rounded-full overflow-hidden flex">
            <div className="bg-[#C8F135]" style={{ width: '65%' }} />
            <div className="bg-[#FF5C1A]" style={{ width: '35%' }} />
          </div>
          <div className="flex justify-between text-[13px] text-[#888888]" style={{ fontFamily: 'Manrope' }}>
            <span>85 000 ₽</span>
            <span>28 400 ₽</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.1em]" style={{ fontFamily: 'Manrope' }}>
            Свободный остаток после платежей
          </div>
          <div className="text-[22px] font-semibold text-[#E8E8E8] mt-1" style={{ fontFamily: 'Manrope' }}>
            28 600 ₽
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="px-6 mt-6">
        <SectionLabel>Кредиты и рассрочки</SectionLabel>

        {[
          { name: 'Кредит наличными', debt: '184 200 ₽', payment: '4 200 ₽', date: '17 дек', warn: true },
          { name: 'Рассрочка · iPhone', debt: '45 000 ₽', payment: '5 000 ₽', date: '22 дек', warn: false },
        ].map((credit, i) => (
          <div key={i} className="mt-3 bg-[#141414] rounded-[14px] p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#1C1C1C] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm">💳</span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#C0C0C0]" style={{ fontFamily: 'Manrope' }}>{credit.name}</div>
                {credit.warn && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C1A]" />
                    <span className="text-[10px] text-[#FF5C1A]" style={{ fontFamily: 'Manrope' }}>Мало средств на карте</span>
                  </div>
                )}
              </div>
              <div className="text-[13px] text-[#888888]" style={{ fontFamily: 'Manrope' }}>{credit.debt}</div>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.1em]" style={{ fontFamily: 'Manrope' }}>
                  Следующий платёж
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[15px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>{credit.payment}</span>
                  <span className="text-[13px] text-[#666666]" style={{ fontFamily: 'Manrope' }}>{credit.date}</span>
                </div>
              </div>
              <button className="px-3.5 py-1.5 bg-[#C8F135] rounded-lg text-[11px] text-[#000000] font-bold active:scale-[0.97] transition-transform">
                Оплатить
              </button>
            </div>
          </div>
        ))}
      </div>

      <SmartTip
        text="Если погасить досрочно 10 000 ₽,"
        boldText="переплата снизится на 2 400 ₽."
        show={true}
      />

      {/* Дотянуть до получки */}
      <PaydayPlanner />
    </div>
  );
}

/* ── PAYDAY PLANNER ─────────────────────────────── */
function PaydayPlanner() {
  const [savingsGoal, setSavingsGoal] = useState(5000);
  const daysLeft = 13;
  const balance = 28600;
  const totalObligatory = 8300; // платежи до зп
  const available = balance - totalObligatory - savingsGoal;
  const perDay = Math.max(0, Math.round(available / daysLeft));
  const perWeek = perDay * 7;

  return (
    <div className="mx-6 mt-4 bg-[#141414] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">📅</span>
        <div className="text-[14px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>
          До следующей зарплаты
        </div>
      </div>
      <div className="text-[12px] text-[#555555] mb-4" style={{ fontFamily: 'Manrope' }}>
        {daysLeft} дней · Зарплата 28 декабря
      </div>

      {/* Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.08em]" style={{ fontFamily: 'Manrope' }}>
            Хочу сохранить
          </div>
          <div className="text-[15px] font-semibold text-[#C8F135]" style={{ fontFamily: 'Manrope' }}>
            {savingsGoal.toLocaleString()} ₽
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={15000}
          step={500}
          value={savingsGoal}
          onChange={(e) => setSavingsGoal(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none bg-[#222222] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8F135] [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#333333] mt-1" style={{ fontFamily: 'Manrope' }}>
          <span>0 ₽</span>
          <span>15 000 ₽</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#1C1C1C] rounded-xl p-3">
          <div className="text-[10px] font-medium text-[#444444] uppercase tracking-[0.08em] mb-1" style={{ fontFamily: 'Manrope' }}>
            В день
          </div>
          <div className={`text-[20px] font-semibold ${perDay > 0 ? 'text-[#E8E8E8]' : 'text-[#E05252]'}`} style={{ fontFamily: 'Manrope' }}>
            {perDay > 0 ? `${perDay.toLocaleString()} ₽` : 'Мало'}
          </div>
        </div>
        <div className="bg-[#1C1C1C] rounded-xl p-3">
          <div className="text-[10px] font-medium text-[#444444] uppercase tracking-[0.08em] mb-1" style={{ fontFamily: 'Manrope' }}>
            В неделю
          </div>
          <div className={`text-[20px] font-semibold ${perWeek > 0 ? 'text-[#E8E8E8]' : 'text-[#E05252]'}`} style={{ fontFamily: 'Manrope' }}>
            {perWeek > 0 ? `${perWeek.toLocaleString()} ₽` : 'Мало'}
          </div>
        </div>
      </div>

      {perDay > 0 ? (
        <div className="mt-3 text-[12px] text-[#555555]" style={{ fontFamily: 'Manrope' }}>
          Обязательные платежи: <span className="text-[#888888]">{totalObligatory.toLocaleString()} ₽</span> · Сэкономишь: <span className="text-[#C8F135]">{savingsGoal.toLocaleString()} ₽</span>
        </div>
      ) : (
        <div className="mt-3 text-[12px] text-[#E05252]" style={{ fontFamily: 'Manrope' }}>
          Слишком высокая цель экономии. Попробуй снизить.
        </div>
      )}
    </div>
  );
}

/* ── ECONOMY ─────────────────────────────────────── */
function EconomyMode() {
  const [showSeasonal, setShowSeasonal] = useState(false);

  const categories = [
    { icon: '🍔', name: 'Кафе и рестораны', delta: '+15', amount: '12 400 ₽', isUp: true },
    { icon: '🛒', name: 'Продукты', delta: '-8', amount: '18 200 ₽', isUp: false },
    { icon: '🚕', name: 'Транспорт', delta: '+3', amount: '4 500 ₽', isUp: true },
    { icon: '🎬', name: 'Развлечения', delta: null, amount: '3 200 ₽', isUp: null },
    { icon: '👕', name: 'Одежда', delta: '-12', amount: '2 800 ₽', isUp: false },
  ];

  const subscriptions = [
    { icon: '🎵', name: 'Spotify Premium', date: '20 дек', amount: '269 ₽', inactive: false },
    { icon: '📺', name: 'Netflix', date: '15 дек', amount: '799 ₽', inactive: false },
    { icon: '🏋️', name: 'World Class', date: '1 дек', amount: '4 500 ₽', inactive: true },
  ];

  return (
    <div className="mt-6">
      {/* Seasonal toggle */}
      <div className="mx-6 mb-4">
        <button
          onClick={() => setShowSeasonal(!showSeasonal)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
            showSeasonal ? 'bg-[#1A2A10] border border-[#2A4010]' : 'bg-[#141414] border border-[#222222]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">🌊</span>
            <span className="text-[13px] font-medium text-[#C0C0C0]" style={{ fontFamily: 'Manrope' }}>
              Сезонный режим
            </span>
          </div>
          <div className={`text-[11px] font-semibold px-2 py-0.5 rounded ${showSeasonal ? 'bg-[#C8F135] text-[#000000]' : 'text-[#555555]'}`} style={{ fontFamily: 'Manrope' }}>
            {showSeasonal ? 'Вкл' : 'Выкл'}
          </div>
        </button>
      </div>

      {showSeasonal && <SeasonalWorkerMode />}

      {/* Spending Overview */}
      <div className="mx-6 bg-[#141414] rounded-2xl p-5">
        <div className="flex items-center justify-center gap-3 text-[12px] font-medium text-[#666666]" style={{ fontFamily: 'Manrope' }}>
          <button className="text-[#444444] text-lg">←</button>
          <span>Ноябрь 2025</span>
          <button className="text-[#444444] text-lg">→</button>
        </div>
        <div className="mt-4">
          <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.1em]" style={{ fontFamily: 'Manrope' }}>
            Потрачено за месяц
          </div>
          <div className="text-[44px] leading-none text-[#E8E8E8] font-normal italic mt-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
            64 280
          </div>
          <div className="text-[13px] text-[#FF5C1A] mt-1.5" style={{ fontFamily: 'Manrope' }}>
            +4 200 ₽ больше, чем в октябре
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mt-6">
        <SectionLabel>По категориям</SectionLabel>
        <div className="mt-3">
          {categories.map((category, index) => (
            <div key={index} className="py-2.5 border-b border-[#161616] flex items-center gap-3">
              <div className="w-[34px] h-[34px] bg-[#181818] rounded-[10px] flex items-center justify-center flex-shrink-0">
                <span className="text-sm">{category.icon}</span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#C0C0C0]" style={{ fontFamily: 'Manrope' }}>{category.name}</div>
                {category.isUp !== null && category.delta && (
                  <div
                    className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      category.isUp ? 'bg-[#2A1010] text-[#E05252]' : 'bg-[#0A2010] text-[#3A7D44]'
                    }`}
                    style={{ fontFamily: 'Manrope' }}
                  >
                    {category.isUp ? '+' : ''}{category.delta}%
                  </div>
                )}
              </div>
              <div className="text-[13px] text-[#888888]" style={{ fontFamily: 'Manrope' }}>{category.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriptions */}
      <div className="px-6 mt-5 mb-6">
        <div className="bg-[#141414] rounded-[14px] p-4">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Подписки</SectionLabel>
            <div className="text-[13px] text-[#888888]" style={{ fontFamily: 'Manrope' }}>1 797 ₽/мес</div>
          </div>
          {subscriptions.map((sub, index) => (
            <div key={index} className="py-2.5 border-b border-[#1A1A1A] last:border-b-0 flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">{sub.icon}</span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] text-[#C0C0C0]" style={{ fontFamily: 'Manrope' }}>{sub.name}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="text-[11px] font-medium text-[#444444]" style={{ fontFamily: 'Manrope' }}>{sub.date}</div>
                  {sub.inactive && (
                    <span className="px-1.5 py-0.5 bg-[#2A1010] text-[#E05252] rounded text-[10px] font-medium" style={{ fontFamily: 'Manrope' }}>
                      не активна
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[13px] text-[#888888]" style={{ fontFamily: 'Manrope' }}>{sub.amount}</div>
                {sub.inactive && (
                  <button className="text-[10px] text-[#E05252] mt-0.5 block" style={{ fontFamily: 'Manrope' }}>отключить</button>
                )}
              </div>
            </div>
          ))}
          {/* savings hint from inactive subs */}
          <div className="mt-3 pt-3 border-t border-[#1A1A1A] flex items-center justify-between">
            <div className="text-[12px] text-[#555555]" style={{ fontFamily: 'Manrope' }}>Отключи неактивные — сэкономишь</div>
            <div className="text-[13px] font-semibold text-[#C8F135]" style={{ fontFamily: 'Manrope' }}>54 000 ₽/год</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SEASONAL WORKER ─────────────────────────────── */
function SeasonalWorkerMode() {
  const [dryMonths, setDryMonths] = useState(3);
  const avgIncome = 85000;
  const seasonBonus = 45; // % выше в сезон
  const peakIncome = Math.round(avgIncome * (1 + seasonBonus / 100));
  const dryIncome = Math.round(avgIncome * 0.4);
  const monthlyExpenses = 55000;
  const deficit = Math.max(0, monthlyExpenses - dryIncome);
  const toSavePerPeakMonth = Math.round((deficit * dryMonths) / (12 - dryMonths));
  const pct = Math.round((toSavePerPeakMonth / peakIncome) * 100);

  return (
    <div className="mx-6 mb-4 bg-[#141414] rounded-2xl p-5 border border-[#1E2A14]">
      <div className="flex items-center gap-2 mb-1">
        <span>🌊</span>
        <div className="text-[14px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>Сезонный доход</div>
      </div>
      <div className="text-[12px] text-[#555555] mb-4" style={{ fontFamily: 'Manrope' }}>
        Сколько «сухих» месяцев у тебя в году?
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.08em]" style={{ fontFamily: 'Manrope' }}>Тихий сезон</div>
          <div className="text-[15px] font-semibold text-[#C8F135]" style={{ fontFamily: 'Manrope' }}>{dryMonths} мес.</div>
        </div>
        <input
          type="range" min={1} max={8} step={1} value={dryMonths}
          onChange={(e) => setDryMonths(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none bg-[#222222] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8F135] [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#333333] mt-1" style={{ fontFamily: 'Manrope' }}>
          <span>1 мес.</span><span>8 мес.</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#1C1C1C] rounded-xl p-3">
          <div className="text-[10px] font-medium text-[#444444] uppercase tracking-[0.08em] mb-1" style={{ fontFamily: 'Manrope' }}>В сезон</div>
          <div className="text-[16px] font-semibold text-[#3A7D44]" style={{ fontFamily: 'Manrope' }}>{peakIncome.toLocaleString()} ₽</div>
        </div>
        <div className="bg-[#1C1C1C] rounded-xl p-3">
          <div className="text-[10px] font-medium text-[#444444] uppercase tracking-[0.08em] mb-1" style={{ fontFamily: 'Manrope' }}>В тихий</div>
          <div className="text-[16px] font-semibold text-[#888888]" style={{ fontFamily: 'Manrope' }}>{dryIncome.toLocaleString()} ₽</div>
        </div>
      </div>

      <div className="bg-[#1A2A10] rounded-xl p-3.5">
        <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.08em] mb-1" style={{ fontFamily: 'Manrope' }}>
          Откладывай в сезон
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-[22px] font-semibold text-[#C8F135]" style={{ fontFamily: 'Manrope' }}>
            {toSavePerPeakMonth.toLocaleString()} ₽/мес
          </div>
          <div className="text-[13px] text-[#555555]" style={{ fontFamily: 'Manrope' }}>({pct}%)</div>
        </div>
        <div className="text-[12px] text-[#555555] mt-1" style={{ fontFamily: 'Manrope' }}>
          Чтобы в тихий сезон не остаться без денег
        </div>
      </div>
    </div>
  );
}

/* ── SAVINGS ─────────────────────────────────────── */
function SavingsMode() {
  const goals = [
    { name: 'Отпуск в Италии', progress: 65, current: 195000, target: 300000, forecastMonths: 8 },
    { name: 'Новый iPhone', progress: 42, current: 52000, target: 125000, forecastMonths: 12 },
  ];

  return (
    <div className="mt-6 pb-6">
      {/* Cashback gift */}
      <div className="mx-6 mb-4 bg-[#141414] rounded-2xl p-4 flex gap-3 items-start border border-[#1E2A14]">
        <div className="text-xl flex-shrink-0">🎁</div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold text-[#C8F135] mb-0.5" style={{ fontFamily: 'Manrope' }}>
            Подарок от ОТП
          </div>
          <div className="text-[12px] text-[#666666] leading-relaxed" style={{ fontFamily: 'Manrope' }}>
            +1% к накопительному счёту на следующий месяц. Ставка станет <span className="text-[#E8E8E8] font-semibold">9.5% вместо 8.5%</span>.
          </div>
          <button className="mt-2 h-7 px-3 bg-[#C8F135] rounded-lg text-[11px] font-bold text-[#000000] active:scale-[0.97] transition-transform">
            Активировать бонус
          </button>
        </div>
      </div>

      <div className="mx-6 space-y-3">
        {goals.map((goal, index) => (
          <GoalCard key={index} goal={goal} />
        ))}

        <button className="w-full h-11 bg-[#141414] border border-dashed border-[#333333] rounded-[14px] flex items-center justify-center">
          <span className="text-[13px] text-[#555555]" style={{ fontFamily: 'Manrope' }}>＋ Новая цель</span>
        </button>
      </div>

      {/* Deposits */}
      <div className="px-6 mt-6">
        <SectionLabel>Вклады и счета</SectionLabel>
        <div className="mt-3 bg-[#141414] rounded-[14px] p-4">
          <div className="flex justify-between items-start">
            <div className="text-[13px] text-[#C0C0C0]" style={{ fontFamily: 'Manrope' }}>Накопительный счёт</div>
            <div className="flex items-center gap-1">
              <div className="text-[13px] line-through text-[#444444]" style={{ fontFamily: 'Manrope' }}>8.5%</div>
              <div className="text-[13px] text-[#C8F135] font-semibold" style={{ fontFamily: 'Manrope' }}>9.5% 🎁</div>
            </div>
          </div>
          <div className="text-[22px] font-semibold text-[#E8E8E8] mt-1" style={{ fontFamily: 'Manrope' }}>42 840 ₽</div>
          <div className="text-[11px] font-medium text-[#555555] uppercase tracking-[0.1em] mt-0.5" style={{ fontFamily: 'Manrope' }}>
            Действует до 15 июня 2026
          </div>
          <div className="text-[11px] font-medium text-[#3A7D44] uppercase tracking-[0.1em] mt-2" style={{ fontFamily: 'Manrope' }}>
            Начислено: +842 ₽
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalCard({ goal }: { goal: { name: string; progress: number; current: number; target: number; forecastMonths: number } }) {
  const [sliderValue, setSliderValue] = useState(50);
  const optimizedMonths = Math.max(1, Math.round(goal.forecastMonths * (1 - sliderValue / 250)));

  return (
    <div className="bg-[#141414] rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div className="text-[17px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>{goal.name}</div>
        <div className="text-[17px] font-semibold text-[#C8F135]" style={{ fontFamily: 'Manrope' }}>{goal.progress}%</div>
      </div>

      <div className="mt-3 h-1.5 bg-[#222222] rounded-full overflow-hidden">
        <div className="h-full bg-[#C8F135] transition-all" style={{ width: `${goal.progress}%` }} />
      </div>

      <div className="mt-3 flex justify-between">
        <div>
          <div className="text-[13px] text-[#666666]" style={{ fontFamily: 'Manrope' }}>накоплено</div>
          <div className="text-[15px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>{goal.current.toLocaleString()} ₽</div>
        </div>
        <div className="text-right">
          <div className="text-[13px] text-[#666666]" style={{ fontFamily: 'Manrope' }}>цель</div>
          <div className="text-[13px] text-[#888888]" style={{ fontFamily: 'Manrope' }}>{goal.target.toLocaleString()} ₽</div>
        </div>
      </div>

      <div className="text-[11px] text-[#555555] mt-2" style={{ fontFamily: 'Manrope' }}>
        При текущем темпе — через {goal.forecastMonths} мес.
      </div>

      <div className="mt-3">
        <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.1em] mb-2" style={{ fontFamily: 'Manrope' }}>
          Откладывать больше?
        </div>
        <input
          type="range" min={0} max={100} value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none bg-[#222222] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8F135] [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="text-[11px] text-[#C8F135] mt-1" style={{ fontFamily: 'Manrope' }}>
          → цель через {optimizedMonths} мес.
        </div>
      </div>
    </div>
  );
}

/* ── INVESTOR ─────────────────────────────────────── */
function InvestorMode() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(10);
  const years = 5;
  const result = Math.round(amount * 12 * ((Math.pow(1 + rate / 100 / 12, years * 12) - 1) / (rate / 100 / 12)));
  const simple = amount * 12 * years;
  const gain = result - simple;

  return (
    <div className="mt-6 pb-6">
      <div className="mx-6 bg-[#141414] rounded-2xl p-5">
        <div className="text-[14px] font-semibold text-[#E8E8E8] mb-1" style={{ fontFamily: 'Manrope' }}>
          Что если инвестировать регулярно?
        </div>
        <div className="text-[12px] text-[#555555] mb-5" style={{ fontFamily: 'Manrope' }}>
          Сценарий на {years} лет
        </div>

        {/* Amount slider */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.08em]" style={{ fontFamily: 'Manrope' }}>Ежемесячно</div>
            <div className="text-[15px] font-semibold text-[#C8F135]" style={{ fontFamily: 'Manrope' }}>{amount.toLocaleString()} ₽</div>
          </div>
          <input
            type="range" min={1000} max={50000} step={1000} value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-[#222222] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8F135] [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        {/* Rate slider */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.08em]" style={{ fontFamily: 'Manrope' }}>Доходность</div>
            <div className="text-[15px] font-semibold text-[#888888]" style={{ fontFamily: 'Manrope' }}>{rate}% годовых</div>
          </div>
          <input
            type="range" min={5} max={25} step={1} value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-[#222222] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8F135] [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#333333] mt-1" style={{ fontFamily: 'Manrope' }}>
            <span>Вклад ~5%</span><span>Акции ~15–20%</span>
          </div>
        </div>

        {/* Result */}
        <div className="bg-[#1C1C1C] rounded-xl p-4">
          <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.08em] mb-1" style={{ fontFamily: 'Manrope' }}>
            Через {years} лет
          </div>
          <div className="text-[32px] font-normal italic text-[#E8E8E8]" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {result.toLocaleString()} ₽
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="text-[12px] text-[#555555]" style={{ fontFamily: 'Manrope' }}>Вложишь: {simple.toLocaleString()} ₽</div>
            <div className="text-[12px] text-[#3A7D44] font-semibold" style={{ fontFamily: 'Manrope' }}>+{gain.toLocaleString()} ₽ сверху</div>
          </div>
        </div>
      </div>

      {/* Coming soon note */}
      <div className="mx-6 mt-4 bg-[#141414] rounded-xl p-4 flex gap-3 items-start opacity-60">
        <span className="text-sm flex-shrink-0">🔜</span>
        <div className="text-[12px] text-[#666666]" style={{ fontFamily: 'Manrope' }}>
          Брокерский счёт и ИИС — скоро появятся в приложении. Пока используй калькулятор для планирования.
        </div>
      </div>
    </div>
  );
}
