import React from 'react';
import { DAILY_MENU } from './constants';
import { CalendarIcon } from './Icons';

export const MenuPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Weekly Menu</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Here's what you can expect this week. Sunday is our holiday!
        </p>
      </div>

      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
        {DAILY_MENU.map((menuItem, index) => (
          <div
            key={menuItem.day}
            className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl p-5 animate-fade-in-up transition-transform duration-300 hover:-translate-y-1 shadow-2xl"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-500/10 dark:bg-green-500/20 rounded-full mr-3">
                <CalendarIcon className="w-5 h-5 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{menuItem.day}</h3>
            </div>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {menuItem.items.map((item) => (
                <li key={item.name} className="flex">
                  <span className="text-indigo-500 dark:text-green-400 mr-2 mt-0.5">✓</span>
                  <div>
                    <p className="text-slate-800 dark:text-slate-100 font-medium">{item.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer with contact */}
      <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
        <p className="font-medium">Need help? Contact Us</p>
        <p>+91 73829 85957 / +91 89774 46635</p>
      </div>
    </div>
  );
};
