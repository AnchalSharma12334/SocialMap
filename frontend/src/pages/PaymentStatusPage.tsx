import React, { useEffect, useState } from 'react';

const PaymentStatusPage: React.FC = () => {
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const orderId = queryParams.get('order_id');

    if (orderId) {
      setStatus(`Payment successful for Order ID: ${orderId}`);
    } else {
      setStatus('Payment failed or missing order ID');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
      <p>{status}</p>
    </div>
  );
};

export default PaymentStatusPage;
