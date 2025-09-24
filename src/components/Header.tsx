import React from 'react';
import type { Page } from '../types';
import { Page as PageEnum } from '../types';

type Theme = 'light' | 'dark';

interface HeaderProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
    cartCount: number;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const NavItem: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    cartCount?: number;
}> = ({ label, isActive, onClick, cartCount }) => (
    <button onClick={onClick} className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors hover:animate-bounce-in ${isActive ? 'bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10'}`}>
        {label}
        {cartCount !== undefined && cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full">
                {cartCount}
            </span>
        )}
    </button>
);

const ThemeToggle: React.FC<{ theme: Theme; setTheme: (theme: Theme) => void }> = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-yellow-300 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300"
            aria-label="Toggle theme"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 transition-transform duration-500 ${theme === 'dark' ? 'transform rotate-45 scale-0' : 'transform rotate-0 scale-100'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.95a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zm-2.12-10.607a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 absolute transition-transform duration-500 ${theme === 'dark' ? 'transform rotate-0 scale-100' : 'transform -rotate-45 scale-0'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
        </button>
    );
};


export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate, cartCount, theme, setTheme }) => {
    return (
        <header className="sticky top-0 z-10 bg-gradient-to-b from-white/30 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-lg p-4 flex justify-between items-center border-b border-white/30 dark:border-white/10 transition-colors duration-300">
            <div className="flex items-center gap-3">
                {/* CUSTOMIZE: Change your logo here */}
                <span className="text-3xl" role="img" aria-label="crown logo">👑</span>
                <div>
                    {/* CUSTOMIZE: Change your brand name here */}
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">RK HEALTHY FOODS</h1>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-green-400">» HEALTHY BOWL «</p>
                </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
                 <NavItem
                    label="Home"
                    isActive={activePage === PageEnum.HOME}
                    onClick={() => onNavigate(PageEnum.HOME)}
                />
                <NavItem
                    label="Menu"
                    isActive={activePage === PageEnum.MENU}
                    onClick={() => onNavigate(PageEnum.MENU)}
                />
                <NavItem
                    label="Cart"
                    isActive={activePage === PageEnum.CART}
                    onClick={() => onNavigate(PageEnum.CART)}
                    cartCount={cartCount}
                />
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </nav>
        </header>
    );
};