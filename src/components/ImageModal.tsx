import React from 'react';

interface ImageModalProps {
    imageUrl: string;
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    return (
        <div 
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-modal-fade-in"
            role="dialog"
            aria-modal="true"
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[80vh] bg-white/10 rounded-2xl border border-white/20 animate-modal-zoom-in shadow-2xl"
            >
                <img src={imageUrl} alt="Full size plan" className="block object-contain w-full h-full max-h-[80vh] rounded-2xl" />
                <button 
                    onClick={onClose}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-white dark:bg-slate-800 text-black dark:text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label="Close image view"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};