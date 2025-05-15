import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Studio, StudioType, Review, Booking, User } from '../types';
import { studios, getStudioById, getStudiosByFilter } from '../data/studios';
import { auth, googleProvider, facebookProvider, twitterProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';


// API URL from environment or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface AppContextType {
  studios: Studio[];
  filteredStudios: Studio[];
  selectedStudio: Studio | null;
  reviews: Review[];
  bookings: Booking[];
  userId: string | null;
  user: User | null;
  isLoggedIn: boolean;
  currentPath: string;
  authError: string | null;
  isLoading: boolean;
  
  searchStudios: (query: string, filters: any) => void;
  selectStudio: (id: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  createBooking: (booking: Omit<Booking, 'id'>) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  navigateTo: (path: string) => void;
  updateUserProfile: (data: { name?: string, email?: string }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearAuthError: () => void;
  socialLogin: (provider: typeof googleProvider | typeof facebookProvider | typeof twitterProvider) => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored token on app load
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser().catch(error => {
        console.error('Error in initial auth check:', error);
        setIsLoading(false);
      });
    }

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

  const socialLogin = async (provider: typeof googleProvider | typeof facebookProvider | typeof twitterProvider) => {
    setIsLoading(true);
    setAuthError(null);
  
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const token = await firebaseUser.getIdToken();
  
      localStorage.setItem('token', token);
      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        profilePicture: firebaseUser.photoURL || '',
        role: 'user'
      });
      setUserId(firebaseUser.uid);
      setIsLoggedIn(true);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Social login failed');
      console.error('Social login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
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

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setUserId(data.user.id);
      setIsLoggedIn(true);
      
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Registration failed');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setUserId(data.user.id);
      setIsLoggedIn(true);
      
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get user data');
      }
      
      setUser(data.user);
      setUserId(data.user.id);
      setIsLoggedIn(true);
      
    } catch (error) {
      console.error('Error fetching current user:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (data: { name?: string; email?: string }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setAuthError('You must be logged in to update your profile');
      return;
    }
    
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to update profile');
      }
      
      setUser(responseData.user);
      
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Failed to update profile');
      console.error('Update profile error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setAuthError('You must be logged in to change your password');
      return;
    }
    
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const response = await fetch(`${API_URL}/auth/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password');
      }
      
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Failed to change password');
      console.error('Change password error:', error);
    } finally {
      setIsLoading(false);
    }
    };
    
    const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserId(null);
    setIsLoggedIn(false);
    };
    
    const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    const match = path.match(/\/studios\/(.+)/);
    if (match && match[1]) {
      const studio = getStudioById(match[1]);
      if (studio) {
        setSelectedStudio(studio);
      }
    } else {
      setSelectedStudio(null);
    }
    };
    
    const clearAuthError = () => {
    setAuthError(null);
    };
    
    return (
      <AppContext.Provider
        value={{
          studios,
          filteredStudios,
          selectedStudio,
          reviews,
          bookings,
          userId,
          user,
          isLoggedIn,
          currentPath,
          authError,
          isLoading,
          searchStudios,
          selectStudio,
          addReview,
          createBooking,
          login,
          register,
          logout,
          navigateTo,
          updateUserProfile,
          changePassword,
          getCurrentUser,
          clearAuthError,
          socialLogin,

        }}
      >
        {children}
      </AppContext.Provider>
    );    
    };
    
    export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
    throw new Error('useApp must be used within an AppProvider');
    }
    return context;
    };