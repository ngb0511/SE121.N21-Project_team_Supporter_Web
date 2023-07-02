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

export const getUserDetailByID = async (id) => {
  const response = await request.get(`/user/getUserByID/${id}`);
  return response.data;
};

export function uploadCV(id, CV) {
  const formData = new FormData();
  formData.append('CV', CV);
  request.put(`/user/addCV/${id}`, formData).then((res) => {
    console.log(res);
  });
}

export const getCVSortedByUserID = async (userID) => {
  const response = await request.get(`/user/getCVSortedByUserID/${userID}`);

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await request.delete(`/user/deleteUser/${id}`);
  return response.data;
};

export const getUserNumber = async () => {
  const response = await request.get('/account/getUserNumber');
  return response.data;
};
