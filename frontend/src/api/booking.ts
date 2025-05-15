import axios from './axios';

export const createBooking = async (bookingData: {
  user: string;
  studio: string;
  date: string;
  hours: number;
}) => {
  const token = localStorage.getItem('token');
  const res = await axios.post('/bookings', bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
