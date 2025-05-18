import { Studio, StudioType } from '../types';

export const studios: Studio[] = [
  {
    id: '1',
    name: 'Sonic Sphere Studios',
    type: StudioType.PODCAST,
    description: 'Professional podcast studio with top-notch acoustic treatment and equipment. Perfect for podcasters, voiceover artists, and audio content creators.',
    address: 'Block C, Connaught Place, New Delhi',
    location: {
      latitude: 28.6315,
      longitude: 77.2167
    },
    price: 800,
    currency: '₹',
    rating: 4.8,
    reviewCount: 124,
    amenities: ['Soundproofing', 'Microphones', 'Headphones', 'Mixer', 'Recording Software', 'Coffee Machine'],
    images: [
      'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    available: true
  },
  {
    id: '2',
    name: 'Rhythm Revolution',
    type: StudioType.DANCE,
    description: 'Spacious dance studio with mirrors, professional sound system, and wooden floors. Perfect for choreographers and dance enthusiasts.',
    address: 'Safdarjung Development Area, New Delhi',
    location: {
      latitude: 28.5491,
      longitude: 77.2088
    },
    price: 1200,
    currency: '₹',
    rating: 4.6,
    reviewCount: 87,
    amenities: ['Full Wall Mirrors', 'Professional Sound System', 'Changing Rooms', 'Air Conditioning', 'Water Dispenser', 'Waiting Area'],
    images: [
      'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3766189/pexels-photo-3766189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    available: true
  },
  {
    id: '3',
    name: 'Visual Vortex',
    type: StudioType.PHOTOGRAPHY,
    description: 'Modern photography studio with various backdrops, lighting equipment, and props. Ideal for professional photoshoots and content creation.',
    address: 'Hauz Khas Village, New Delhi',
    location: {
      latitude: 28.5531,
      longitude: 77.1919
    },
    price: 1500,
    currency: '₹',
    rating: 4.9,
    reviewCount: 156,
    amenities: ['Professional Lighting', 'Multiple Backdrops', 'Props', 'Makeup Area', 'Changing Room', 'High-Speed WiFi'],
    images: [
      'https://images.pexels.com/photos/7736009/pexels-photo-7736009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3379943/pexels-photo-3379943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    available: true
  },
  {
    id: '4',
    name: 'Cinema Central',
    type: StudioType.VIDEO,
    description: 'Full-service video production studio with green screen, lighting, and editing workstations. Perfect for YouTubers and video content creators.',
    address: 'Lajpat Nagar, New Delhi',
    location: {
      latitude: 28.5700,
      longitude: 77.2373
    },
    price: 2000,
    currency: '₹',
    rating: 4.7,
    reviewCount: 93,
    amenities: ['Green Screen', 'Professional Lighting', 'Camera Equipment', 'Editing Stations', 'Sound Booth', 'Rest Area'],
    images: [
      'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3379945/pexels-photo-3379945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    available: true
  },
  {
    id: '5',
    name: 'Melody Mansion',
    type: StudioType.MUSIC,
    description: 'Professional music recording studio with isolation booth, control room, and high-end equipment. Ideal for musicians and composers.',
    address: 'Vasant Kunj, New Delhi',
    location: {
      latitude: 28.5250,
      longitude: 77.1569
    },
    price: 1800,
    currency: '₹',
    rating: 4.5,
    reviewCount: 78,
    amenities: ['Recording Equipment', 'Soundproofing', 'Musical Instruments', 'Mixing Console', 'Control Room', 'Lounge Area'],
    images: [
      'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4087996/pexels-photo-4087996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    available: true
  },
  {
    id: '6',
    name: 'Creative Commons',
    type: StudioType.MULTIPURPOSE,
    description: 'Versatile studio space that can be configured for various creative purposes. Suitable for workshops, small events, and collaborative projects.',
    address: 'Greater Kailash, New Delhi',
    location: {
      latitude: 28.5439,
      longitude: 77.2467
    },
    price: 1400,
    currency: '₹',
    rating: 4.4,
    reviewCount: 62,
    amenities: ['Flexible Space', 'Basic Lighting', 'Audio Equipment', 'Tables & Chairs', 'Projector', 'Whiteboard'],
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7955091/pexels-photo-7955091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    available: true
  }
];

export const getStudioById = (id: string): Studio | undefined => {
  return studios.find(studio => studio.id === id);
};

export const getStudiosByType = (type?: StudioType): Studio[] => {
  if (!type) return studios;
  return studios.filter(studio => studio.type === type);
};

export const getStudiosByFilter = (filters: {
  type?: StudioType;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  amenities?: string[];
}): Studio[] => {
  return studios.filter(studio => {
    // Filter by type
    if (filters.type && studio.type !== filters.type) return false;
    
    // Filter by price range
    if (filters.priceMin && studio.price < filters.priceMin) return false;
    if (filters.priceMax && studio.price > filters.priceMax) return false;
    
    // Filter by minimum rating
    if (filters.rating && studio.rating < filters.rating) return false;
    
    // Filter by amenities (if specified, studio must have ALL amenities)
    if (filters.amenities && filters.amenities.length > 0) {
      if (!filters.amenities.every(amenity => studio.amenities.includes(amenity))) {
        return false;
      }
    }
    
    return true;
  });
};