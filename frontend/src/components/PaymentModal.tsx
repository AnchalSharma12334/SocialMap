import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  currency: string;
}

declare global {
  interface Window {
    Cashfree: any;
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  currency
}) => {
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"; // switch to production when ready
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  const handlePayment = async () => {
    try {
      const res = await fetch('https://social-map-2rio.vercel.app/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          customerId: 'customer_001' // replace with actual user/customer ID
        })
      });

      const { orderToken } = await res.json();

      if (!orderToken) {
        throw new Error('Failed to get order token');
      }

      const cashfree = new window.Cashfree({ mode: "production" }); // change to "production" when live

      const paymentConfig = {
        orderToken,
        orderCurrency: currency,
        orderAmount: amount,
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "9999999999",
        onSuccess: (data: any) => {
          console.log("Payment success", data);
          onSuccess();
        },
        onFailure: (data: any) => {
          console.error("Payment failed", data);
        },
        onClose: () => {
          console.log("Widget closed");
          onClose();
        },
      };

      cashfree.checkout(paymentConfig);

    } catch (error) {
      console.error('Payment failed:', error);
      alert('Something went wrong while initiating payment.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-semibold">{currency}{amount.toFixed(2)}</span>
          </div>

          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-sm text-gray-600">
              You will be redirected to complete the payment via Cashfree.
            </p>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-[#FF5A5F] text-white py-3 px-4 rounded-md hover:bg-[#FF4045] transition duration-300"
        >
          Pay {currency}{amount.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
