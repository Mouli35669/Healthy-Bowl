import React, { useState, useRef } from 'react';
import type { Plan } from '../types'; // CORRECT: Import the Plan type directly.

// Define the plan details directly in the file, based on the provided image.
const PLANS: Plan[] = [
  {
    id: 'premium',
    name: 'Premium Pack',
    price: 1900,
    itemsCount: 10,
    description: 'A comprehensive daily bowl with a wide variety of nutrients to supercharge your day.',
    contents: [
        { item: '3 Fruits Items', detail: 'A vibrant mix of seasonal fruits for essential vitamins and natural energy.' },
        { item: '2 Vegetables Items', detail: 'Crisp, fresh vegetables delivering crucial fiber and minerals.' },
        { item: '1 Sprouts Item', detail: 'Packed with protein and enzymes to support healthy digestion.' },
        { item: '3 Dry Fruits Items', detail: 'A trio of nutrient-dense dry fruits for a sustained energy boost.' },
        { item: '1 Boiled Item', detail: 'Includes a boiled egg twice a week for a high-quality protein punch.' },
    ],
    imageUrl: 'https://i.imgur.com/gJZc2yA.png', 
    color: 'from-amber-400 to-red-500',
    isComingSoon: false,
  },
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 1400,
    itemsCount: 8,
    description: 'A balanced and affordable start to your day with all the essential nutrients.',
    contents: [
        { item: '3 Fruits Items', detail: 'Your daily dose of vitamins from a selection of fresh, seasonal fruits.' },
        { item: '1 Vegetable Item', detail: 'A fresh vegetable to meet your daily fiber requirements.' },
        { item: '1 Sprout Item', detail: 'A great source of plant-based protein and vital nutrients.' },
        { item: '2 Types of Dry Fruits', detail: 'Two varieties of delicious dry fruits for energy and minerals.' },
        { item: '1 Boiled Item', detail: 'A reliable source of protein to keep you feeling full and focused.' },
    ],
    imageUrl: 'https://i.imgur.com/R3S3aZU.png',
    color: 'from-green-400 to-blue-500',
    isComingSoon: false,
  },
  {
    id: 'light-fit',
    name: 'Light & Fit Pack',
    itemsCount: 6,
    price: 1200,
    description: 'Perfect for a light start. Focused on low-calorie, high-nutrient items.',
    imageUrl: 'https://i.ibb.co/L8zBvjX/light-fit.jpg',
    contents: [
        { item: '2 Fruits Items', detail: 'Low-glycemic fruits to start your day fresh.' },
        { item: '2 Salad Items', detail: 'A mix of crisp salads for maximum nutrients.' },
        { item: '1 Sprout Item', detail: 'High-fiber sprouts to keep you full longer.' },
        { item: '1 Detox Drink', detail: 'A refreshing drink to cleanse and energize.' }
    ],
    color: 'from-yellow-400 to-orange-500',
    isComingSoon: true,
  },
  {
    id: 'family',
    name: 'Family Pack',
    itemsCount: 25,
    price: 3500,
    description: 'A wholesome pack for the family, ensuring a healthy start for everyone.',
    imageUrl: 'https://i.ibb.co/Wc4d1b7/f0d7e6c4-8f3a-4e2b-8d5f-9e7c6a5d4b3c-family.jpg',
    contents: [
        { item: '4 Fruits Items', detail: 'A generous assortment of seasonal fruits for the family.' },
        { item: '3 Vegetables Items', detail: 'A variety of fresh vegetables for shared meals.' },
        { item: '2 Sprouts Items', detail: 'Double portion of sprouts for a protein-rich diet.' },
        { item: '3 Dry Fruits Items', detail: 'A healthy mix of dry fruits for all-day snacking.' },
        { item: '2 Boiled Items', detail: 'Includes boiled eggs four times a week for complete nutrition.' }
    ],
    color: 'from-purple-500 to-pink-600',
    isComingSoon: true,
  }
];

// REMOVED: Redundant local type definitions for Plan and ContentDetail are no longer needed.

const Banner: React.FC = () => (
    <div className="p-6 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-white/30 dark:border-white/10 m-4 md:m-0 shadow-2xl overflow-hidden relative min-h-[200px] flex flex-col sm:flex-row items-center justify-center">
        {/* Scooter on the left */}
        <div className="relative z-10 opacity-80 sm:opacity-100 flex-shrink-0">
              <div className="absolute top-[28px] left-[15px] w-6 h-6 bg-yellow-200 rounded-full blur-lg animate-pulse"></div>
              <img src="https://em-content.zobj.net/source/apple/354/motor-scooter_1f6f5.png" alt="Delivery Scooter" className="w-28 h-28 opacity-90 drop-shadow-lg" />
        </div>
        
        {/* Text content on the right */}
        <div className="relative z-20 w-full text-center sm:text-left sm:pl-8">
            <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full -rotate-3 mb-3 tracking-wide">SPECIAL OFFER</span>
            {/* The animated, light-swept text */}
            <h2 className="text-4xl sm:text-5xl font-bold text-light-sweep">
                Healthy Bowls
            </h2>
            <p className="mt-1 text-slate-600 dark:text-slate-300 font-medium">Delivered To Your Doorstep!</p>
            <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Morning 6-10 AM (Sunday Holiday)</p>
                  <p className="text-lg font-bold text-indigo-600 dark:text-green-400 mt-1">FREE DELIVERY</p>
            </div>
        </div>
    </div>
);


