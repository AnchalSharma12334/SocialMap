import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookingStatus, Studio, Booking } from '../types';

const StatusIndicator: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case BookingStatus.PENDING:
        return { icon: <AlertCircle size={16} />, text: 'Pending', classes: 'bg-yellow-100 text-yellow-800' };
      case BookingStatus.CONFIRMED:
        return { icon: <CheckCircle size={16} />, text: 'Confirmed', classes: 'bg-blue-100 text-blue-800' };
      case BookingStatus.CANCELLED:
        return { icon: <XCircle size={16} />, text: 'Cancelled', classes: 'bg-red-100 text-red-800' };
      case BookingStatus.COMPLETED:
        return { icon: <CheckCircle2 size={16} />, text: 'Completed', classes: 'bg-green-100 text-green-800' };
      default:
        return { icon: <AlertCircle size={16} />, text: 'Unknown', classes: 'bg-gray-100 text-gray-800' };
    }
  };

  const { icon, text, classes } = getStatusInfo();

  return (
    <div className={`flex items-center px-3 py-1 rounded-full ${classes}`}>
      {icon}
      <span className="ml-1 text-sm font-medium">{text}</span>
    </div>
  );
};

const BookingCard: React.FC<{ booking: Booking; studio: Studio | undefined }> = ({ booking, studio }) => {
  if (!studio) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={studio.images[0]}
          alt={studio.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <StatusIndicator status={booking.status} />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{studio.name}</h3>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>{studio.address}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>{new Date(booking.date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2" />
            <span>{booking.startTime} - {booking.endTime}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-gray-900">₹{booking.totalPrice}</span>
          
          {booking.status === BookingStatus.PENDING && (
            <div className="space-x-2">
              <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors">
                Pay Now
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors">
                Cancel
              </button>
            </div>
          )}
          
          {booking.status === BookingStatus.CONFIRMED && (
            <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors">
              Cancel
            </button>
          )}
          
          {booking.status === BookingStatus.COMPLETED && (
            <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
              Write Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const BookingsPage: React.FC = () => {
  const { bookings, user, studios, isLoggedIn, navigateTo } = useApp();
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  
  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedIn) {
      navigateTo('/login');
    }
  }, [isLoggedIn, navigateTo]);

  useEffect(() => {
    // Filter bookings by selected status
    if (statusFilter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(booking => booking.status === statusFilter));
    }
  }, [bookings, statusFilter]);

  const getStudioById = (studioId: string): Studio | undefined => {
    return studios.find(studio => studio.id === studioId);
  };

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  // If there are no bookings
  if (bookings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-medium text-gray-700 mb-4">You don't have any bookings yet</h3>
          <p className="text-gray-500 mb-6">Explore our studios and book your first session today!</p>
          <button 
            onClick={() => navigateTo('/studios')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Studios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
      
      {/* Filter bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">Filter by status:</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md text-sm ${
                statusFilter === 'all' 
                  ? 'bg-blue-100 text-blue-800 font-medium' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setStatusFilter(BookingStatus.PENDING)}
              className={`px-3 py-1 rounded-md text-sm ${
                statusFilter === BookingStatus.PENDING 
                  ? 'bg-yellow-100 text-yellow-800 font-medium' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setStatusFilter(BookingStatus.CONFIRMED)}
              className={`px-3 py-1 rounded-md text-sm ${
                statusFilter === BookingStatus.CONFIRMED 
                  ? 'bg-blue-100 text-blue-800 font-medium' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Confirmed
            </button>
            <button 
              onClick={() => setStatusFilter(BookingStatus.COMPLETED)}
              className={`px-3 py-1 rounded-md text-sm ${
                statusFilter === BookingStatus.COMPLETED 
                  ? 'bg-green-100 text-green-800 font-medium' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button 
              onClick={() => setStatusFilter(BookingStatus.CANCELLED)}
              className={`px-3 py-1 rounded-md text-sm ${
                statusFilter === BookingStatus.CANCELLED 
                  ? 'bg-red-100 text-red-800 font-medium' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>
      
      {/* Bookings grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.map(booking => (
          <BookingCard 
            key={booking.id} 
            booking={booking} 
            studio={getStudioById(booking.studioId)} 
          />
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;