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

export const deleteMajor = async (id) => {
  const response = await request.delete(`/major/deleteMajor/${id}`);
  return response.data;
};

export const checkExistedMajor = async (major) => {
  const response = await request.post('/major/checkExistedMajor', major);
  console.log(major);
  return response.data;
};
