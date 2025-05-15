export interface Studio {
  id: string;
  name: string;
  type: StudioType;
  description: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  price: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  images: string[];
  available: boolean;
}

export enum StudioType {
  PODCAST = 'podcast',
  DANCE = 'dance',
  PHOTOGRAPHY = 'photography',
  VIDEO = 'video',
  MUSIC = 'music',
  MULTIPURPOSE = 'multipurpose'
}

export interface Booking {
  id: string;
  studioId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: BookingStatus;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  phone?: string;
  bookings?: Booking[];
  favorites?: string[];
  profilePicture?: string;
}

export interface Review {
  id: string;
  studioId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SearchFilters {
  type?: StudioType;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  amenities?: string[];
  date?: string;
}