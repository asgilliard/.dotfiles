import { useNavigate } from 'react-router';
import { Calendar, ArrowLeft } from 'lucide-react';
import { StatusBar } from '../common/StatusBar';
import { useCategoryContext } from '../../context/CategoryContext';

const F = { fontFamily: "'Onest', sans-serif" };

// Аккуратные круги/овалы с интересной компоновкой
// Каждый — это circle или ellipse с текстом поверх
// Компоновка: большой зелёный слева-центр, средний оранжевый справа,
// малый фиолетовый снизу-слева, средний синий снизу-справа,
// здоровье — красный сверху-справа
const BLOBS = [
    {
        id: 'food',
        label: 'Продукты',
        spent: '18 200 ₽', baseSpent: 18200,
        // Большой, зелёный — доминирующий
        cx: 130, cy: 180, rx: 115, ry: 105,
        color: '#C2FF02', colorStop: '#749901',
        gradAngle: '135deg',
        fontSize: 18, amountSize: 13,
    },
    {
        id: 'sport',
        label: 'Спорт',
        spent: '4 500 ₽', baseSpent: 4500,
        // Средний, оранжевый — правее и выше
        cx: 290, cy: 130, rx: 80, ry: 72,
        color: '#FF7D32', colorStop: '#994B1E',
        gradAngle: '120deg',
        fontSize: 16, amountSize: 12,
    },
    {
        id: 'fashion',
        label: 'Мода',
        spent: '2 800 ₽', baseSpent: 2800,
        // Малый, фиолетовый — снизу слева
        cx: 70, cy: 340, rx: 60, ry: 54,
        color: '#9D70C1', colorStop: '#4A355B',
        gradAngle: '150deg',
        fontSize: 14, amountSize: 11,
    },
    {
        id: 'beauty',
        label: 'Красота',
        spent: '3 200 ₽', baseSpent: 3200,
        // Средне-малый — снизу правее центра
        cx: 270, cy: 310, rx: 88, ry: 78,
        color: '#7B5EA7', colorStop: '#3A2A5A',
        gradAngle: '160deg',
        fontSize: 15, amountSize: 11,
    },
    {
        id: 'health',
        label: 'Здоровье',
        spent: '2 100 ₽', baseSpent: 2100,
        // Малый — верхний правый угол
        cx: 340, cy: 260, rx: 55, ry: 50,
        color: '#3A7D44', colorStop: '#1A3A1A',
        gradAngle: '120deg',
        fontSize: 13, amountSize: 10,
    },
];

export function Lifestyle() {
    const navigate = useNavigate();
    const { getCategoryTotal } = useCategoryContext();

    return (
        <div className="max-w-[390px] mx-auto bg-[#0D0D0D] min-h-screen">
            <StatusBar />

            {/* Header */}
            <div className="px-5 pt-2 flex items-center justify-between">
                <button onClick={() => navigate('/')} className="w-8 h-8 flex items-center justify-center text-[#555]">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-[17px] font-bold text-[#F5F5F5]" style={F}>Образ жизни</div>
                {/* Calendar button */}
                <button
                    onClick={() => navigate('/calendar')}
                    className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-[#C2FF02] transition-colors"
                >
                    <Calendar className="w-5 h-5" />
                </button>
            </div>

            {/* Title */}
            <div className="px-5 mt-2">
                <div className="text-[11px] font-medium text-[#444] uppercase tracking-[0.1em]" style={F}>декабрь 2025</div>
                <div className="text-[32px] font-black text-[#F5F5F5] leading-tight mt-0.5" style={F}>
                    Качок 💪
                </div>
                <div className="text-[13px] text-[#555] mt-0.5" style={F}>Нажми на категорию чтобы открыть</div>
            </div>

            {/* SVG blob canvas — аккуратные овалы с текстом */}
            <div className="relative mt-2" style={{ height: '430px' }}>
                <svg
                    width="390"
                    height="430"
                    viewBox="0 0 390 430"
                    fill="none"
                    className="absolute inset-0"
                >
                    <defs>
                        {BLOBS.map(b => (
                            <radialGradient
                                key={`g-${b.id}`}
                                id={`g-${b.id}`}
                                cx="40%" cy="35%"
                                r="70%"
                                gradientUnits="objectBoundingBox"
                            >
                                <stop offset="0%" stopColor={b.color} stopOpacity="0.95" />
                                <stop offset="100%" stopColor={b.colorStop} stopOpacity="0.8" />
                            </radialGradient>
                        ))}
                    </defs>

                    {BLOBS.map(b => (
                        <g key={b.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/category/${b.id}`)}>
                            {/* Тень/свечение */}
                            <ellipse
                                cx={b.cx} cy={b.cy}
                                rx={b.rx + 6} ry={b.ry + 6}
                                fill={b.color}
                                opacity="0.12"
                            />
                            {/* Основной овал */}
                            <ellipse
                                cx={b.cx} cy={b.cy}
                                rx={b.rx} ry={b.ry}
                                fill={`url(#g-${b.id})`}
                            />
                            {/* Метка — горизонтально, по центру */}
                            <text
                                x={b.cx} y={b.cy - 8}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="white"
                                fontSize={b.fontSize}
                                fontWeight="700"
                                fontFamily="Onest, sans-serif"
                            >
                                {b.label}
                            </text>
                            {/* Сумма — синкается с транзакциями */}
                            <text
                                x={b.cx} y={b.cy + b.fontSize}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="rgba(255,255,255,0.65)"
                                fontSize={b.amountSize}
                                fontFamily="Onest, sans-serif"
                            >
                                {(() => {
                                    const txTotal = getCategoryTotal(b.id);
                                    const total = b.baseSpent + txTotal;
                                    return total >= 1000 ? `${(total / 1000).toFixed(1)}к ₽` : `${total} ₽`;
                                })()}
                            </text>
                        </g>
                    ))}
                </svg>

                {/* + кнопка добавления */}
                <button
                    className="absolute bottom-4 right-5 w-12 h-12 rounded-full flex items-center justify-center border border-[#333] bg-[rgba(255,255,255,0.06)]"
                    onClick={() => { }}
                >
                    <span className="text-2xl text-[#555] leading-none">+</span>
                </button>
            </div>
        </div>
    );
}
