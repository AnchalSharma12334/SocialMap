import axios from './axios';

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res = await axios.post('/auth/register', data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post('/auth/login', data);
  return res.data; // You’ll get { token }
};
