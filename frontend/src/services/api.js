import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/subs'
});

export const getDash = async () => {
  const r = await api.get('/dashboard');
  return r.data;
};

export const addSub = async (d) => {
  const r = await api.post('/', d);
  return r.data;
};

export const toggleSub = async (id) => {
  const r = await api.patch(`/${id}/toggle`);
  return r.data;
};
