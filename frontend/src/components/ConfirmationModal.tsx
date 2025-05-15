import React from 'react';
import { Check, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    date: string;
    startTime: string;
    endTime: string;
    guests: number;
    totalAmount: number;
    currency: string;
  };
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookingDetails
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Booking Confirmed!</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <Check size={48} className="text-green-500" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{new Date(bookingDetails.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span>{bookingDetails.startTime} - {bookingDetails.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span>{bookingDetails.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold">
                  {bookingDetails.currency}{bookingDetails.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              A confirmation email has been sent to your registered email address.
            </p>
            <button
              onClick={onClose}
              className="bg-[#FF5A5F] text-white py-2 px-6 rounded-md hover:bg-[#FF4045] transition duration-300"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;