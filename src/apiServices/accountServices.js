import request from '../utils/request';

export const account = async () => {
  const response = await request.get('/users');
  return response.data;
};

export const createAccount = async (user) => {
  const response = await request.post('/posts', JSON.stringify(user));
  console.log(user);
  return response.data;
};
