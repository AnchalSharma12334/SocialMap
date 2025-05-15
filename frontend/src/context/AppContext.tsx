import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Studio, StudioType, Review, Booking } from '../types';
import { studios, getStudioById, getStudiosByFilter } from '../data/studios';

interface AppContextType {
  studios: Studio[];
  filteredStudios: Studio[];
  selectedStudio: Studio | null;
  reviews: Review[];
  bookings: Booking[];
  userId: string | null;
  isLoggedIn: boolean;
  currentPath: string;
  
  searchStudios: (query: string, filters: any) => void;
  selectStudio: (id: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  createBooking: (booking: Omit<Booking, 'id'>) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  navigateTo: (path: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filteredStudios, setFilteredStudios] = useState<Studio[]>(studios);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      studioId: '1',
      userId: 'user1',
      userName: 'Rahul Sharma',
      rating: 5,
      comment: 'Amazing studio with top-notch equipment. The acoustics are perfect and the staff is extremely helpful.',
      date: '2023-05-15'
    },
    {
      id: '2',
      studioId: '1',
      userId: 'user2',
      userName: 'Priya Patel',
      rating: 4,
      comment: 'Great equipment and very comfortable environment. Would definitely book again for my podcast recordings.',
      date: '2023-06-22'
    },
    {
      id: '3',
      studioId: '2',
      userId: 'user3',
      userName: 'Ananya Singh',
      rating: 5,
      comment: 'Perfect space for dance practice. The mirrors and wooden floors are excellent quality.',
      date: '2023-07-10'
    }
  ]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      
      // Extract studio ID from URL if on a studio detail page
      const match = window.location.pathname.match(/\/studios\/(.+)/);
      if (match && match[1]) {
        const studioId = match[1];
        const studio = getStudioById(studioId);
        if (studio) {
          setSelectedStudio(studio);
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Initial path check
    handleLocationChange();
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const searchStudios = (query: string, filters: {
    type?: StudioType;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    amenities?: string[];
  }) => {
    let result = studios;
    
    // Apply filters
    result = getStudiosByFilter(filters);
    
    // Apply text search if query exists
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(studio => 
        studio.name.toLowerCase().includes(lowercaseQuery) ||
        studio.description.toLowerCase().includes(lowercaseQuery) ||
        studio.type.toLowerCase().includes(lowercaseQuery) ||
        studio.amenities.some(amenity => amenity.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    setFilteredStudios(result);
  };

  const selectStudio = (id: string) => {
    const studio = getStudioById(id);
    if (studio) {
      setSelectedStudio(studio);
    }
  };

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([...reviews, newReview]);
  };

  const createBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`
    };
    
    setBookings([...bookings, newBooking]);
  };

  const login = (email: string, password: string) => {
    // Simulate login
    setUserId('user1');
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserId(null);
    setIsLoggedIn(false);
  };

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    
    // If navigating to a studio detail page, update selected studio
    const match = path.match(/\/studios\/(.+)/);
    if (match && match[1]) {
      const studioId = match[1];
      selectStudio(studioId);
    } else {
      // Clear selected studio when not on a studio page
      setSelectedStudio(null);
    }
    
    // Dispatch a popstate event to notify the app about the navigation
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const value = {
    studios,
    filteredStudios,
    selectedStudio,
    reviews,
    bookings,
    userId,
    isLoggedIn,
    currentPath,
    
    searchStudios,
    selectStudio,
    addReview,
    createBooking,
    login,
    logout,
    navigateTo
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};