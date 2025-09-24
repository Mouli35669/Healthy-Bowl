import React from 'react';

interface OrderSuccessPageProps {
  onBackToHome: () => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ onBackToHome }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center animate-fade-in">
        <img 
            src="https://em-content.zobj.net/source/apple/354/check-mark-button_2705.png" 
            alt="Order Confirmed" 
            className="w-32 h-32 mb-6" 
        />
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-green-400 mb-2">Almost there!</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-sm">
            We've opened a Google Form in a new tab. Please fill out your delivery details there to complete your order.
        </p>
        
        <div className="w-full max-w-sm space-y-4">
            <button 
                onClick={onBackToHome} 
                className="w-full text-white bg-indigo-600 dark:bg-green-500 hover:bg-indigo-700 dark:hover:bg-green-600 font-bold py-3 rounded-lg transition-transform hover:scale-105"
            >
                Back to Home
            </button>
        </div>
    </div>
  );
};