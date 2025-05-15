import React from 'react';
import { MapPin } from 'lucide-react';
import { Studio } from '../types';

interface MapViewProps {
  studios: Studio[];
  selectedStudioId?: string;
  onStudioSelect?: (studioId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ studios, selectedStudioId, onStudioSelect }) => {
  // This is a simplified map visualization since we can't use actual maps APIs
  // In a real application, you would integrate Google Maps, Mapbox, or a similar service
  
  // Calculate boundaries for our simplified map
  const minLat = Math.min(...studios.map(s => s.location.latitude)) - 0.02;
  const maxLat = Math.max(...studios.map(s => s.location.latitude)) + 0.02;
  const minLng = Math.min(...studios.map(s => s.location.longitude)) - 0.02;
  const maxLng = Math.max(...studios.map(s => s.location.longitude)) + 0.02;
  
  const latRange = maxLat - minLat;
  const lngRange = maxLng - minLng;
  
  // Convert lat/lng to x/y coordinates in our container
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng - minLng) / lngRange) * 100;
    const y = 100 - ((lat - minLat) / latRange) * 100; // Invert Y axis
    return { x, y };
  };
  
  return (
    <div className="relative w-full h-80 bg-blue-50 rounded-lg overflow-hidden border border-gray-300">
      {/* Map background - this would be replaced with an actual map in production */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Map label */}
      <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium text-gray-500">
        Delhi Map View
      </div>
      
      {/* Studio markers */}
      {studios.map((studio) => {
        const { x, y } = getPosition(studio.location.latitude, studio.location.longitude);
        const isSelected = studio.id === selectedStudioId;
        
        return (
          <div
            key={studio.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              isSelected ? 'z-10 scale-125' : 'hover:z-10 hover:scale-110'
            }`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => onStudioSelect && onStudioSelect(studio.id)}
          >
            <div className="relative">
              <MapPin
                size={24}
                className={`${
                  isSelected ? 'text-[#FF5A5F] fill-[#FF5A5F]' : 'text-gray-700'
                }`}
              />
              
              {/* Price tag that appears on hover or when selected */}
              <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded px-2 py-1 text-xs font-bold whitespace-nowrap ${
                isSelected ? 'block' : 'hidden group-hover:block'
              }`}>
                {studio.name} - ₹{studio.price}/hr
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Map controls - these would be functional in a real map */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="bg-white w-8 h-8 rounded-full shadow flex items-center justify-center border border-gray-300">
          <span className="text-gray-700 text-xl">+</span>
        </button>
        <button className="bg-white w-8 h-8 rounded-full shadow flex items-center justify-center border border-gray-300">
          <span className="text-gray-700 text-xl">-</span>
        </button>
      </div>
    </div>
  );
};

export default MapView;