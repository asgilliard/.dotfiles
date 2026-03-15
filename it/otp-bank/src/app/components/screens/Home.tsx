import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';
import { TransactionRow } from '../common/TransactionRow';
import { SmartTip } from '../common/SmartTip';
import { SectionLabel } from '../common/SectionLabel';

export function Home() {
  const navigate = useNavigate();

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

  return (
    <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen">
      <StatusBar />

      {/* Header */}
      <div className="h-11 px-6 flex items-center justify-between">
        <div className="text-[11px] font-semibold text-[#444444] uppercase tracking-[0.12em]" style={{ fontFamily: 'Manrope' }}>
          ОТП
        </div>
        <div className="w-[30px] h-[30px] rounded-full bg-[#1C1C1C] border border-[#2A2A2A] flex items-center justify-center">
          <span className="text-[11px] font-semibold text-[#666666]" style={{ fontFamily: 'Manrope' }}>АК</span>
        </div>
      </div>

      {/* Balance Zone */}
      <div className="pt-10 px-6">
        <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.1em] mb-2" style={{ fontFamily: 'Manrope' }}>
          Общий баланс
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[52px] leading-none text-[#E8E8E8] font-normal italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
            84 320
          </span>
          <span className="text-2xl text-[#555555]" style={{ fontFamily: 'Manrope' }}>₽</span>
        </div>
        <div className="text-[13px] text-[#3A7D44] mt-2" style={{ fontFamily: 'Manrope' }}>
          +12 400 ₽ сегодня
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-8 flex gap-2.5">
        <button className="flex-1 h-11 bg-[#C8F135] rounded-xl flex items-center justify-center active:scale-[0.98] transition-transform">
          <span className="text-[12px] font-semibold text-[#000000] tracking-[0.04em]" style={{ fontFamily: 'Manrope' }}>
            Перевести
          </span>
        </button>
        <button className="flex-1 h-11 bg-[#1C1C1C] border border-[#2A2A2A] rounded-xl flex items-center justify-center active:scale-[0.98] transition-transform">
          <span className="text-[12px] font-semibold text-[#888888]" style={{ fontFamily: 'Manrope' }}>
            Оплатить
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#1E1E1E] mx-6 my-5" />

      {/* Upcoming Payments Widget */}
      <div className="px-6">
        <SectionLabel>Ближайшие платежи</SectionLabel>
        <div className="mt-3 space-y-0">
          {upcomingPayments.map((payment, index) => (
            <div key={index} className="py-3 border-b border-[#161616] flex items-center gap-3">
              <div className="w-[34px] h-[34px] rounded-[10px] bg-[#181818] flex items-center justify-center flex-shrink-0">
                <span className="text-sm">{payment.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-[#C0C0C0]" style={{ fontFamily: 'Manrope' }}>{payment.name}</div>
                <div className="text-[10px] text-[#444444] mt-0.5" style={{ fontFamily: 'Manrope' }}>{payment.meta}</div>
              </div>
              <div className="flex items-center gap-2">
                {payment.warning && <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C1A] flex-shrink-0" />}
                <span className="text-[13px] font-semibold text-[#C8F135]" style={{ fontFamily: 'Manrope' }}>{payment.amount}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/calendar')}
          className="text-[13px] text-[#555555] mt-3 flex items-center gap-1 active:text-[#888888] transition-colors"
          style={{ fontFamily: 'Manrope' }}
        >
          Итого в декабре: 18 400 ₽ <span>→</span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#1E1E1E] mx-6 my-5" />

      {/* Recent Transactions */}
      <div className="px-6">
        <SectionLabel>Последние операции</SectionLabel>
        <div className="mt-3">
          {recentTransactions.map((transaction, index) => (
            <TransactionRow key={index} {...transaction} />
          ))}
        </div>
      </div>

      {/* Smart Tip — контекстный, после крупных трат на кафе */}
      <SmartTip
        text="В кафе и ресторанах в этом месяце"
        boldText="уже 8 400 ₽ — на 60% больше ноября."
        show={true}
      />

      {/* Cashback gift tip */}
      <div className="mx-6 mt-3 bg-[#141414] border border-[#1A2A1A] rounded-[14px] p-3.5 px-4 flex gap-3">
        <div className="text-base flex-shrink-0">🎁</div>
        <div className="text-[12px] text-[#666666] leading-relaxed" style={{ fontFamily: 'Manrope' }}>
          <span className="font-semibold text-[#C8F135]">Подарок:</span> +1% к накопительному счёту на следующий месяц. Активировать?
          <button className="block text-[11px] font-semibold text-[#C8F135] mt-1">Активировать →</button>
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}
