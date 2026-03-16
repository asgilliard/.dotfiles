import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';

type NotificationType = 'neutral' | 'warning' | 'success';

interface Notification {
  type: NotificationType;
  time: string;
  title: string;
  body: string;
  actions: { label: string; primary?: boolean }[];
}

export function Notifications() {
  const navigate = useNavigate();

  const notifications: Notification[] = [
    {
      type: 'warning',
      time: '1 день',
      title: 'Завтра платёж, денег не хватает',
      body: '4 200 ₽ · На карте: 2 100 ₽ · Не хватает 2 100 ₽',
      actions: [
        { label: 'Пополнить карту', primary: true },
        { label: 'Перенести платёж' },
      ],
    },
    {
      type: 'neutral',
      time: '7 дней',
      title: 'Платёж по кредиту через 7 дней',
      body: '17 декабря · 4 200 ₽ · На карте: 9 840 ₽ ✓',
      actions: [
        { label: 'Оплатить заранее', primary: true },
        { label: 'Изменить дату' },
      ],
    },
    {
      type: 'success',
      time: '2 часа',
      title: 'Платёж прошёл ✓',
      body: 'Кредит ОТП · Списано 4 200 ₽ · Следующий 17 янв',
      actions: [{ label: 'Посмотреть историю' }],
    },
    {
      type: 'neutral',
      time: '3 дня',
      title: 'Подписка World Class не используется',
      body: 'Последнее посещение — 45 дней назад · 4 500 ₽/мес',
      actions: [
        { label: 'Отключить', primary: true },
        { label: 'Оставить' },
      ],
    },
  ];

  return (
    <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen pb-6">
      <StatusBar />

      <div className="h-11 px-6 flex items-center justify-between">
        <button className="text-[#555555]" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-[17px] font-semibold text-[#F5F5F5]" style={{ fontFamily: "'Onest', sans-serif" }}>
          Уведомления
        </div>
        <div className="w-5" />
      </div>

      <div className="px-6 mt-6 space-y-3">
        {notifications.map((notification, index) => (
          <NotificationCard key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ notification }: { notification: Notification }) {
  const borderColors: Record<string, string> = {
    neutral: '#C2FF02',
    warning: '#FF7D32',
    success: '#3A7D44',
  };

  const titleColors: Record<string, string> = {
    neutral: '#F5F5F5',
    warning: '#FF7D32',
    success: '#3A7D44',
  };

  const primaryButtonColors: Record<string, { bg: string; text: string }> = {
    neutral: { bg: '#C2FF02', text: '#000000' },
    warning: { bg: '#FF7D32', text: '#000000' },
    success: { bg: '#3A7D44', text: '#F5F5F5' },
  };

  return (
    <div
      className="bg-[#1C1C1C] rounded-2xl p-3.5 px-4"
      style={{ borderLeft: `3px solid ${borderColors[notification.type]}` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-[#C2FF02] rounded flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#000000]">О</span>
          </div>
          <span className="text-[11px] font-medium text-[#666666] uppercase tracking-[0.1em]" style={{ fontFamily: "'Onest', sans-serif" }}>
            ОТП Банк
          </span>
        </div>
        <div className="text-[11px] font-medium text-[#444444] uppercase tracking-[0.1em]" style={{ fontFamily: "'Onest', sans-serif" }}>
          {notification.time}
        </div>
      </div>

      <div
        className="text-[13px] font-semibold mt-1.5"
        style={{ fontFamily: "'Onest', sans-serif", color: titleColors[notification.type] }}
      >
        {notification.title}
      </div>

      <div className="text-[12px] text-[#666666] mt-1 leading-relaxed" style={{ fontFamily: "'Onest', sans-serif" }}>
        {notification.body}
      </div>

      <div className="flex gap-2 mt-3">
        {notification.actions.map((action, actionIndex) => {
          const isPrimary = action.primary;
          const colors = isPrimary
            ? primaryButtonColors[notification.type]
            : { bg: '#222222', text: '#666666' };
          return (
            <button
              key={actionIndex}
              className="px-3 py-1.5 rounded-lg text-[11px] font-semibold active:scale-[0.97] transition-transform"
              style={{ backgroundColor: colors.bg, color: colors.text, fontFamily: "'Onest', sans-serif" }}
            >
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
