import React from 'react';
import type { CartItem } from '../types';
import { TrashIcon, CheckoutIcon } from './Icons';

interface CartPageProps {
    cartItems: CartItem[];
    onRemoveFromCart: (itemId: number) => void;
    onPlaceOrder: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ cartItems, onRemoveFromCart, onPlaceOrder }) => {
    const total = cartItems.reduce((sum, item) => {
        const price = item.type === 'subscription' ? item.plan.price : Math.round(item.plan.price / 26);
        return sum + price;
    }, 0);

    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <img src="https://em-content.zobj.net/source/apple/354/shopping-cart_1f6d2.png" alt="Empty Cart" className="w-24 h-24 mx-auto mb-4 opacity-50" />
                        <p className="text-slate-600 dark:text-slate-300">Your cart is empty.</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Add a plan from the home page to get started!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl p-4 transition-shadow duration-300 hover:shadow-2xl">
                                <div className="flex items-center">
                                    <img src={item.plan.imageUrl} alt={item.plan.name} className="w-16 h-16 rounded-full mr-4 object-cover"/>
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-slate-100">{item.plan.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{item.type} Order</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-indigo-600 dark:text-green-400">₹{item.type === 'subscription' ? item.plan.price : Math.round(item.plan.price / 26)}</p>
                                    <button onClick={() => onRemoveFromCart(item.id)} className="text-red-500 hover:text-red-400 mt-1 p-1 rounded-full active:animate-bounce-in">
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-white/10">
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span className="text-slate-600 dark:text-slate-300">Total:</span>
                                <span className="text-indigo-600 dark:text-green-400">₹{total}</span>
                            </div>
                             <button onClick={onPlaceOrder} className="mt-6 w-full bg-indigo-600 dark:bg-green-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:animate-bounce-in hover:bg-indigo-700 dark:hover:bg-green-600">
                                <CheckoutIcon className="w-6 h-6"/>
                                <span>Place Order</span>
                             </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};