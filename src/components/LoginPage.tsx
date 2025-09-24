

import React, { useState } from 'react';
import { ArrowLeftIcon, LockIcon } from './Icons';
import type { User } from '../types';

interface LoginPageProps {
    onLoginSuccess: (user: User) => void;
    onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBack }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length <= 10) {
            setPhone(value);
        }
        if (error) {
            setError('');
        }
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error) {
            setError('');
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length !== 10) {
            setError('Please enter a valid 10-digit phone number.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }


        setIsLoading(true);
        // Simulate an API call for authentication
        setTimeout(() => {
            const userData: User = {
                name: `User ${phone.slice(-4)}`,
                phone: phone,
                // CUSTOMIZE: This uses a placeholder avatar service. You can replace this logic to fetch a real user profile picture.
                picture: `https://i.pravatar.cc/150?u=${phone}`, // Use phone for a unique avatar
            };
            onLoginSuccess(userData);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-lg flex flex-col p-4 animate-fade-in z-20">
            <header className="flex items-center">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                    <ArrowLeftIcon className="w-6 h-6 text-slate-800 dark:text-slate-200" />
                </button>
            </header>
            <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
                <span className="text-6xl mb-4" role="img" aria-label="salad emoji">🥗</span>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome Back!</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 mb-8">Enter your details to continue.</p>
                
                <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 flex flex-col items-center">
                    <div className="relative w-full">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                           <span className="text-slate-500 dark:text-slate-400">+91</span>
                        </div>
                        <input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="98765 43210"
                            className="w-full bg-black/5 dark:bg-slate-800/50 border-2 border-slate-300 dark:border-slate-700 rounded-lg py-3 pr-4 pl-14 text-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-green-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-green-500 transition"
                            aria-label="Phone Number"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="relative w-full">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                           <LockIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            className="w-full bg-black/5 dark:bg-slate-800/50 border-2 border-slate-300 dark:border-slate-700 rounded-lg py-3 pr-4 pl-14 text-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-green-500 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-green-500 transition"
                            aria-label="Password"
                            disabled={isLoading}
                        />
                    </div>
                     {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading || phone.length !== 10 || password.length < 6}
                        className="w-full bg-indigo-600 dark:bg-green-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:animate-bounce-in disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                <span>Logging in...</span>
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-4 px-8">
                        By logging in, you agree to our Terms of Service.
                    </p>
                </form>
            </div>
        </div>
    );
};