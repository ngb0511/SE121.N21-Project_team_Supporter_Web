import request from '../utils/request';

export const account = async () => {
  const response = await request.get('/account/getAllUserAccounts');
  return response.data;
};

export const getAllAdminAccounts = async () => {
  const response = await request.get('/account/getAllAdminAccounts');
  return response.data;
};

export const createAccount = async (user) => {
  const response = await request.post('/account/addAccount', user);
  console.log(user);
  return response.data;
};

export const createAdminAccount = async (user) => {
  const response = await request.post('/account/createAdminAccount', user);
  console.log(user);
  return response.data;
};

export const updateVerifiedAccount = async (id, account) => {
  const response = await request.put(`/account/updateVerifiedAccount/${id}`, account);
  console.log(account);
  return response.data;
};

export const updateVerificationCode = async (id, user) => {
  const response = await request.put(`/account/updateVerificationCode/${id}`, user);
  console.log(user);
  return response.data;
};

export const changePassword = async (id, account) => {
  const response = await request.put(`/account/changePassword/${id}`, account);
  console.log(account);
  return response.data;
};

export const checkVerificationCode = async (code, account) => {
  const response = await request.put(`/account/checkVerificationCode/${code}`, account);
  console.log(account);
  return response.data;
};

export const checkExistedAccount = async (email) => {
  const response = await request.get(`/account/checkExistedAccount/${email}`);
  console.log(response);
  // if (response.data == '1') return true;
  // return false;
  return response.data;
};

export const checkCreatedAccount = async (email) => {
  const response = await request.get(`/account/checkCreatedAccount/${email}`);
  console.log(response);
  // if (response.data == '1') return true;
  // return false;
  return response.data;
};

export const checkAccount = async (account) => {
  const response = await request.post('/account/checkAccount', account);
  console.log(account);
  return response.data;
};

export const getAccountSortedByEmail = async (email) => {
  const response = await request.get(`/account/getAccountSortedByEmail/${email}`);
  console.log(response);
  // if (response.data == '1') return true;
  // return false;
  return response.data;
};

export const getAccountSortedByUserID = async (id) => {
  const response = await request.get(`/account/getAccountSortedByUserID/${id}`);
  console.log(response);
  // if (response.data == '1') return true;
  // return false;
  return response.data;
};

export const getAccountAndUserSortedByEmail = async (email) => {
  const response = await request.get(`/account/getAccountAndUserSortedByEmail/${email}`);
  console.log(response);
  // if (response.data == '1') return true;
  // return false;
  return response.data;
};

export const deleteAccount = async (id) => {
  const response = await request.delete(`/account/deleteAccount/${id}`);
  return response.data;
};

export const deleteAccountByEmail = async (email) => {
  const response = await request.delete(`/account/deleteAccountByEmail/${email}`);
  return response.data;
};
