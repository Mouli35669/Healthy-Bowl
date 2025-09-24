import React from 'react';
import type { Page } from '../types';
import { Page as PageEnum } from '../types';
import { HomeIcon, MenuIcon, CartIcon } from './Icons';

interface BottomNavProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
    cartCount: number;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
    cartCount?: number;
}> = ({ icon, label, isActive, onClick, cartCount }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200 active:animate-bounce-in ${isActive ? 'text-indigo-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-green-400'}`}>
        <div className="relative">
            {icon}
            {cartCount !== undefined && cartCount > 0 && (
                <span className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full">
                    {cartCount}
                </span>
            )}
        </div>
        <span className={`mt-1 text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
    </button>
);

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate, cartCount }) => (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-white/30 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-lg border-t border-white/30 dark:border-white/10 md:hidden transition-colors duration-300">
        <nav className="flex justify-around max-w-7xl mx-auto">
            <NavItem
                icon={<HomeIcon />}
                label="Home"
                isActive={activePage === PageEnum.HOME}
                onClick={() => onNavigate(PageEnum.HOME)}
            />
            <NavItem
                icon={<MenuIcon />}
                label="Menu"
                isActive={activePage === PageEnum.MENU}
                onClick={() => onNavigate(PageEnum.MENU)}
            />
            <NavItem
                icon={<CartIcon />}
                label="Cart"
                isActive={activePage === PageEnum.CART}
                onClick={() => onNavigate(PageEnum.CART)}
                cartCount={cartCount}
            />
        </nav>
    </div>
);