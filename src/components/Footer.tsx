
import React from 'react';
import { PhoneIcon } from './Icons';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-transparent p-4 text-center w-full">
            <div className="max-w-7xl mx-auto">
                <h3 className="font-semibold text-slate-600 dark:text-slate-300 mb-2 text-sm">Need help? Contact Us</h3>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-x-3 gap-y-1 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
                    <PhoneIcon className="w-5 h-5 mb-1 sm:mb-0" />
                    {/* CUSTOMIZE: Update contact phone numbers here */}
                    <a href="tel:+917382985957" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-green-400 font-medium transition-colors">+91 73829 85957</a>
                    <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">/</span>
                    <a href="tel:+918977446635" className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-green-400 font-medium transition-colors">+91 89774 46635</a>
                </div>
            </div>
        </footer>
    );
};