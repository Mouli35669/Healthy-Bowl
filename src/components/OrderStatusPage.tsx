import React, { useState, useEffect } from 'react';

interface OrderStatusPageProps {
  onBackToHome: () => void;
  sendNotification: (title: string, options: NotificationOptions) => void;
}

const statusSteps = [
    { icon: "✅", title: "Order Confirmed", subtitle: "We've received your order.", iconUrl: "https://em-content.zobj.net/source/apple/354/check-mark-button_2705.png" },
    { icon: "🧑‍🍳", title: "Preparing Bowl", subtitle: "Fresh ingredients are being packed.", iconUrl: "https://em-content.zobj.net/source/apple/354/man-cook_1f468-200d-1f373.png" },
    { icon: "🚚", title: "Out for Delivery", subtitle: "Your bowl is on its way.", iconUrl: "https://em-content.zobj.net/source/apple/354/delivery-truck_1f69a.png" },
    { icon: "📦", title: "Delivered", subtitle: "Enjoy your healthy meal!", iconUrl: "https://em-content.zobj.net/source/apple/354/package_1f4e6.png" },
];

const StatusStep: React.FC<{ icon: string; title: string; subtitle: string; isCompleted: boolean; isActive: boolean; }> = ({ icon, title, subtitle, isCompleted, isActive }) => (
    <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${isCompleted ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-400'} ${isActive ? 'ring-4 ring-green-500/30' : ''}`}>
            <span className="text-2xl animate-in fade-in zoom-in">{icon}</span>
        </div>
        <div>
            <h4 className={`font-bold transition-colors duration-300 ${isCompleted ? 'text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>{title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-500">{subtitle}</p>
        </div>
    </div>
);

export const OrderStatusPage: React.FC<OrderStatusPageProps> = ({ onBackToHome, sendNotification }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepInfo = statusSteps[currentStep];
    if (stepInfo) {
      // Small delay so user sees page before notification appears.
      const timer = setTimeout(() => {
        sendNotification(stepInfo.title, {
          body: stepInfo.subtitle,
          icon: stepInfo.iconUrl,
          tag: 'healthy-bowl-order-status' // This tag ensures the latest status notification replaces the previous one.
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, sendNotification]);


  useEffect(() => {
    const timers = statusSteps.slice(1).map((_, index) => 
      setTimeout(() => {
        setCurrentStep(index + 1);
      }, (index + 1) * 3000 + 500) // Stagger updates every 3 seconds
    );

    // Cleanup timers if the component unmounts
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const isDelivered = currentStep === statusSteps.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center animate-fade-in">
        <img 
            src={isDelivered ? "https://em-content.zobj.net/source/apple/354/package_1f4e6.png" : "https://em-content.zobj.net/source/apple/354/delivery-truck_1f69a.png"} 
            alt="Delivery Status" 
            className="w-32 h-32 mb-6 transition-transform duration-500 transform scale-100" 
        />
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-green-400 mb-2">{isDelivered ? 'Order Delivered!' : 'Your Order is in Progress!'}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
            {isDelivered 
                ? 'Thank you for choosing Healthy Bowl. We hope you enjoy your meal!'
                : 'Your healthy bowl is being prepared and will be delivered between 6 AM - 10 AM.'
            }
        </p>

        <div className="w-full max-w-xs space-y-1 text-left my-6">
            {statusSteps.map((step, index) => (
                <React.Fragment key={step.title}>
                    <StatusStep 
                        {...step}
                        isCompleted={index <= currentStep}
                        isActive={index === currentStep}
                    />
                    {index < statusSteps.length - 1 && (
                        <div className={`h-8 border-l-2 ml-6 transition-all duration-300 ${index < currentStep ? 'border-green-500 border-solid' : 'border-slate-300 dark:border-slate-600 border-dashed'}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
        
        <button 
            onClick={onBackToHome} 
            className={`mt-8 w-full max-w-sm text-white font-bold py-3 rounded-lg transition-all duration-300 ${isDelivered ? 'bg-green-600 hover:bg-green-700 scale-105 shadow-lg' : 'bg-slate-600 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600'}`}
        >
            {isDelivered ? 'Order Again' : 'Back to Home'}
        </button>
    </div>
  );
};