import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { StatusBar } from '../common/StatusBar';
import { SectionLabel } from '../common/SectionLabel';

export function Profile() {
    const navigate = useNavigate();

    const menuItems = [
        { icon: '🔔', label: 'Уведомления', path: '/notifications' },
        { icon: '💳', label: 'Карты и счета' },
        { icon: '⚙️', label: 'Настройки' },
        { icon: '🔒', label: 'Безопасность' },
        { icon: '❓', label: 'Помощь' },
    ];

    return (
        <div className="max-w-[390px] mx-auto bg-[#0A0A0A] min-h-screen pb-6">
            <StatusBar />

            {/* Header */}
            <div className="h-11 px-6 flex items-center justify-between">
                <button className="text-[#555555]" onClick={() => navigate('/')}>
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-[17px] font-semibold text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>
                    Профиль
                </div>
                <div className="w-5" />
            </div>

            {/* Profile Info */}
            <div className="px-6 mt-8 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#1C1C1C] border-2 border-[#2A2A2A] flex items-center justify-center">
                    <span className="text-2xl font-semibold text-[#666666]" style={{ fontFamily: 'Manrope' }}>
                        АК
                    </span>
                </div>
                <div className="text-[22px] font-semibold text-[#E8E8E8] mt-4" style={{ fontFamily: 'Manrope' }}>
                    Александр Ковалёв
                </div>
                <div className="text-[13px] text-[#666666] mt-1" style={{ fontFamily: 'Manrope' }}>
                    +7 (999) 123-45-67
                </div>
            </div>

            {/* Menu */}
            <div className="px-6 mt-8">
                <SectionLabel>Настройки</SectionLabel>
                <div className="mt-3 bg-[#141414] rounded-2xl overflow-hidden">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => item.path && navigate(item.path)}
                            className="w-full px-4 py-4 flex items-center gap-3 border-b border-[#1A1A1A] last:border-b-0 hover:bg-[#181818] transition-colors"
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="flex-1 text-left text-[14px] text-[#E8E8E8]" style={{ fontFamily: 'Manrope' }}>
                                {item.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-[#444444]" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Logout */}
            <div className="px-6 mt-6">
                <button className="w-full h-11 bg-[#141414] rounded-xl text-[14px] text-[#E05252] font-medium">
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
}
