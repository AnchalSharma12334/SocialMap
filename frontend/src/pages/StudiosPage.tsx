import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import StudioCard from '../components/StudioCard';
import SearchBar from '../components/SearchBar';
import StudioFilter from '../components/StudioFilter';
import MapView from '../components/MapView';
import { MapPin, Grid, List } from 'lucide-react';
import { StudioType } from '../types';

const StudiosPage: React.FC = () => {
  const { filteredStudios, searchStudios } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showMap, setShowMap] = useState(false);
  
  const handleSearch = (query: string, filters: any) => {
    searchStudios(query, filters);
  };
  
  const handleFilterChange = (filters: {
    type?: StudioType;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    amenities?: string[];
  }) => {
    searchStudios('', filters);
  };
  
  useEffect(() => {
    // Check if there's a type filter in the URL
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    
    if (typeParam) {
      searchStudios('', { type: typeParam as StudioType });
    }
  }, []);

  //  sync showMap state with viewMode changes
  useEffect(() => {
    if (viewMode === 'map' && !showMap) {
      setShowMap(true);
    }
  }, [viewMode, showMap]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0F172A] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-bold mb-6">Find Your Perfect Studio</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {filteredStudios.length} Studios in Delhi
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'
              }`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => {
                setShowMap(!showMap);
                if (!showMap) setViewMode('map');
              }}
              className={`p-2 rounded-md ${
                viewMode === 'map' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'
              }`}
            >
              <MapPin size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-1/4">
            <StudioFilter onFilterChange={handleFilterChange} />
          </div>
          
          {/* Studios List or Grid */}
          <div className="md:w-3/4">
            {showMap && (
              <div className="mb-8">
                <MapView studios={filteredStudios} />
              </div>
            )}
            
            {viewMode !== 'map' && (
              <div className={`grid ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              } gap-6`}>
                {filteredStudios.length > 0 ? (
                  filteredStudios.map(studio => (
                    <StudioCard key={studio.id} studio={studio} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center bg-white rounded-lg">
                    <p className="text-xl text-gray-600">No studios found matching your criteria.</p>
                    <button
                      onClick={() => searchStudios('', {})}
                      className="mt-4 text-[#FF5A5F] hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudiosPage;
