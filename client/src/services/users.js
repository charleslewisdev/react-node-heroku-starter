import {fetchWrapper} from './restApi';

export const login = async (profileObj) => {
  return await fetchWrapper('POST', '/api/users/login', profileObj);
};

export const addUser = async (values) => {
  const response = await fetchWrapper('POST', '/api/users/addUser', values);
  return response;
};

export const getToken = async (userId) => {
  return await fetchWrapper('POST', '/api/auth/getToken', {userId});
};

export const getUsers = async () => {
  const response = await fetchWrapper('/api/users/getUsers');
  return response;
};

export const updateUser = async (id, values) => {
  return await fetchWrapper('PUT', '/api/users/updateUser', {
    id,
    ...values,
  });
};
