import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './components/HomePage';
import { MenuPage } from './components/MenuPage';
import { CartPage } from './components/CartPage';
import { OrderSuccessPage } from './components/OrderSuccessPage';
import type { Page, Plan, CartItem } from './types';
import { Page as PageEnum } from './types';
import { GOOGLE_FORM_URL, GOOGLE_FORM_FIELD_IDS } from './components/googleFormConfig';
import { Footer } from './components/Footer';
import { AppSkeleton } from './components/AppSkeleton';
import { ImageModal } from './components/ImageModal';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState<Page>(PageEnum.HOME);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [pageKey, setPageKey] = useState(0); // Key to force re-animation on page change
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = window.localStorage.getItem('theme') as Theme;
            return storedTheme || 'dark'; // Default to dark theme
        }
        return 'dark';
    });
    const mainRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Simulate initial app loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    useEffect(() => {
        const mainEl = mainRef.current;
        const auroraTop = document.getElementById('aurora-top');
        const auroraBottom = document.getElementById('aurora-bottom');

        if (!mainEl || !auroraTop || !auroraBottom) return;

        const handleScroll = () => {
            const scrollTop = mainEl.scrollTop;
            auroraTop.style.transform = `translateY(${scrollTop * 0.1}px)`;
            auroraBottom.style.transform = `translateY(-${scrollTop * 0.1}px)`;
        };

        mainEl.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            mainEl.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading]);

    const handleNavigate = (page: Page) => {
        if (page === activePage) return;
        setActivePage(page);
        setPageKey(prevKey => prevKey + 1); // Trigger animation
        mainRef.current?.scrollTo(0, 0); // Scroll to top on page change
    };
    
    const handleOrderNow = (plan: Plan, type: 'subscription' | 'single') => {
        const existingItem = cartItems.find(item => item.plan.id === plan.id && item.type === type);
        if (existingItem) {
            alert(`${plan.name} (${type}) is already in your cart.`);
            return;
        }
        const newItem: CartItem = {
            id: Date.now(),
            plan,
            type,
        };
        setCartItems(prevItems => [...prevItems, newItem]);
        
        // Navigate to cart after a short delay to allow animation to be seen
        setTimeout(() => {
             handleNavigate(PageEnum.CART);
        }, 500);
    };

    const handleRemoveFromCart = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items before placing an order.");
            return;
        }

        const total = cartItems.reduce((sum, item) => {
            const price = item.type === 'subscription' ? item.plan.price : Math.round(item.plan.price / 26);
            return sum + price;
        }, 0);

        const orderDetails = cartItems.map(item =>
            `${item.plan.name} (${item.type}) - ₹${item.type === 'subscription' ? item.plan.price : Math.round(item.plan.price / 26)}`
        ).join('\n');

        // Construct the pre-filled Google Form URL
        try {
            const formUrl = new URL(GOOGLE_FORM_URL);
            formUrl.searchParams.append(GOOGLE_FORM_FIELD_IDS.orderDetails, orderDetails);
            formUrl.searchParams.append(GOOGLE_FORM_FIELD_IDS.totalPrice, `₹${total}`);
            
            // Open the form in a new tab for a better user experience
            window.open(formUrl.toString(), '_blank', 'noopener,noreferrer');
            
            // Clear the cart and navigate to the success page to confirm the action
            setCartItems([]);
            handleNavigate(PageEnum.ORDER_SUCCESS);
        } catch (error) {
            console.error("Invalid Google Form URL:", error);
            alert("There was an error redirecting to the order form. Please check the configuration in googleFormConfig.ts.");
        }
    };

    const handleBackToHome = () => {
        handleNavigate(PageEnum.HOME);
    };
    
    const renderPage = () => {
        switch (activePage) {
            case PageEnum.HOME:
                return <HomePage onOrderNow={handleOrderNow} onShowImage={setModalImage} />;
            case PageEnum.MENU:
                return <MenuPage />;
            case PageEnum.CART:
                return <CartPage 
                    cartItems={cartItems} 
                    onRemoveFromCart={handleRemoveFromCart} 
                    onPlaceOrder={handlePlaceOrder}
                />;
            case PageEnum.ORDER_SUCCESS:
                return <OrderSuccessPage onBackToHome={handleBackToHome} />;
            default:
                return <HomePage onOrderNow={handleOrderNow} onShowImage={setModalImage} />;
        }
    };

    if (isLoading) {
        return <AppSkeleton />;
    }

    return (
        <div className="max-w-7xl mx-auto bg-transparent">
            <div className="bg-transparent min-h-screen flex flex-col">
                 <Header 
                    activePage={activePage}
                    onNavigate={handleNavigate}
                    cartCount={cartItems.length}
                    theme={theme}
                    setTheme={setTheme}
                 />
                <main ref={mainRef} className="flex-grow overflow-y-auto">
                    <div key={pageKey} className="pb-24 md:pb-4 animate-page-enter">
                        {renderPage()}
                    </div>
                </main>
                <Footer />
                <BottomNav
                    activePage={activePage}
                    onNavigate={handleNavigate}
                    cartCount={cartItems.length}
                />
                 {modalImage && <ImageModal imageUrl={modalImage} onClose={() => setModalImage(null)} />}
            </div>
        </div>
    );
};

export default App;