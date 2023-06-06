import request from '../utils/request';

export const getUser = async () => {
  const response = await request.get('/user/findAll');
  return response.data;
};

export const createUser = async (user) => {
  const response = await request.post('/user/addUser', user);
  console.log(user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await request.put(`/user/updateUser/${id}`, user);
  return response.data;
};

export const getUserByID = async (id) => {
  const response = await request.get(`/user/getUserSortedByID/${id}`);
  return response.data;
};
