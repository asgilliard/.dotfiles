import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';
import { SmartTip } from '../common/SmartTip';
import { SectionLabel } from '../common/SectionLabel';
import { useCategoryContext, CATEGORIES } from '../../context/CategoryContext';

const F = { fontFamily: "'Onest', sans-serif" };

const upcomingPayments = [
  { icon: '🏦', name: 'Кредит ОТП', meta: 'Автосписание · 17 дек', amount: '4 200 ₽', warning: true },
  { icon: '🏠', name: 'Коммунальные', meta: 'Автосписание · 20 дек', amount: '3 500 ₽', warning: false },
  { icon: '📱', name: 'Мобильная связь', meta: 'Автосписание · 22 дек', amount: '600 ₽', warning: false },
];

const recentTransactions = [
  { icon: '🛒', name: 'Пятёрочка', meta: 'Сегодня, 14:22', amount: '-1 247 ₽', type: 'expense' as const },
  { icon: '☕', name: 'Кофе Хауз', meta: 'Сегодня, 12:15', amount: '-450 ₽', type: 'expense' as const },
  { icon: '💰', name: 'Зарплата', meta: 'Вчера, 10:00', amount: '+85 000 ₽', type: 'income' as const },
  { icon: '🚕', name: 'Яндекс Такси', meta: 'Вчера, 21:30', amount: '-340 ₽', type: 'expense' as const },
  { icon: '🍕', name: 'Додо Пицца', meta: '13 дек, 19:45', amount: '-1 890 ₽', type: 'expense' as const },
];

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9.5 1.5L12.5 4.5L4.5 12.5H1.5V9.5L9.5 1.5Z" stroke="#666" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<string | null>(null);
  const { txCategories, setTxCategory, getCategory } = useCategoryContext();

  return (
    <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen">
      <StatusBar />

      {/* Header */}
      <div className="h-11 px-6 flex items-center justify-between">
        <div className="text-[11px] font-semibold text-[#444444] uppercase tracking-[0.12em]" style={F}>ОТП</div>
        <div className="flex items-center gap-3">
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative w-8 h-8 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#555555]" strokeWidth={1.5} />
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#E05252] rounded-full flex items-center justify-center">
              <span className="text-[9px] font-bold text-white" style={F}>2</span>
            </div>
          </button>
          <div className="w-[30px] h-[30px] rounded-full bg-[#1C1C1C] border border-[#2A2A2A] flex items-center justify-center">
            <span className="text-[11px] font-semibold text-[#666666]" style={F}>АК</span>
          </div>
        </div>
      </div>

      {/* Notification dropdown */}
      {notifOpen && (
        <div className="mx-6 mb-2 bg-[#1C1C1C] border border-[#2A2A2A] rounded-2xl overflow-hidden">
          {[
            { icon: '⚠️', text: 'Завтра платёж 4 200 ₽ — не хватает средств' },
            { icon: '🎁', text: '+1% к ставке накопительного счёта при оформлении кредитной карты' },
          ].map((n, i) => (
            <div key={i} className="px-4 py-3 flex gap-3 items-start border-b border-[#222] last:border-0">
              <span className="text-sm mt-0.5 flex-shrink-0">{n.icon}</span>
              <span className="text-[12px] text-[#C0C0C0] leading-relaxed" style={F}>{n.text}</span>
            </div>
          ))}
          <button onClick={() => { setNotifOpen(false); navigate('/notifications'); }}
            className="w-full py-2.5 text-[11px] font-bold text-center text-[#C2FF02]" style={F}>
            Все уведомления →
          </button>
        </div>
      )}

      {/* Balance */}
      <div className="pt-10 px-6">
        <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.1em] mb-2" style={F}>Общий баланс</div>
        <div className="flex items-baseline gap-2">
          <span className="text-[52px] leading-none text-[#F5F5F5] font-black" style={F}>84 320</span>
          <span className="text-2xl text-[#555555]" style={F}>₽</span>
        </div>
        <div className="text-[13px] text-[#3A7D44] mt-2" style={F}>+12 400 ₽ сегодня</div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-8 flex gap-2.5">
        <button className="flex-1 h-11 bg-[#C2FF02] rounded-xl flex items-center justify-center active:scale-[0.98] transition-transform">
          <span className="text-[12px] font-bold text-[#000000]" style={F}>Перевести</span>
        </button>
        <button className="flex-1 h-11 bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl flex items-center justify-center active:scale-[0.98] transition-transform">
          <span className="text-[12px] font-semibold text-[#888888]" style={F}>Оплатить</span>
        </button>
      </div>

      <div className="h-px bg-[#1E1E1E] mx-6 my-5" />

      {/* Upcoming Payments */}
      <div className="px-6">
        <SectionLabel>Ближайшие платежи</SectionLabel>
        <div className="mt-3">
          {upcomingPayments.map((p, i) => (
            <div key={i} className="py-3 border-b border-[#161616] flex items-center gap-3">
              <div className="w-[34px] h-[34px] rounded-[10px] bg-[#181818] flex items-center justify-center flex-shrink-0">
                <span className="text-sm">{p.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[#C0C0C0]" style={F}>{p.name}</div>
                <div className="text-[10px] text-[#444444] mt-0.5" style={F}>{p.meta}</div>
              </div>
              <div className="flex items-center gap-2">
                {p.warning && <div className="w-1.5 h-1.5 rounded-full bg-[#FF7D32] flex-shrink-0" />}
                <span className="text-[13px] font-semibold text-[#C2FF02]" style={F}>{p.amount}</span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/calendar')}
          className="text-[13px] text-[#555555] mt-3 flex items-center gap-1" style={F}>
          Итого в декабре: 18 400 ₽ <span>→</span>
        </button>
      </div>

      <div className="h-px bg-[#1E1E1E] mx-6 my-5" />

      {/* Recent Transactions */}
      <div className="px-6">
        <SectionLabel>Последние операции</SectionLabel>
        <div className="mt-3">
          {recentTransactions.map((tx, i) => {
            const catId = txCategories[tx.name];
            const cat = catId ? getCategory(catId) : undefined;
            const isEditing = editingTx === tx.name;

            return (
              <div key={i} className="border-b border-[#161616]">
                <div className="py-3 flex items-center gap-3">
                  <div className="w-[34px] h-[34px] rounded-[10px] bg-[#181818] flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">{tx.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#C0C0C0]" style={F}>{tx.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="text-[10px] text-[#444444]" style={F}>{tx.meta}</div>
                      {cat && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded" style={{ background: cat.color + '22' }}>
                          <span className="text-[10px]">{cat.emoji}</span>
                          <span className="text-[10px] font-medium" style={{ color: cat.color, ...F }}>{cat.label}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {tx.type === 'expense' && (
                      <button
                        onClick={() => setEditingTx(isEditing ? null : tx.name)}
                        className="w-6 h-6 flex items-center justify-center rounded opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <PencilIcon />
                      </button>
                    )}
                    <span className="text-[13px] font-semibold"
                      style={{ color: tx.type === 'income' ? '#3A7D44' : '#888888', ...F }}>
                      {tx.amount}
                    </span>
                  </div>
                </div>

                {/* Category picker — inline dropdown */}
                {isEditing && (
                  <div className="pb-3 pl-[46px]">
                    <div className="text-[10px] text-[#444] uppercase mb-2" style={F}>Категория</div>
                    <div className="flex flex-wrap gap-1.5">
                      {CATEGORIES.map(c => (
                        <button
                          key={c.id}
                          onClick={() => { setTxCategory(tx.name, c.id); setEditingTx(null); }}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all active:scale-95"
                          style={{
                            background: txCategories[tx.name] === c.id ? c.color : c.color + '18',
                            color: txCategories[tx.name] === c.id ? '#000' : c.color,
                          }}
                        >
                          <span>{c.emoji}</span>
                          <span style={F}>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <SmartTip text="В кафе и ресторанах в этом месяце" boldText="уже 8 400 ₽ — на 60% больше ноября." show={true} />
      <div className="h-6" />
    </div>
  );
}
