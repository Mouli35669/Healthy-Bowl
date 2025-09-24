

import React, { useEffect, useRef } from 'react';
import { ArrowLeftIcon, MapPinIcon } from './Icons';

// FIX: Add google maps declaration to window object
declare global {
    interface Window {
        google: any;
    }
}

interface AddressPageProps {
    address: string;
    onBack: () => void;
    onSave: (newAddress: string) => void;
}

export const AddressPage: React.FC<AddressPageProps> = ({ address, onBack, onSave }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current && window.google) {
            // CUSTOMIZE: Change the default latitude and longitude for the map's starting location.
            // Coordinates for Tuni, Andhra Pradesh
            const tuniLocation = { lat: 17.3551, lng: 82.5484 };

            const map = new window.google.maps.Map(mapRef.current, {
                center: tuniLocation,
                zoom: 15,
                disableDefaultUI: true,
                gestureHandling: 'cooperative',
                styles: [ // Dark mode map styles (looks good on light backgrounds too)
                    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                    {
                        featureType: 'administrative.locality',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }],
                    },
                    {
                        featureType: 'poi',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }],
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'geometry',
                        stylers: [{ color: '#263c3f' }],
                    },
                    {
                        featureType: 'poi.park',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#6b9a76' }],
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry',
                        stylers: [{ color: '#38414e' }],
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry.stroke',
                        stylers: [{ color: '#212a37' }],
                    },
                    {
                        featureType: 'road',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#9ca5b3' }],
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry',
                        stylers: [{ color: '#746855' }],
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [{ color: '#1f2835' }],
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#f3d19c' }],
                    },
                    {
                        featureType: 'transit',
                        elementType: 'geometry',
                        stylers: [{ color: '#2f3948' }],
                    },
                    {
                        featureType: 'transit.station',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#d59563' }],
                    },
                    {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{ color: '#17263c' }],
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#515c6d' }],
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.stroke',
                        stylers: [{ color: '#17263c' }],
                    },
                ]
            });

            new window.google.maps.Marker({
                position: tuniLocation,
                map: map,
                title: 'Your Location'
            });
        }
    }, []);

    const handleSave = () => {
        // In a real app, this would get the address from the map/search input
        alert('Address saved!');
        onSave(address);
    }

    return (
        <div className="absolute inset-0 bg-gray-100/50 dark:bg-slate-900/50 backdrop-blur-2xl md:py-8 animate-fade-in z-20">
             <div className="max-w-4xl mx-auto flex flex-col h-full bg-transparent md:shadow-lg md:rounded-xl overflow-hidden">
                <header className="bg-white/20 dark:bg-black/20 backdrop-blur-lg sticky top-0 md:relative z-10 p-4 flex justify-between items-center border-b border-white/30 dark:border-white/10">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                        <ArrowLeftIcon className="w-6 h-6 text-slate-800 dark:text-slate-200" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Delivery Address</h1>
                    <div className="w-10"></div>
                </header>

                <div ref={mapRef} className="w-full h-64 md:h-96 flex-grow">
                    {/* Google Map will be rendered here */}
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-500">
                        Loading Map...
                    </div>
                </div>

                <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg p-6 rounded-t-2xl -mt-4 md:mt-0 z-10">
                    <div className="flex items-start mb-6">
                        <MapPinIcon className="w-8 h-8 text-indigo-500 dark:text-green-400 mr-4 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Your Location</p>
                            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{address}</p>
                        </div>
                    </div>

                    <button 
                        onClick={handleSave}
                        className="w-full bg-indigo-600 dark:bg-green-500 text-white font-bold py-4 rounded-lg shadow-lg transition-transform hover:scale-105"
                    >
                        Save Address
                    </button>
                </div>
            </div>
        </div>
    );
};