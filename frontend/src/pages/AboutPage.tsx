import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About SocialMap</h1>
        
        <div className="prose max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            SocialMap is Delhi's premier platform for discovering and booking creative spaces. 
            We connect content creators, artists, and professionals with high-quality studios 
            for their creative endeavors.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To empower creators by providing easy access to professional spaces and equipment, 
                enabling them to bring their creative visions to life without the burden of 
                ownership or long-term commitments.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To become the go-to platform for creative space rentals, fostering a vibrant 
                community of creators and helping them achieve their artistic goals.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-6">Why Choose SocialMap?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-2">Curated Spaces</h3>
                <p className="text-gray-600">
                  Every studio on our platform is carefully vetted to ensure it meets our 
                  high standards for quality and professionalism.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Instant Booking</h3>
                <p className="text-gray-600">
                  Book your desired studio instantly with our seamless reservation system 
                  and secure payment process.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Local Focus</h3>
                <p className="text-gray-600">
                  We specialize in Delhi's creative spaces, offering deep local knowledge 
                  and personalized support.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0F172A] text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Join Our Community</h2>
            <p className="mb-4">
              Whether you're a podcaster, dancer, photographer, or content creator, 
              SocialMap is here to support your creative journey.
            </p>
            <button className="bg-[#FF5A5F] hover:bg-[#FF4045] text-white px-6 py-3 rounded-md transition duration-300">
              Start Creating Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;