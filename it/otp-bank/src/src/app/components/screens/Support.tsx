import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';

const FONT_H = { fontFamily: "'Onest', sans-serif" };
const FONT_B = { fontFamily: "'Onest', sans-serif" };

const quickReplies = ['Проблема с переводом', 'Заблокировали карту', 'Вопрос по кредиту', 'Другое'];

export function Support() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Привет! Я помогу решить любой вопрос. Что случилось?' },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: 'user', text }, { from: 'bot', text: 'Понял, передаю специалисту. Ожидайте — ответим в течение 2 минут.' }]);
    setMsg('');
  };

  return (
    <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen flex flex-col">
      <StatusBar />
      <div className="h-11 px-5 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-[#555]"><ArrowLeft className="w-5 h-5" /></button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#C2FF02] rounded-full flex items-center justify-center">
            <span className="text-[12px] font-bold text-[#000]" style={FONT_H}>О</span>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-[#F5F5F5]" style={FONT_H}>ОТП Поддержка</div>
            <div className="text-[10px] text-[#3A7D44]" style={FONT_B}>Онлайн</div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-4 space-y-3 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[75%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed"
              style={{
                background: m.from === 'user' ? '#C2FF02' : '#141414',
                color: m.from === 'user' ? '#000' : '#C0C0C0',
                ...FONT_B
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        {/* Quick replies */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2">
            {quickReplies.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                className="px-3 py-1.5 bg-[#141414] border border-[#2A2A2A] rounded-xl text-[11px] text-[#888] active:bg-[#1C1C1C]"
                style={FONT_B}
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 pb-6 flex gap-2">
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(msg)}
          placeholder="Написать сообщение..."
          className="flex-1 h-11 bg-[#141414] border border-[#2A2A2A] rounded-xl px-4 text-[13px] text-[#F5F5F5] outline-none placeholder:text-[#444]"
          style={FONT_B}
        />
        <button
          onClick={() => send(msg)}
          className="w-11 h-11 bg-[#C2FF02] rounded-xl flex items-center justify-center active:scale-95"
        >
          <Send className="w-4 h-4 text-[#000]" />
        </button>
      </div>
    </div>
  );
}
