import React, { useState } from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { StudioType } from '../types';

interface SearchBarProps {
  onSearch: (query: string, filters: {
    type?: StudioType;
    date?: string;
    location?: string;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<StudioType | undefined>(undefined);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('Delhi');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, { type, date, location });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex-grow p-3 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex items-center">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for studio type, name, or amenities"
                className="w-full outline-none text-gray-700"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="hidden md:flex items-center p-3 border-r border-gray-200">
            <Calendar size={20} className="text-gray-400 mr-2" />
            <input
              type="date"
              className="w-full outline-none text-gray-700"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="hidden md:flex items-center p-3 border-r border-gray-200">
            <MapPin size={20} className="text-gray-400 mr-2" />
            <select
              className="w-full outline-none text-gray-700 bg-transparent"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Delhi">Delhi</option>
              <option value="South Delhi">South Delhi</option>
              <option value="North Delhi">North Delhi</option>
              <option value="East Delhi">East Delhi</option>
              <option value="West Delhi">West Delhi</option>
              <option value="Central Delhi">Central Delhi</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3">
            <button
              type="button"
              className="flex items-center text-gray-700 md:mr-4 hover:text-[#FF5A5F]"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter size={20} className="mr-1" />
              <span className="hidden md:inline">Filters</span>
            </button>
            <button
              type="submit"
              className="bg-[#FF5A5F] hover:bg-[#FF4045] text-white py-2 px-4 rounded-md transition duration-300"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters panel */}
        {isFiltersOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Studio Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={type}
                onChange={(e) => setType(e.target.value as StudioType)}
              >
                <option value="">All Types</option>
                {Object.values(StudioType).map((studioType) => (
                  <option key={studioType} value={studioType}>
                    {studioType.charAt(0).toUpperCase() + studioType.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;