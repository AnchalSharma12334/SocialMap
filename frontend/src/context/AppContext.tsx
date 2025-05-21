import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Studio, StudioType, Review, Booking, User, BookingStatus } from '../types';
import { studios, getStudioById, getStudiosByFilter } from '../data/studios';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, UserCredential, signOut } from 'firebase/auth';
import { SnackbarType } from '../components/Snackbar';

// API URL from environment or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

interface SnackbarState {
  open: boolean;
  message: string;
  type: SnackbarType;
}

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
  
  // Snackbar state
  snackbar: SnackbarState;
  showSnackbar: (message: string, type: SnackbarType) => void;
  hideSnackbar: () => void;
  
  searchStudios: (query: string, filters: any) => void;
  selectStudio: (id: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  createBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  navigateTo: (path: string) => void;
  updateUserProfile: (data: { name?: string, email?: string }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearAuthError: () => void;
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
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '', type: 'info' });

  useEffect(() => {
    // Check for stored token on app load
    const token = localStorage.getItem('token');
    if (token) {
      // Don't wait for the result in the useEffect
      getCurrentUser().catch(error => {
        console.error('Error in initial auth check:', error);
        // Reset loading state in case of error to prevent endless loading
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
      const response = await fetch(`https://social-map-2rio.vercel.app/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Special handling for duplicate email error
        if (data.error === "User already registered with this email address") {
          const errorMessage = "This email is already registered. If you previously signed in with Google, please use Google Sign-In instead.";
          showSnackbar(data.error, 'error');
          throw new Error(errorMessage);
        }
        throw new Error(data.error || 'Registration failed');
      }
      
      // Save token to local storage
      localStorage.setItem('token', data.token);
      
      // Set user data and auth state
      setUser(data.user);
      setUserId(data.user.id);
      setIsLoggedIn(true);
      
      // Show success message
      showSnackbar('Registration successful!', 'success');
      
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Registration failed');
      if (!(error instanceof Error && error.message.includes("User already registered"))) {
        showSnackbar(error instanceof Error ? error.message : 'Registration failed', 'error');
      }
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const response = await fetch(`https://social-map-2rio.vercel.app/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Special handling for Google-authenticated accounts
        if (data.error === "Invalid credentials" && data.isGoogleAccount) {
          const errorMessage = "This email is registered with Google. Please use the 'Sign in with Google' button instead.";
          showSnackbar(errorMessage, 'error');
          throw new Error(errorMessage);
        }
        throw new Error(data.error || 'Login failed');
      }
      
      // Save token to local storage
      localStorage.setItem('token', data.token);
      
      // Set user data and auth state
      setUser(data.user);
      setUserId(data.user.id);
      setIsLoggedIn(true);
      
      // Show success message
      showSnackbar('Successfully logged in!', 'success');
      
      return true; // Login successful
      
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed');
      // Only show the snackbar for regular errors
      if (!(error instanceof Error && error.message.includes("Google"))) {
        showSnackbar(error instanceof Error ? error.message : 'Login failed', 'error');
      }
      console.error('Login error:', error);
      return false; // Login failed
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Use Firebase to sign in with Google
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      const { user: firebaseUser } = result;
      
      if (!firebaseUser.email) {
        throw new Error('Google authentication failed: No email provided');
      }
      
      // Get user info from Firebase
      const userData = {
        name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        email: firebaseUser.email,
        firebaseId: firebaseUser.uid,
        avatar: firebaseUser.photoURL || '',
      };
      
      console.log('Sending Google auth data to backend:', userData);
      console.log('Request URL:', `${API_URL}/auth/google`);
      
      // Send to backend to create/update user and get JWT
      const response = await fetch(`https://social-map-2rio.vercel.app/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        console.error('Google auth failed with status:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        // Try to parse as JSON, but handle case where it's not JSON
        let data;
        try {
          data = JSON.parse(errorText);
        } catch (e) {
          throw new Error(`Google login failed: ${response.status} ${response.statusText}`);
        }
        
        throw new Error(data.error || 'Google login failed');
      }
      
      const data = await response.json();
      
      // Save token to local storage
      localStorage.setItem('token', data.token);
      
      // Set user data and auth state
      setUser(data.user);
      setUserId(data.user.id);
      setIsLoggedIn(true);
      
      // Show success message
      showSnackbar('Successfully signed in with Google!', 'success');
      
      return true; // Login successful
      
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Google login failed');
      showSnackbar(error instanceof Error ? error.message : 'Google login failed', 'error');
      console.error('Google login error:', error);
      // Sign out from Firebase if backend authentication failed
      await signOut(auth).catch(e => console.error('Firebase sign out error:', e));
      return false; // Login failed
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
      const response = await fetch(`https://social-map-eew7.vercel.app/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get user data');
      }
      
      // Set user data and auth state
      setUser(data.user);
      setUserId(data.user.id);
      setIsLoggedIn(true);
      
    } catch (error) {
      console.error('Error fetching current user:', error);
      // Clear invalid token
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
      const response = await fetch(`https://social-map-eew7.vercel.app/auth/me`, {
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
      
      // Update user data
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
      const response = await fetch(`https://social-map-eew7.vercel.app/auth/password`, {
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
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Sign out from Firebase if user was signed in with Google
    if (user?.firebaseId) {
      signOut(auth).catch(e => console.error('Firebase sign out error:', e));
    }
    
    // Reset state
    setUser(null);
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

  const clearAuthError = () => {
    setAuthError(null);
  };

  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({ open: true, message, type });
  };

  const hideSnackbar = () => {
    setSnackbar({ open: false, message: '', type: 'info' });
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    // Update booking status locally
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status } 
          : booking
      )
    );
    
    // In a real application, you would also make an API call here
    // to update the booking status on the server
    // Example:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   fetch(`${API_URL}/bookings/${bookingId}`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({ status }),
    //   }).catch(error => {
    //     console.error('Error updating booking status:', error);
    //   });
    // }
  };

  const value = {
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
    snackbar,
    showSnackbar,
    hideSnackbar,
    
    searchStudios,
    selectStudio,
    addReview,
    createBooking,
    updateBookingStatus,
    login,
    loginWithGoogle,
    register,
    logout,
    navigateTo,
    updateUserProfile,
    changePassword,
    getCurrentUser,
    clearAuthError
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