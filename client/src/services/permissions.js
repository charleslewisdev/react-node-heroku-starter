import {fetchWrapper} from './restApi';

export const addPermission = async (permission) => {
  return await fetchWrapper(
    'POST',
    '/api/permissions/addPermission',
    permission
  );
};

export const getPermissions = async () => {
  return await fetchWrapper('/api/permissions/getPermissions');
};

export const updatePermission = async (id, values) => {
  return await fetchWrapper('PUT', '/api/permissions/updatePermission', {
    id,
    ...values,
  });
};
