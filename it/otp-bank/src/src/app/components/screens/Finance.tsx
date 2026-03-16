import { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';
import { TransactionRow } from '../common/TransactionRow';
import { SectionLabel } from '../common/SectionLabel';

export function Finance() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'history' | 'plans'>('history');

  const todayTransactions = [
    { icon: '🛒', name: 'Пятёрочка', meta: 'Сегодня, 14:22', amount: '-1 247 ₽', type: 'expense' as const },
    { icon: '☕', name: 'Кофе Хауз', meta: 'Сегодня, 12:15', amount: '-450 ₽', type: 'expense' as const },
  ];

  const yesterdayTransactions = [
    { icon: '💰', name: 'Зарплата', meta: 'Вчера, 10:00', amount: '+85 000 ₽', type: 'income' as const },
    { icon: '🚕', name: 'Яндекс Такси', meta: 'Вчера, 21:30', amount: '-340 ₽', type: 'expense' as const },
  ];

  return (
    <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen pb-6">
      <StatusBar />

      {/* Header */}
      <div className="h-11 px-6 flex items-center justify-between">
        <button className="text-[#555555]" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-[17px] font-semibold text-[#F5F5F5]" style={{ fontFamily: "'Onest', sans-serif" }}>
          Финансы
        </div>
        <button onClick={() => navigate('/calendar')} className="text-[#555555]">
          <CalendarIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-6 flex gap-2">
        <button
          onClick={() => setActiveTab('history')}
          className={`px-5 py-2 rounded-[20px] text-[13px] font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-[#C2FF02] text-[#000000]'
              : 'bg-transparent text-[#555555]'
          }`}
          style={{ fontFamily: "'Onest', sans-serif" }}
        >
          История
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`px-5 py-2 rounded-[20px] text-[13px] font-medium transition-colors ${
            activeTab === 'plans'
              ? 'bg-[#C2FF02] text-[#000000]'
              : 'bg-transparent text-[#555555]'
          }`}
          style={{ fontFamily: "'Onest', sans-serif" }}
        >
          Планы
        </button>
      </div>

      {activeTab === 'history' ? (
        <div className="mt-6">
          {/* Today */}
          <div className="px-6">
            <SectionLabel>Сегодня</SectionLabel>
            <div className="mt-3">
              {todayTransactions.map((transaction, index) => (
                <TransactionRow key={index} {...transaction} />
              ))}
            </div>
          </div>

          {/* Yesterday */}
          <div className="px-6 mt-6">
            <SectionLabel>Вчера</SectionLabel>
            <div className="mt-3">
              {yesterdayTransactions.map((transaction, index) => (
                <TransactionRow key={index} {...transaction} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 mt-6">
          <div className="bg-[#141414] rounded-2xl p-6 text-center">
            <div className="text-[44px] mb-2">📅</div>
            <div className="text-[17px] font-semibold text-[#F5F5F5] mb-2" style={{ fontFamily: "'Onest', sans-serif" }}>
              Планируй платежи
            </div>
            <div className="text-[13px] text-[#666666] mb-4" style={{ fontFamily: "'Onest', sans-serif" }}>
              Смотри календарь автоплатежей и управляй регулярными списаниями
            </div>
            <button
              onClick={() => navigate('/calendar')}
              className="w-full h-11 bg-[#C2FF02] rounded-xl text-[12px] font-semibold text-[#000000]"
              style={{ fontFamily: "'Onest', sans-serif" }}
            >
              Открыть календарь
            </button>
          </div>
        </div>
      )}
    </div>
  );
}