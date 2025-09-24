import React from 'react';
import { REWARD_POINTS, REFERRAL_CODE } from './constants';
import { GiftIcon, PauseIcon, PlayIcon, ReplaceIcon, ShareIcon, MapPinIcon, HistoryIcon, BellIcon } from './Icons';
import type { User } from '../types';

interface ProfilePageProps {
    isLoggedIn: boolean;
    user: User | null;
    onNavigateToLogin: () => void;
    onLogout: () => void;
    onManageAddress: () => void;
    onViewOrderHistory: () => void;
    address: string;
    notificationPermission: NotificationPermission | null;
    onRequestNotificationPermission: () => void;
}

const LoggedInView: React.FC<{ 
    onLogout: () => void; 
    onManageAddress: () => void; 
    onViewOrderHistory: () => void; 
    address: string;
    notificationPermission: NotificationPermission | null;
    onRequestNotificationPermission: () => void;
}> = ({ onLogout, onManageAddress, onViewOrderHistory, address, notificationPermission, onRequestNotificationPermission }) => (
    <div className="space-y-6">

        <div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Delivery Address</h3>
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 p-4 rounded-xl space-y-3 shadow-xl">
                <div className="flex items-start">
                    <MapPinIcon className="w-6 h-6 text-slate-500 dark:text-slate-400 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-slate-800 dark:text-slate-200 font-medium">{address}</p>
                </div>
                <button 
                    onClick={onManageAddress}
                    className="w-full text-center text-indigo-600 dark:text-green-400 font-bold py-2 px-4 rounded-lg bg-indigo-500/10 dark:bg-green-500/20 hover:bg-indigo-500/20 dark:hover:bg-green-500/30 transition-colors text-sm"
                >
                    Change Address
                </button>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">My Account</h3>
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 p-2 rounded-xl shadow-xl">
                <button 
                    onClick={onViewOrderHistory}
                    className="w-full text-left flex items-center p-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                    <HistoryIcon className="w-6 h-6 text-slate-500 dark:text-slate-400 mr-4"/>
                    <span className="font-medium text-slate-800 dark:text-slate-200">Order History</span>
                </button>
            </div>
        </div>
        
        <div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Notifications</h3>
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 p-4 rounded-xl space-y-3 shadow-xl">
                <div className="flex items-center">
                    <BellIcon className="w-6 h-6 text-slate-500 dark:text-slate-400 mr-3 flex-shrink-0" />
                    <div>
                        <p className="text-slate-800 dark:text-slate-200 font-medium">Order Status Updates</p>
                        {notificationPermission === 'granted' && <p className="text-sm text-green-600 dark:text-green-400">You will receive notifications.</p>}
                        {notificationPermission === 'denied' && <p className="text-sm text-red-500">Notifications are blocked in browser settings.</p>}
                    </div>
                </div>
                {notificationPermission === 'default' && (
                    <button 
                        onClick={onRequestNotificationPermission}
                        className="w-full text-center text-indigo-600 dark:text-green-400 font-bold py-2 px-4 rounded-lg bg-indigo-500/10 dark:bg-green-500/20 hover:bg-indigo-500/20 dark:hover:bg-green-500/30 transition-colors text-sm"
                    >
                        Enable Notifications
                    </button>
                )}
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Subscription Management</h3>
            <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center p-4 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 rounded-lg hover:bg-blue-500/20 dark:hover:bg-blue-500/30 transition-all duration-300 hover:scale-105">
                    <PauseIcon className="w-6 h-6 mb-1"/>
                    <span className="text-sm font-medium">Pause</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-300 rounded-lg hover:bg-green-500/20 dark:hover:bg-green-500/30 transition-all duration-300 hover:scale-105">
                    <PlayIcon className="w-6 h-6 mb-1"/>
                    <span className="text-sm font-medium">Resume</span>
                </button>
                 <button className="flex flex-col items-center p-4 bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300 rounded-lg hover:bg-orange-500/20 dark:hover:bg-orange-500/30 transition-all duration-300 hover:scale-105">
                    <ReplaceIcon className="w-6 h-6 mb-1"/>
                    <span className="text-sm font-medium">Request Replacement</span>
                </button>
                 <button className="flex flex-col items-center p-4 bg-slate-500/10 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300 rounded-lg hover:bg-slate-500/20 dark:hover:bg-slate-500/30 transition-all duration-300 hover:scale-105">
                    <span className="text-lg font-bold">Skip</span>
                    <span className="text-sm">a day</span>
                </button>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Offers & Loyalty</h3>
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 p-4 rounded-xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-lg">
                    <div className="flex items-center">
                        <GiftIcon className="w-6 h-6 text-yellow-500 dark:text-yellow-400 mr-3"/>
                        <span className="font-semibold text-yellow-700 dark:text-yellow-300">Reward Points</span>
                    </div>
                    <span className="font-bold text-yellow-800 dark:text-yellow-200">{REWARD_POINTS}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-lg">
                     <div className="flex items-center">
                        <ShareIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400 mr-3"/>
                        <span className="font-semibold text-indigo-700 dark:text-indigo-300">Referral Code</span>
                    </div>
                    <span className="font-mono text-indigo-800 dark:text-indigo-200 bg-indigo-500/20 dark:bg-indigo-500/30 px-2 py-1 rounded">{REFERRAL_CODE}</span>
                </div>
            </div>
        </div>
        <button
            onClick={onLogout}
            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
            Logout
        </button>
    </div>
);

const LoggedOutView: React.FC<{ onNavigateToLogin: () => void }> = ({ onNavigateToLogin }) => (
    <div className="text-center p-8 bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-xl shadow-xl">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Join Healthy Bowl</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">Login or sign up to manage your subscriptions and earn rewards.</p>
        <button
            onClick={onNavigateToLogin}
            className="w-full bg-indigo-600 dark:bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-green-600 transition-transform hover:scale-105"
        >
            Login / Sign Up
        </button>
    </div>
);

export const ProfilePage: React.FC<ProfilePageProps> = ({ isLoggedIn, user, onNavigateToLogin, onLogout, onManageAddress, onViewOrderHistory, address, notificationPermission, onRequestNotificationPermission }) => {
    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center mb-6">
                    <img 
                        // CUSTOMIZE: This uses a placeholder avatar service. You can replace it with your user's actual avatar URL.
                        src={isLoggedIn && user?.picture ? user.picture : `https://i.pravatar.cc/150?u=guest`} 
                        alt="User Avatar" 
                        className="w-16 h-16 rounded-full mr-4 border-2 border-indigo-500/50 dark:border-green-400/50 object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{isLoggedIn && user ? `Welcome, ${user.name}!` : 'Hello, Guest!'}</h2>
                        {isLoggedIn && user && <p className="text-slate-500 dark:text-slate-400 font-mono">{user.phone}</p>}
                    </div>
                </div>
                {isLoggedIn && user ? <LoggedInView 
                    onLogout={onLogout} 
                    onManageAddress={onManageAddress} 
                    onViewOrderHistory={onViewOrderHistory} 
                    address={address}
                    notificationPermission={notificationPermission}
                    onRequestNotificationPermission={onRequestNotificationPermission}
                /> : <LoggedOutView onNavigateToLogin={onNavigateToLogin} />}
            </div>
        </div>
    );
};