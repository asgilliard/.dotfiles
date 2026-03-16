import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export const CATEGORIES = [
    { id: 'food', emoji: '🛒', label: 'Продукты', color: '#C2FF02' },
    { id: 'cafe', emoji: '☕', label: 'Кафе', color: '#FF7D32' },
    { id: 'sport', emoji: '🏋️', label: 'Спорт', color: '#3A7D44' },
    { id: 'transport', emoji: '🚕', label: 'Транспорт', color: '#F0B429' },
    { id: 'beauty', emoji: '💄', label: 'Красота', color: '#9D70C1' },
    { id: 'fashion', emoji: '👗', label: 'Мода', color: '#7B5EA7' },
    { id: 'health', emoji: '💊', label: 'Здоровье', color: '#3A7D44' },
    { id: 'fun', emoji: '🎬', label: 'Развлечения', color: '#E05252' },
];

const DEFAULT_MAP: Record<string, string> = {
    'Пятёрочка': 'food',
    'Кофе Хауз': 'cafe',
    'Зарплата': '',
    'Яндекс Такси': 'transport',
    'Додо Пицца': 'cafe',
};

const TX_AMOUNTS: Record<string, number> = {
    'Пятёрочка': 1247, 'Кофе Хауз': 450,
    'Яндекс Такси': 340, 'Додо Пицца': 1890,
};

interface Ctx {
    txCategories: Record<string, string>;
    setTxCategory: (name: string, catId: string) => void;
    getCategory: (catId: string) => typeof CATEGORIES[0] | undefined;
    getCategoryTotal: (catId: string) => number;
}

const CategoryContext = createContext<Ctx | null>(null);

export function CategoryProvider({ children }: { children: ReactNode }) {
    const [txCategories, setMap] = useState<Record<string, string>>(DEFAULT_MAP);

    const setTxCategory = (name: string, catId: string) =>
        setMap(prev => ({ ...prev, [name]: catId }));

    const getCategory = (catId: string) => CATEGORIES.find(c => c.id === catId);

    const getCategoryTotal = (catId: string) =>
        Object.entries(txCategories)
            .filter(([, cid]) => cid === catId)
            .reduce((sum, [name]) => sum + (TX_AMOUNTS[name] ?? 0), 0);

    return (
        <CategoryContext.Provider value={{ txCategories, setTxCategory, getCategory, getCategoryTotal }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategoryContext() {
    const ctx = useContext(CategoryContext);
    if (!ctx) throw new Error('useCategoryContext outside CategoryProvider');
    return ctx;
}
