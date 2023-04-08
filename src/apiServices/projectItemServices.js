import request from '../utils/request';

export const projectAllItem = async () => {
  const response = await request.get('/posts');
  return response.data;
};

export const projectItem = async () => {
  const response = await request.get('/posts');
  return response.data;
};
