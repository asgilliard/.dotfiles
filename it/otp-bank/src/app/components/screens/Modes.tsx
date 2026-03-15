import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';
import { SectionLabel } from '../common/SectionLabel';

const F = { fontFamily: "'Onest', sans-serif" };

type ModeType = 'economy' | 'savings' | 'analytics';

export function Modes() {
    const navigate = useNavigate();
    const [activeMode, setActiveMode] = useState<ModeType>('economy');

    const modes: { id: ModeType; label: string }[] = [
        { id: 'economy', label: 'Экономия' },
        { id: 'savings', label: 'Накопления' },
        { id: 'analytics', label: 'Анализ' },
    ];

    return (
        <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen pb-6">
            <StatusBar />
            <div className="h-11 px-6 flex items-center justify-between">
                <button onClick={() => navigate('/')} className="text-[#555555]">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-[17px] font-bold text-[#F5F5F5]" style={F}>Режимы</div>
                <div className="w-5" />
            </div>

            <div className="px-6 mt-4 flex gap-2">
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id)}
                        className={`px-5 py-2 rounded-[20px] text-[13px] font-semibold whitespace-nowrap transition-colors ${activeMode === mode.id ? 'bg-[#C2FF02] text-[#000000]' : 'bg-[#141414] text-[#555555]'
                            }`}
                        style={F}
                    >
                        {mode.label}
                    </button>
                ))}
            </div>

            {activeMode === 'economy' && <EconomyMode />}
            {activeMode === 'savings' && <SavingsMode />}
            {activeMode === 'analytics' && <AnalyticsMode />}
        </div>
    );
}

