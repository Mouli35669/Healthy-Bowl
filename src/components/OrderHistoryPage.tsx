import React from 'react';
import type { Order } from '../types';
import { ArrowLeftIcon } from './Icons';

interface OrderHistoryPageProps {
    orders: Order[];
    onBack: () => void;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ orders, onBack }) => {
    return (
        <div className="absolute inset-0 bg-gray-100/50 dark:bg-slate-900/50 backdrop-blur-2xl flex flex-col animate-fade-in z-20">
             <header className="sticky top-0 z-10 bg-white/20 dark:bg-black/20 backdrop-blur-lg p-4 flex items-center border-b border-white/30 dark:border-white/10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                    <ArrowLeftIcon className="w-6 h-6 text-slate-800 dark:text-slate-200" />
                </button>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white mx-auto">Order History</h1>
                 <div className="w-10"></div>
            </header>
            
            <div className="p-4 md:p-8 flex-grow overflow-y-auto">
                <div className="max-w-3xl mx-auto">
                    {orders.length === 0 ? (
                        <div className="text-center py-20">
                            <img src="https://em-content.zobj.net/source/apple/354/open-file-folder_1f4c2.png" alt="No Orders" className="w-24 h-24 mx-auto mb-4 opacity-50" />
                            <p className="text-slate-600 dark:text-slate-400 font-semibold">No Past Orders</p>
                            <p className="text-slate-500 dark:text-slate-500 text-sm">Your past orders will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Orders are shown newest first */}
                            {[...orders].reverse().map(order => (
                                <div key={order.id} className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 p-5 rounded-xl shadow-lg">
                                    <div className="flex justify-between items-start mb-3 pb-3 border-b border-slate-200/80 dark:border-white/10">
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Order Placed</p>
                                            <p className="font-semibold text-slate-800 dark:text-slate-100">{formatDate(order.date)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
                                            <p className="font-bold text-lg text-indigo-600 dark:text-green-400">₹{order.total}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Items:</h4>
                                        <ul className="space-y-1">
                                        {order.items.map(item => (
                                            <li key={item.id} className="flex justify-between text-sm text-slate-700 dark:text-slate-300">
                                                <span>{item.plan.name} <span className="text-slate-500 dark:text-slate-500 capitalize">({item.type})</span></span>
                                                <span>₹{item.type === 'subscription' ? item.plan.price : Math.round(item.plan.price / 26)}</span>
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};