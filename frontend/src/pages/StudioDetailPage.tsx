import React, { useEffect, useState } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight, Heart, Calendar, Clock, Wifi, Coffee, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BookingForm from '../components/BookingForm';
import ReviewSection from '../components/ReviewSection';
import MapView from '../components/MapView';
import { Link } from '../components/Link';
import { BookingStatus } from '../types';

const StudioDetailPage: React.FC = () => {
  const { selectedStudio, reviews, navigateTo, addReview, createBooking } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);
  
  const studioReviews = reviews.filter(review => selectedStudio && review.studioId === selectedStudio.id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedStudio]);
  
  if (!selectedStudio) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Studio not found</h2>
          <p className="mb-6">The studio you are looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigateTo('/studios')}
            className="bg-[#FF5A5F] text-white py-2 px-4 rounded-md hover:bg-[#FF4045] transition duration-300"
          >
            Back to Studios
          </button>
        </div>
      </div>
    );
  }
  
  const handleBookingSubmit = (bookingData: {
    date: string;
    startTime: string;
    endTime: string;
    guests: number;
  }) => {
    // Calculate total price
    const start = new Date(`2023-01-01T${bookingData.startTime}`);
    const end = new Date(`2023-01-01T${bookingData.endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const totalPrice = selectedStudio.price * diffHours;
    
    createBooking({
      studioId: selectedStudio.id,
      userId: 'user-1', // In a real app, this would come from auth
      date: bookingData.date,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      totalPrice,
      status: BookingStatus.CONFIRMED
    });
    
    // Navigate to a confirmation page or show a success modal
    alert('Booking submitted successfully!');
  };
  
  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === selectedStudio.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? selectedStudio.images.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className="bg-white min-h-screen">
      {/* Image Gallery */}
      {showImageGallery ? (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setShowImageGallery(false)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            X
          </button>
          <button
            onClick={handlePrevImage}
            className="absolute left-4 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <ChevronLeft size={24} />
          </button>
          <img
            src={selectedStudio.images[activeImageIndex]}
            alt={selectedStudio.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            onClick={handleNextImage}
            className="absolute right-4 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <Link
            to="/studios"
            className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <ChevronLeft size={24} />
          </Link>
          <button
            className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <Heart size={24} className="text-gray-600 hover:text-[#FF5A5F]" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[50vh]">
            <div 
              className="relative cursor-pointer"
              onClick={() => {
                setActiveImageIndex(0);
                setShowImageGallery(true);
              }}
            >
              <img
                src={selectedStudio.images[0]}
                alt={selectedStudio.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:grid grid-cols-2 gap-2">
              {selectedStudio.images.slice(1, 5).map((image, index) => (
                <div 
                  key={index}
                  className="relative cursor-pointer"
                  onClick={() => {
                    setActiveImageIndex(index + 1);
                    setShowImageGallery(true);
                  }}
                >
                  <img
                    src={image}
                    alt={`${selectedStudio.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {index === 3 && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white">
                      <span className="font-medium">+{selectedStudio.images.length - 4} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold capitalize mr-2">
                  {selectedStudio.type}
                </span>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} className="fill-current" />
                  <span className="ml-1 text-gray-900">{selectedStudio.rating}</span>
                </div>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-sm text-gray-600">{selectedStudio.reviewCount} reviews</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedStudio.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={18} className="mr-1" />
                <span>{selectedStudio.address}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 py-6">
              <h2 className="text-xl font-semibold mb-4">About this space</h2>
              <p className="text-gray-700 mb-6">{selectedStudio.description}</p>
              
              <h3 className="font-semibold mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-y-2 mb-6">
                {selectedStudio.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={18} className="text-green-500 mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 py-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <MapView
                studios={[selectedStudio]}
                selectedStudioId={selectedStudio.id}
              />
              <p className="mt-2 text-gray-600">{selectedStudio.address}, Delhi, India</p>
            </div>
            
            <div className="border-t border-gray-200 py-6">
              <ReviewSection
                reviews={studioReviews}
                studioId={selectedStudio.id}
                onAddReview={addReview}
              />
            </div>
          </div>
          
          <div className="md:w-1/3 md:sticky md:top-24 h-fit">
            <BookingForm
              studio={selectedStudio}
              onBookingSubmit={handleBookingSubmit}
            />
          </div>
        </div>
      </div>
      
      {/* Similar Studios */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Similar Studios in Delhi</h2>
          
          {/* This would be populated with actual similar studios in a real app */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* We're showing the same studio 3 times for demo purposes */}
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={selectedStudio.images[index % selectedStudio.images.length]}
                  alt="Similar studio"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">Similar {selectedStudio.type} Studio</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>Central Delhi</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} className="fill-current" />
                      <span className="ml-1 font-medium text-gray-900">4.7</span>
                    </div>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">42 reviews</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioDetailPage;