import {fetchWrapper} from './restApi';

export const addOrganization = async (organization) => {
  return await fetchWrapper(
    'POST',
    '/api/organizations/addOrganization',
    organization
  );
};

export const getOrganizations = async () => {
  return await fetchWrapper('/api/organizations/getOrganizations');
};

export const updateOrganization = async (id, values) => {
  return await fetchWrapper('PUT', '/api/organizations/updateOrganization', {
    id,
    ...values,
  });
};
