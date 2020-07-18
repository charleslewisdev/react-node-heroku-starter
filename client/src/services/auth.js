import {fetchWrapper} from './restApi';

export const getUserPermissions = async () => {
  return await fetchWrapper('/api/auth/getUserPermissions');
};
