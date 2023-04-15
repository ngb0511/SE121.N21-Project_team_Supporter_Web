import request from '../utils/request';

export const getTask = async () => {
  const response = await request.get('/users');
  return response.data;
};

export const createTask = async (task) => {
  const response = await request.post('/users', JSON.stringify(task));
  console.log(user);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await request.put(`/users/${id}`, JSON.stringify(task));
  return response.data;
};
