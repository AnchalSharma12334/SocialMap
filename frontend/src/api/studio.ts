import axios from './axios';

export const getStudios = async () => {
  const res = await axios.get('/studios');
  return res.data;
};
