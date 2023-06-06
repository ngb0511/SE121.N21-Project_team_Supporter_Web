import request from '../utils/request';

export const account = async () => {
  const response = await request.get('/account/findAll');
  return response.data;
};

export const createAccount = async (user) => {
  const response = await request.post('/account/addAccount', user);
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
