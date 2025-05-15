import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import ConfirmationModal from '../components/ConfirmationModal';

interface Studio {
  id: string;
  name: string;
  price: number;
  currency: string;
}

interface BookingFormProps {
  studio: Studio;
  onBookingSubmit: (bookingData: {
    date: string;
    startTime: string;
    endTime: string;
    guests: number;
  }) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ studio, onBookingSubmit }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour < 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    
    const start = new Date(`2023-01-01T${startTime}`);
    const end = new Date(`2023-01-01T${endTime}`);
    
    if (end <= start) return 0;
    
    const diffMs = end.getTime() - start.getTime();
    return diffMs / (1000 * 60 * 60);
  };

  const calculateTotalPrice = () => {
    const hours = calculateHours();
    return studio.price * hours;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!date) {
      newErrors.date = 'Please select a date';
    } else if (selectedDate < today) {
      newErrors.date = 'Please select a future date';
    }
    
    if (!startTime) {
      newErrors.startTime = 'Please select a start time';
    }
    
    if (!endTime) {
      newErrors.endTime = 'Please select an end time';
    }
    
    if (startTime && endTime) {
      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`${date}T${endTime}`);
      
      if (end <= start) {
        newErrors.endTime = 'End time must be after start time';
      }

      const hours = calculateHours();
      if (hours > 8) {
        newErrors.endTime = 'Maximum booking duration is 8 hours';
      }
    }
    
    if (guests < 1) {
      newErrors.guests = 'At least one guest is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const bookingData = {
      date,
      startTime,
      endTime,
      guests,
      totalAmount: calculateTotalPrice(),
      currency: studio.currency
    };
    
    setCurrentBooking(bookingData);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      setIsSubmitting(true);
      await onBookingSubmit({
        date: currentBooking.date,
        startTime: currentBooking.startTime,
        endTime: currentBooking.endTime,
        guests: currentBooking.guests
      });
      
      setShowPaymentModal(false);
      setShowConfirmationModal(true);
      
      // Clear form
      setDate('');
      setStartTime('09:00');
      setEndTime('10:00');
      setGuests(1);
      setErrors({});
    } catch (error) {
      setErrors({
        submit: 'Failed to submit booking. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold">{studio.currency}{studio.price}</span>
            <span className="text-gray-600"> / hour</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-900">4.9</span>
            <span className="mx-1 text-gray-400">•</span>
            <span className="text-sm text-gray-600">120 reviews</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                name="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]`}
                required
              />
            </div>
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock size={18} className="text-gray-400" />
                </div>
                <select
                  id="startTime"
                  name="startTime"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    // Automatically set end time to 1 hour after start time
                    const startHour = parseInt(e.target.value.split(':')[0]);
                    const startMinute = e.target.value.split(':')[1];
                    const endHour = (startHour + 1).toString().padStart(2, '0');
                    setEndTime(`${endHour}:${startMinute}`);
                  }}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.startTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]`}
                  required
                >
                  {timeOptions.map((time) => (
                    <option key={`start-${time}`} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock size={18} className="text-gray-400" />
                </div>
                <select
                  id="endTime"
                  name="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.endTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]`}
                  required
                >
                  {timeOptions.map((time) => (
                    <option key={`end-${time}`} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Guests
            </label>
            <select
              id="guests"
              name="guests"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
            {errors.guests && <p className="mt-1 text-sm text-red-600">{errors.guests}</p>}
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>{studio.currency}{studio.price} × {calculateHours()} hours</span>
              <span>{studio.currency}{calculateTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{studio.currency}{calculateTotalPrice().toFixed(2)}</span>
            </div>
          </div>
          
          {errors.submit && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FF5A5F] text-white py-3 px-4 rounded-md hover:bg-[#FF4045] transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Book Now'}
          </button>
        </form>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={currentBooking?.totalAmount || 0}
        currency={studio.currency}
      />

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        bookingDetails={currentBooking || {
          date: '',
          startTime: '',
          endTime: '',
          guests: 0,
          totalAmount: 0,
          currency: studio.currency
        }}
      />
    </>
  );
};

export default BookingForm; 