const PlanCard: React.FC<{ plan: Plan; onOrderNow: (plan: Plan, type: 'subscription' | 'single') => void; onShowImage: (imageUrl: string) => void; index: number }> = ({ plan, onOrderNow, onShowImage, index }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [justAdded, setJustAdded] = useState<'subscription' | 'single' | null>(null);
    const [isAdding, setIsAdding] = useState<'subscription' | 'single' | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleOrderClick = (type: 'subscription' | 'single') => {
        if (isAdding || justAdded || plan.isComingSoon) return;

        setIsAdding(type); // Start loading state

        // Simulate a brief delay for better UX before adding to cart
        setTimeout(() => {
            onOrderNow(plan, type);
            setJustAdded(type); // Set success state
            setIsAdding(null); // End loading state

            // Reset the 'Added' status after 2 seconds to allow re-ordering if needed
            setTimeout(() => setJustAdded(null), 2000); 
        }, 400);
    };

    const toggleDetails = () => {
        if (plan.isComingSoon) return;
        setShowDetails(!showDetails);
    };
    
    const glowStyle = {
        background: `radial-gradient(350px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.15), transparent 80%)`
    };
    const darkGlowStyle = {
        background: `radial-gradient(350px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`
    };

    return (
        <div style={{ perspective: '1000px', animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
            <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`relative group bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl transition-transform duration-500 ease-out ${plan.isComingSoon ? 'grayscale cursor-not-allowed' : ''} hover:shadow-indigo-500/20 dark:hover:shadow-green-500/20`}
                style={{ transform: isHovering ? 'rotateY(5deg) rotateX(5deg) scale(1.05)' : 'rotateY(0) rotateX(0) scale(1)', transformStyle: 'preserve-3d' }}
            >
                {plan.isComingSoon && (
                    <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center z-10 pointer-events-none">
                        <span className="text-white text-2xl font-bold tracking-widest border-4 border-white rounded-lg px-6 py-3 transform -rotate-12 select-none">
                            COMING SOON
                        </span>
                    </div>
                )}
                <div 
                    className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? darkGlowStyle : glowStyle}
                ></div>

                <div className={`relative p-6 min-h-[160px] overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-80 dark:opacity-70 rounded-t-2xl`}></div>
                    
                    <img 
                        src={plan.imageUrl} 
                        alt={plan.name} 
                        onClick={() => !plan.isComingSoon && onShowImage(plan.imageUrl)}
                        className={`w-32 h-32 absolute -top-8 right-4 rounded-full border-8 border-white/20 dark:border-black/20 shadow-2xl object-cover transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-6 ${plan.isComingSoon ? '' : 'cursor-pointer'}`}
                    />

                    <div className="relative z-[1] w-1/2">
                        <h3 className="text-2xl font-bold text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">{plan.name}</h3>
                        <p className="text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">{plan.itemsCount} Items Pack</p>
                        <div className="mt-4 text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
                            <span className="text-4xl font-bold">₹{plan.price}</span>
                            <span className="opacity-80">/month</span>
                        </div>
                        <div className="mt-2 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                            <span className="font-bold">₹{Math.round(plan.price / 26)}</span>
                            <span className="opacity-80">/day (approx.)</span>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <p className="text-slate-600 dark:text-slate-300 text-sm">{plan.description}</p>
                    
                    <div className="mt-4">
                        <button 
                            onClick={toggleDetails}
                            disabled={plan.isComingSoon}
                            className="text-indigo-600 dark:text-green-400 font-semibold text-sm hover:underline transition-transform hover:scale-110 active:scale-105 disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {showDetails ? 'Hide Details' : 'View Health Details'}
                        </button>
                        {showDetails && (
                            <div className="mt-3 space-y-3">
                                {plan.contents.map(content => (
                                    <div key={content.item} className="flex items-start animate-fade-in-up">
                                        <span className="text-green-500 mr-2 mt-0.5">✨</span>
                                        <div>
                                            <p className="font-semibold text-slate-700 dark:text-slate-200">{content.item}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{content.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        {plan.isComingSoon ? (
                            <div className="flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 py-3 opacity-50">
                                <p className="font-bold text-slate-600 dark:text-slate-300 tracking-wider">COMING SOON</p>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button 
                                    onClick={() => handleOrderClick('subscription')} 
                                    disabled={!!isAdding || !!justAdded}
                                    className={`w-full text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center bg-gradient-to-r ${plan.color} disabled:opacity-75 disabled:scale-100`}
                                >
                                    {isAdding === 'subscription' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                                            Adding...
                                        </>
                                    ) : justAdded === 'subscription' ? 'Added ✔' : 'Subscribe Monthly'}
                                </button>
                                <button 
                                    onClick={() => handleOrderClick('single')} 
                                    disabled={!!isAdding || !!justAdded}
                                    className="w-full text-slate-700 dark:text-white font-bold py-3 px-4 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300 flex items-center justify-center disabled:opacity-75"
                                >
                                    {isAdding === 'single' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin mr-2"></div>
                                            Adding...
                                        </>
                                    ) : justAdded === 'single' ? 'Added ✔' : 'Try for one day'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const HomePage: React.FC<{ onOrderNow: (plan: Plan, type: 'subscription' | 'single') => void; onShowImage: (imageUrl: string) => void; }> = ({ onOrderNow, onShowImage }) => {
    return (
        <div className="space-y-6 p-4 md:p-8">
            <div className="animate-fade-in-up">
                <Banner />
            </div>
            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:space-y-0 pt-8">
                {PLANS.map((plan, index) => (
                    <PlanCard key={plan.id} plan={plan} onOrderNow={onOrderNow} onShowImage={onShowImage} index={index} />
                ))}
            </div>
        </div>
    );
};