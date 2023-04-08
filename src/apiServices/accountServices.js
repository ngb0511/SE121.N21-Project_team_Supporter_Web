import request from '../utils/request';

export const account = async () => {
  const response = await request.get('/users');
  return response.data;
};
