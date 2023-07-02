import request from '../utils/request';

export const getTask = async (id) => {
  const response = await request.get(`/progress/findAll/${id}`);
  return response.data;
};

export const getTaskSortByID = async (id) => {
  const response = await request.get(`/progress/getProgressSortedByID/${id}`);
  return response.data;
};

export const createTask = async (id, task) => {
  const response = await request.post(`/progress/addProgress/${id}`, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await request.put(`/progress/updateProgress/${id}`, task);
  return response.data;
};

export const getDoneTasks = async (id) => {
  const response = await request.get(`/progress/getDoneTasks/${id}`);
  return response.data;
};

export const getUndoneTasks = async (id) => {
  const response = await request.get(`/progress/getUndoneTasks/${id}`);
  return response.data;
};

export const getDelayedTasks = async (id) => {
  const response = await request.get(`/progress/getDelayedTasks/${id}`);
  return response.data;
};

export const updateProgressUser = async (id) => {
  const response = await request.put(`/progress/updateProgressUser/${id}`);
  return response.data;
};
