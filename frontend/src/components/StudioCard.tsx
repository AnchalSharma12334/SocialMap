import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Studio } from '../types';
import { Link } from './Link';

interface StudioCardProps {
  studio: Studio;
}

const StudioCard: React.FC<StudioCardProps> = ({ studio }) => {
  return (
    <Link
      to={`/studios/${studio.id}`}
      className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      <div className="relative">
        <img
          src={studio.images[0]}
          alt={studio.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-[#FF5A5F] text-white font-semibold px-2 py-1 m-2 rounded text-sm">
          ₹{studio.price}/hr
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <span className="inline-block bg-white text-[#0F172A] px-2 py-1 rounded text-xs font-semibold capitalize">
            {studio.type}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{studio.name}</h3>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <MapPin size={16} className="mr-1" />
          <span className="truncate">{studio.address}</span>
        </div>
        <div className="flex items-center mb-3">
          <div className="flex items-center text-yellow-500">
            <Star size={16} className="fill-current" />
            <span className="ml-1 font-medium text-gray-900">{studio.rating}</span>
          </div>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-600">{studio.reviewCount} reviews</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {studio.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {amenity}
            </span>
          ))}
          {studio.amenities.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{studio.amenities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default StudioCard;