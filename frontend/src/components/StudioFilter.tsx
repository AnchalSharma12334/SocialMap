import React, { useState } from 'react';
import { StudioType } from '../types';

interface StudioFilterProps {
  onFilterChange: (filters: {
    type?: StudioType;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    amenities?: string[];
  }) => void;
}

const StudioFilter: React.FC<StudioFilterProps> = ({ onFilterChange }) => {
  const [type, setType] = useState<StudioType | undefined>(undefined);
  const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenitiesList = [
    'Soundproofing',
    'Full Wall Mirrors',
    'Professional Sound System',
    'Professional Lighting',
    'Green Screen',
    'Air Conditioning',
    'High-Speed WiFi',
    'Changing Rooms',
    'Makeup Area',
    'Coffee Machine',
    'Water Dispenser'
  ];

  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const applyFilters = () => {
    onFilterChange({
      type,
      priceMin,
      priceMax,
      rating,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined
    });
  };

  const resetFilters = () => {
    setType(undefined);
    setPriceMin(undefined);
    setPriceMax(undefined);
    setRating(undefined);
    setSelectedAmenities([]);
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Studio Type</h4>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={type || ''}
          onChange={(e) => setType(e.target.value as StudioType || undefined)}
        >
          <option value="">All Types</option>
          {Object.values(StudioType).map((studioType) => (
            <option key={studioType} value={studioType}>
              {studioType.charAt(0).toUpperCase() + studioType.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range (₹ per hour)</h4>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            value={priceMin || ''}
            onChange={(e) => setPriceMin(e.target.value ? parseInt(e.target.value) : undefined)}
            min={0}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            value={priceMax || ''}
            onChange={(e) => setPriceMax(e.target.value ? parseInt(e.target.value) : undefined)}
            min={0}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Minimum Rating</h4>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={rating || ''}
          onChange={(e) => setRating(e.target.value ? parseInt(e.target.value) : undefined)}
        >
          <option value="">Any Rating</option>
          <option value="3">3+ Stars</option>
          <option value="3.5">3.5+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Amenities</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-[#FF5A5F] mr-2"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-[#FF5A5F] text-white py-2 px-4 rounded-md hover:bg-[#FF4045] transition duration-300"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StudioFilter;