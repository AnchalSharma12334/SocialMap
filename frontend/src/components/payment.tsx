import React from 'react';

declare global {
  interface Window {
    Cashfree: any;
  }
}

const Payment: React.FC = () => {
  const initiatePayment = async () => {
    try {
      const response = await fetch('https://social-map-2rio.vercel.app/api/create-order',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_amount: 100,
          customer_details: {
            customer_id: 'user_123',
            customer_email: 'test@example.com',
            customer_phone: '9876543210',
          },
        }),
      });

      const data = await response.json();

      if (data.payment_session_id) {
        const cashfree = new window.Cashfree(data.payment_session_id);
        cashfree.redirect();
      } else {
        alert('Failed to initiate payment');
      }
    } catch (err) {
      console.error(err);
      alert('Error initiating payment');
    }
  };

  return (
    <div>
      <h2>Pay Now</h2>
      <button onClick={initiatePayment}>Make Payment</button>
    </div>
  );
};

export default Payment;