/* ── ECONOMY ─────────────────────────────────── */
function EconomyMode() {
    const [showSeasonal, setShowSeasonal] = useState(false);

    const categories = [
        { icon: '🍔', name: 'Кафе и рестораны', delta: '+15', amount: '12 400 ₽', isUp: true },
        { icon: '🛒', name: 'Продукты', delta: '-8', amount: '18 200 ₽', isUp: false },
        { icon: '🚕', name: 'Транспорт', delta: '+3', amount: '4 500 ₽', isUp: true },
        { icon: '🏋️', name: 'Спорт', delta: null, amount: '4 500 ₽', isUp: null },
        { icon: '🎬', name: 'Развлечения', delta: null, amount: '3 200 ₽', isUp: null },
        { icon: '👗', name: 'Одежда', delta: '-12', amount: '2 800 ₽', isUp: false },
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
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${showSeasonal ? 'bg-[#1A2A10] border border-[#2A4010]' : 'bg-[#141414] border border-[#222222]'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-sm">🌊</span>
                        <span className="text-[13px] font-medium text-[#C0C0C0]" style={F}>Малоприбыльный сезон</span>
                    </div>
                    <div className={`text-[11px] font-semibold px-2 py-0.5 rounded ${showSeasonal ? 'bg-[#C2FF02] text-[#000000]' : 'text-[#555555]'}`} style={F}>
                        {showSeasonal ? 'Вкл' : 'Выкл'}
                    </div>
                </button>
            </div>

            {showSeasonal && <SeasonalMode />}

            <div className="mx-6 bg-[#141414] rounded-2xl p-5">
                <div className="flex items-center justify-center gap-3 text-[12px] font-medium text-[#666666]" style={F}>
                    <button className="text-[#444444] text-lg">←</button>
                    <span>Ноябрь 2025</span>
                    <button className="text-[#444444] text-lg">→</button>
                </div>
                <div className="mt-4">
                    <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.1em]" style={F}>Потрачено за месяц</div>
                    <div className="text-[44px] leading-none text-[#F5F5F5] font-black mt-1" style={F}>64 280</div>
                    <div className="text-[13px] text-[#FF7D32] mt-1.5" style={F}>+4 200 ₽ больше, чем в октябре</div>
                </div>
            </div>

            <div className="px-6 mt-6">
                <SectionLabel>По категориям</SectionLabel>
                <div className="mt-3">
                    {categories.map((cat, i) => (
                        <div key={i} className="py-2.5 border-b border-[#161616] flex items-center gap-3">
                            <div className="w-[34px] h-[34px] bg-[#181818] rounded-[10px] flex items-center justify-center flex-shrink-0">
                                <span className="text-sm">{cat.icon}</span>
                            </div>
                            <div className="flex-1">
                                <div className="text-[13px] font-medium text-[#C0C0C0]" style={F}>{cat.name}</div>
                                {cat.isUp !== null && cat.delta && (
                                    <div className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${cat.isUp ? 'bg-[#2A1010] text-[#E05252]' : 'bg-[#0A2010] text-[#3A7D44]'}`} style={F}>
                                        {cat.isUp ? '+' : ''}{cat.delta}%
                                    </div>
                                )}
                            </div>
                            <div className="text-[13px] text-[#888888]" style={F}>{cat.amount}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 mt-5 mb-6">
                <div className="bg-[#141414] rounded-[14px] p-4">
                    <div className="flex items-center justify-between mb-3">
                        <SectionLabel>Подписки</SectionLabel>
                        <div className="text-[13px] text-[#888888]" style={F}>1 797 ₽/мес</div>
                    </div>
                    {subscriptions.map((sub, i) => (
                        <div key={i} className="py-2.5 border-b border-[#1A1A1A] last:border-b-0 flex items-center gap-3">
                            <span className="text-sm">{sub.icon}</span>
                            <div className="flex-1">
                                <div className="text-[13px] text-[#C0C0C0]" style={F}>{sub.name}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <div className="text-[11px] text-[#444444]" style={F}>{sub.date}</div>
                                    {sub.inactive && <span className="px-1.5 py-0.5 bg-[#2A1010] text-[#E05252] rounded text-[10px] font-medium" style={F}>не активна</span>}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[13px] text-[#888888]" style={F}>{sub.amount}</div>
                                {sub.inactive && <button className="text-[10px] text-[#E05252] mt-0.5 block" style={F}>отключить</button>}
                            </div>
                        </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-[#1A1A1A] flex justify-between">
                        <span className="text-[12px] text-[#555]" style={F}>Отключи неактивные</span>
                        <span className="text-[13px] font-semibold text-[#C2FF02]" style={F}>54 000 ₽/год</span>
                    </div>
                </div>
            </div>

            {/* Payday planner */}
            <PaydayPlanner />
        </div>
    );
}

function SeasonalMode() {
    const [dryMonths, setDryMonths] = useState(3);
    const avgIncome = 85000;
    const peakIncome = Math.round(avgIncome * 1.45);
    const dryIncome = Math.round(avgIncome * 0.4);
    const monthlyExpenses = 55000;
    const deficit = Math.max(0, monthlyExpenses - dryIncome);
    const toSave = Math.round((deficit * dryMonths) / (12 - dryMonths));
    const pct = Math.round((toSave / peakIncome) * 100);

    return (
        <div className="mx-6 mb-4 bg-[#141414] rounded-2xl p-5 border border-[#1E2A14]">
            <div className="text-[14px] font-bold text-[#F5F5F5] mb-1" style={F}>Малоприбыльный сезон</div>
            <div className="text-[12px] text-[#555] mb-4" style={F}>Сколько малоприбыльных месяцев в году?</div>
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-medium text-[#444] uppercase tracking-[0.08em]" style={F}>Тихих месяцев</span>
                    <span className="text-[15px] font-bold text-[#C2FF02]" style={F}>{dryMonths} мес.</span>
                </div>
                <input type="range" min={1} max={8} value={dryMonths} onChange={e => setDryMonths(+e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none bg-[#222] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C2FF02]" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-[#1C1C1C] rounded-xl p-3">
                    <div className="text-[10px] text-[#444] uppercase mb-1" style={F}>В сезон</div>
                    <div className="text-[18px] font-bold text-[#3A7D44]" style={F}>{peakIncome.toLocaleString()} ₽</div>
                </div>
                <div className="bg-[#1C1C1C] rounded-xl p-3">
                    <div className="text-[10px] text-[#444] uppercase mb-1" style={F}>В тихий</div>
                    <div className="text-[18px] font-bold text-[#888]" style={F}>{dryIncome.toLocaleString()} ₽</div>
                </div>
            </div>
            <div className="bg-[#1A2A10] rounded-xl p-3.5">
                <div className="text-[11px] text-[#444] uppercase mb-1" style={F}>Откладывай в сезон</div>
                <div className="text-[22px] font-bold text-[#C2FF02]" style={F}>{toSave.toLocaleString()} ₽/мес <span className="text-[14px] text-[#555]">({pct}%)</span></div>
                <div className="text-[12px] text-[#555] mt-1" style={F}>Чтобы в тихий сезон не остаться без денег</div>
            </div>
        </div>
    );
}

function PaydayPlanner() {
    const [savingsGoal, setSavingsGoal] = useState(5000);
    const [payday, setPayday] = useState(28);
    const [editingPayday, setEditingPayday] = useState(false);
    const today = 15;
    const daysLeft = payday > today ? payday - today : (31 - today + payday);
    const available = 28600 - 8300 - savingsGoal;
    const perDay = Math.max(0, Math.round(available / daysLeft));
    const perWeek = perDay * 7;

    return (
        <div className="mx-6 mt-2 mb-6 bg-[#141414] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    <span className="text-base">📅</span>
                    <div className="text-[14px] font-bold text-[#F5F5F5]" style={F}>До следующей зарплаты</div>
                </div>
                <button onClick={() => setEditingPayday(!editingPayday)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#1C1C1C]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9.5 1.5L12.5 4.5L4.5 12.5H1.5V9.5L9.5 1.5Z" stroke="#888" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            {editingPayday ? (
                <div className="mb-4 bg-[#1C1C1C] rounded-xl p-3">
                    <div className="text-[11px] text-[#555] uppercase mb-2" style={F}>День зарплаты</div>
                    <div className="flex items-center gap-3">
                        <input type="range" min={1} max={31} value={payday}
                            onChange={e => setPayday(+e.target.value)}
                            className="flex-1 h-1.5 rounded-full appearance-none bg-[#333] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C2FF02]"
                        />
                        <div className="text-[20px] font-bold text-[#C2FF02] w-10 text-right" style={F}>{payday}</div>
                    </div>
                    <div className="text-[11px] text-[#555] mt-1" style={F}>Каждый {payday}-й день месяца</div>
                    <button onClick={() => setEditingPayday(false)} className="mt-2 text-[11px] font-bold text-[#C2FF02]" style={F}>Сохранить ✓</button>
                </div>
            ) : (
                <div className="text-[12px] text-[#555] mb-4" style={F}>{daysLeft} дней · Зарплата {payday} декабря</div>
            )}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-medium text-[#444] uppercase tracking-[0.08em]" style={F}>Хочу сохранить</span>
                    <span className="text-[15px] font-bold text-[#C2FF02]" style={F}>{savingsGoal.toLocaleString()} ₽</span>
                </div>
                <input type="range" min={0} max={15000} step={500} value={savingsGoal} onChange={e => setSavingsGoal(+e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none bg-[#222] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C2FF02]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1C1C1C] rounded-xl p-3">
                    <div className="text-[10px] text-[#444] uppercase mb-1" style={F}>В день</div>
                    <div className={`text-[20px] font-bold ${perDay > 0 ? 'text-[#F5F5F5]' : 'text-[#E05252]'}`} style={F}>{perDay > 0 ? `${perDay.toLocaleString()} ₽` : 'Мало'}</div>
                </div>
                <div className="bg-[#1C1C1C] rounded-xl p-3">
                    <div className="text-[10px] text-[#444] uppercase mb-1" style={F}>В неделю</div>
                    <div className={`text-[20px] font-bold ${perWeek > 0 ? 'text-[#F5F5F5]' : 'text-[#E05252]'}`} style={F}>{perWeek > 0 ? `${perWeek.toLocaleString()} ₽` : 'Мало'}</div>
                </div>
            </div>
            {perDay <= 0 && <div className="mt-3 text-[12px] text-[#E05252]" style={F}>Слишком высокая цель. Попробуй снизить.</div>}
        </div>
    );
}

/* ── SAVINGS ─────────────────────────────────── */
function SavingsMode() {
    const goals = [
        { name: 'Отпуск в Италии', progress: 65, current: 195000, target: 300000, forecastMonths: 8 },
        { name: 'Новый iPhone', progress: 42, current: 52000, target: 125000, forecastMonths: 12 },
    ];

    return (
        <div className="mt-6 pb-6">
            <div className="mx-6 space-y-3">
                {goals.map((goal, i) => <GoalCard key={i} goal={goal} />)}
                <button className="w-full h-11 bg-[#141414] border border-dashed border-[#333333] rounded-[14px] flex items-center justify-center">
                    <span className="text-[13px] text-[#555555]" style={F}>＋ Новая цель</span>
                </button>
            </div>

            <div className="px-6 mt-6">
                <SectionLabel>Вклады и счета</SectionLabel>
                <div className="mt-3 bg-[#141414] rounded-[14px] p-4">
                    <div className="flex justify-between items-start">
                        <div className="text-[13px] text-[#C0C0C0]" style={F}>Накопительный счёт</div>
                        <div className="text-[13px] text-[#C2FF02] font-semibold" style={F}>8.5%</div>
                    </div>
                    <div className="text-[22px] font-bold text-[#F5F5F5] mt-1" style={F}>42 840 ₽</div>
                    <div className="text-[11px] text-[#555] uppercase tracking-[0.1em] mt-0.5" style={F}>Действует до 15 июня 2026</div>
                    <div className="text-[11px] text-[#3A7D44] uppercase tracking-[0.1em] mt-2" style={F}>Начислено: +842 ₽</div>
                </div>
            </div>
        </div>
    );
}

function GoalCard({ goal }: { goal: { name: string; progress: number; current: number; target: number; forecastMonths: number } }) {
    // Сколько уже откладывается в месяц (базовый темп)
    const remaining = goal.target - goal.current;
    const baseMonthly = Math.round(remaining / goal.forecastMonths);
    const [monthly, setMonthly] = useState(baseMonthly);

    // Реальный срок при новой сумме
    const months = monthly > 0 ? Math.max(1, Math.ceil(remaining / monthly)) : 999;
    // Разница с базовым темпом
    const extra = monthly - baseMonthly;

    return (
        <div className="bg-[#141414] rounded-2xl p-5">
            <div className="flex items-start justify-between">
                <div className="text-[17px] font-bold text-[#F5F5F5]" style={F}>{goal.name}</div>
                <div className="text-[17px] font-bold text-[#C2FF02]" style={F}>{goal.progress}%</div>
            </div>
            <div className="mt-3 h-1.5 bg-[#222222] rounded-full overflow-hidden">
                <div className="h-full bg-[#C2FF02]" style={{ width: `${goal.progress}%` }} />
            </div>
            <div className="mt-3 flex justify-between">
                <div>
                    <div className="text-[13px] text-[#666666]" style={F}>накоплено</div>
                    <div className="text-[15px] font-bold text-[#F5F5F5]" style={F}>{goal.current.toLocaleString()} ₽</div>
                </div>
                <div className="text-right">
                    <div className="text-[13px] text-[#666666]" style={F}>осталось</div>
                    <div className="text-[13px] text-[#888888]" style={F}>{remaining.toLocaleString()} ₽</div>
                </div>
            </div>

            {/* Ползунок — прямой контроль суммы пополнения */}
            <div className="mt-4 bg-[#1C1C1C] rounded-xl p-3.5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] text-[#555] uppercase tracking-[0.08em]" style={F}>Откладывать в месяц</span>
                    <span className="text-[16px] font-bold text-[#C2FF02]" style={F}>{monthly.toLocaleString()} ₽</span>
                </div>
                <input
                    type="range"
                    min={Math.round(baseMonthly * 0.5)}
                    max={Math.round(baseMonthly * 3)}
                    step={500}
                    value={monthly}
                    onChange={e => setMonthly(+e.target.value)}
                    className="w-full h-1.5 rounded-full appearance-none bg-[#333] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C2FF02]"
                />
                {/* Результат — понятный ответ */}
                <div className="mt-3 flex justify-between items-center">
                    <div>
                        <div className="text-[13px] font-bold text-[#F5F5F5]" style={F}>Цель через {months} мес.</div>
                        {extra !== 0 && (
                            <div className="text-[11px] mt-0.5" style={{ color: extra > 0 ? '#3A7D44' : '#FF7D32', ...F }}>
                                {extra > 0 ? `+${extra.toLocaleString()} ₽/мес — быстрее на ${goal.forecastMonths - months} мес.` : `−${Math.abs(extra).toLocaleString()} ₽/мес — медленнее на ${months - goal.forecastMonths} мес.`}
                            </div>
                        )}
                    </div>
                    {extra !== 0 && (
                        <div className="text-right">
                            <div className="text-[10px] text-[#444]" style={F}>нужно найти</div>
                            <div className="text-[12px] font-bold" style={{ color: extra > 0 ? '#C2FF02' : '#888', ...F }}>
                                {extra > 0 ? `+${extra.toLocaleString()} ₽` : `${extra.toLocaleString()} ₽`}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── ANALYTICS ───────────────────────────────── */
const monthData = [
    { month: 'Авг', income: 82000, expense: 54000 },
    { month: 'Сен', income: 85000, expense: 61000 },
    { month: 'Окт', income: 85000, expense: 58000 },
    { month: 'Ноя', income: 85000, expense: 64280 },
    { month: 'Дек', income: 85000, expense: 42000 },
];

const catData = [
    { label: 'Продукты', amount: 18200, color: '#C2FF02' },
    { label: 'Кафе', amount: 12400, color: '#FF7D32' },
    { label: 'Транспорт', amount: 4500, color: '#F0B429' },
    { label: 'Спорт', amount: 4500, color: '#3A7D44' },
    { label: 'Красота', amount: 3200, color: '#9D70C1' },
    { label: 'Одежда', amount: 2800, color: '#7B5EA7' },
];

function AnalyticsMode() {
    const maxVal = Math.max(...monthData.map(d => d.income));
    const total = catData.reduce((s, c) => s + c.amount, 0);

    return (
        <div className="mt-6 pb-6 space-y-4 px-6">
            {/* Bar chart — income vs expense */}
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

            {/* Pie chart */}
            <div className="bg-[#141414] rounded-2xl p-4">
                <div className="text-[14px] font-bold text-[#F5F5F5] mb-3" style={F}>Структура расходов</div>
                <div className="flex gap-4 items-center">
                    <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0">
                        {catData.reduce<{ element: React.ReactElement; endAngle: number }[]>((acc, cat, index) => {
                            const prevAngle = index === 0 ? -90 : acc[index - 1].endAngle;
                            const sweep = (cat.amount / total) * 360;
                            const start = prevAngle;
                            const endAngle = start + sweep;

                            const r = 40; const cx = 50; const cy = 50;
                            const x1 = cx + r * Math.cos(start * Math.PI / 180);
                            const y1 = cy + r * Math.sin(start * Math.PI / 180);
                            const x2 = cx + r * Math.cos(endAngle * Math.PI / 180);
                            const y2 = cy + r * Math.sin(endAngle * Math.PI / 180);

                            acc.push({
                                element: (
                                    <path
                                        key={cat.label}
                                        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2} Z`}
                                        fill={cat.color}
                                        opacity="0.85"
                                    />
                                ),
                                endAngle
                            });

                            return acc;
                        }, []).map(item => item.element)}
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
        </div>
    );
}
