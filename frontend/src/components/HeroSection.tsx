import React from 'react';
import SearchBar from './SearchBar';
import { StudioType } from '../types';

interface HeroSectionProps {
  onSearch: (query: string, filters: {
    type?: StudioType;
    date?: string;
    location?: string;
  }) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  return (
    <div className="relative bg-[#0F172A] text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Studio background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#0F172A]/70 to-[#0F172A]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Find the perfect creative space in Delhi
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Book podcast studios, dance halls, photo spaces, and more
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer">
            <h3 className="font-semibold text-lg mb-1">Podcast Studios</h3>
            <p className="text-gray-300 text-sm">Professional audio equipment</p>
          </div>
          <div className="p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer">
            <h3 className="font-semibold text-lg mb-1">Dance Studios</h3>
            <p className="text-gray-300 text-sm">Spacious rooms with mirrors</p>
          </div>
          <div className="p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer">
            <h3 className="font-semibold text-lg mb-1">Photo Studios</h3>
            <p className="text-gray-300 text-sm">Perfect lighting and backdrops</p>
          </div>
          <div className="p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer">
            <h3 className="font-semibold text-lg mb-1">Video Studios</h3>
            <p className="text-gray-300 text-sm">Green screens and equipment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;