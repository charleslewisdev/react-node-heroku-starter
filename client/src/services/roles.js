import {fetchWrapper} from './restApi';

export const addRole = async (role) => {
  return await fetchWrapper('POST', '/api/roles/addRole', role);
};

export const getRoles = async () => {
  return await fetchWrapper('/api/roles/getRoles');
};

export const updateRole = async (id, values) => {
  return await fetchWrapper('PUT', '/api/roles/updateRole', {
    id,
    ...values,
  });
};
