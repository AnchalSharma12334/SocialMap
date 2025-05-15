import React from 'react';
import HeroSection from '../components/HeroSection';
import StudioCard from '../components/StudioCard';
import { useApp } from '../context/AppContext';
import { StudioType } from '../types';

const HomePage: React.FC = () => {
  const { studios, navigateTo, searchStudios } = useApp();
  
  // Get featured studios of different types
  const getFeaturedByType = (type: StudioType) => {
    return studios.filter(studio => studio.type === type)[0];
  };
  
  const handleSearch = (query: string, filters: any) => {
    searchStudios(query, filters);
    navigateTo('/studios');
  };
  
  const featuredPodcast = getFeaturedByType(StudioType.PODCAST);
  const featuredDance = getFeaturedByType(StudioType.DANCE);
  const featuredPhoto = getFeaturedByType(StudioType.PHOTOGRAPHY);
  const featuredVideo = getFeaturedByType(StudioType.VIDEO);
  
  return (
    <div>
      <HeroSection onSearch={handleSearch} />
      
      {/* Featured Studios Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Studios in Delhi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPodcast && <StudioCard studio={featuredPodcast} />}
            {featuredDance && <StudioCard studio={featuredDance} />}
            {featuredPhoto && <StudioCard studio={featuredPhoto} />}
            {featuredVideo && <StudioCard studio={featuredVideo} />}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How SocialMap Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF5A5F] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Search Studios</h3>
              <p className="text-gray-600">
                Browse our selection of high-quality studios across Delhi. Filter by type, location, and amenities.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF5A5F] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Book Instantly</h3>
              <p className="text-gray-600">
                Select your preferred date and time slot, and book your studio instantly with our secure booking system.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF5A5F] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Create & Collaborate</h3>
              <p className="text-gray-600">
                Enjoy your creative session in a professional environment. Share your experience and leave a review.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center text-yellow-500 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "SocialMap made finding a podcast studio in Delhi so easy! The booking process was smooth, and the studio exceeded my expectations."
              </p>
              <div className="font-semibold">Aditya Sharma</div>
              <div className="text-sm text-gray-500">Podcast Host</div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center text-yellow-500 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "As a dance choreographer, finding quality rehearsal spaces is crucial. SocialMap has an amazing selection of dance studios with perfect facilities."
              </p>
              <div className="font-semibold">Neha Gupta</div>
              <div className="text-sm text-gray-500">Dance Choreographer</div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center text-yellow-500 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I needed a professional video studio for my YouTube content, and SocialMap delivered! Great spaces with all the equipment I needed."
              </p>
              <div className="font-semibold">Vikram Kapoor</div>
              <div className="text-sm text-gray-500">Content Creator</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book your perfect studio?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of creators who use SocialMap to find and book the best studios in Delhi.
          </p>
          <button 
            onClick={() => navigateTo('/studios')}
            className="bg-[#FF5A5F] hover:bg-[#FF4045] text-white font-bold py-3 px-8 rounded-md transition duration-300"
          >
            Explore Studios
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;