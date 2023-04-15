import request from '../utils/request';

export const getUser = async () => {
  const response = await request.get('/users');
  return response.data;
};

export const createUser = async (user) => {
  const response = await request.post('/users', JSON.stringify(user));
  console.log(user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await request.put(`/users/${id}`, JSON.stringify(user));
  return response.data;
};
