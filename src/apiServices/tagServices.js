import request from '../utils/request';

export const getAll = async () => {
  const response = await request.get('/major/findAll');
  return response.data;
};

export const createMajor = async (major) => {
  const response = await request.post('/major/addMajor', major);
  console.log(major);
  return response.data;
};
