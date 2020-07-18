import toastr from 'toastr';
import {getApiAuthHeader} from 'utils/auth';

/**
 * @function fetchWrapper
 * @param {string} arg1 - REST method | url
 * @param {string} [url] - url
 * @param {Object} [body] - body of message
 * @param {Object} [headers] - additional HTTP headers
 * @description
 *   Wrapper for the fetch api that provides options defaults and base response code handling.
 * @return {Promise<Object>} A promise containing the deserialized response object.
 * */
export const fetchWrapper = async (arg1, url, body, additionalOptions = {}) => {
  const {headers} = additionalOptions;
  // if called with one argument, default to 'GET' method
  const _method = url ? arg1.toUpperCase() : 'GET';
  const _url = url || arg1;

  const options = {
    body: body && JSON.stringify(body), // body can be undefined, that's ok
    headers: {
      'Content-Type': 'application/json',
      ...getApiAuthHeader(),
      ...headers,
    },
    method: _method,
    ...additionalOptions,
  };
  try {
    const response = await fetch(_url, options);
    return await _handleResponse(response);
  } catch (err) {
    return err;
  }
};

/**
 * @function handleResponse
 * @param {Object} response - The response object.
 * @description
 *   A handler for the fetch response Object
 * @return {Promise<Object>} A promise containing the deserialized response object.
 * */
const _handleResponse = async (response) => {
  const {status} = response;
  if (status === 200) {
    return await response.json();
  }

  try {
    const {message, statusText} = await response.json();
    return toastr.error(message, statusText);
  } catch (err) {
    console.error(err);
    if (status === 400) {
      return toastr.error('Bad request');
    }
    if (status === 401) {
      return toastr.error('Unauthorized');
    }
    if (status === 403) {
      return toastr.error('Forbidden');
    }
    if (status === 404) {
      return toastr.error('Not Found');
    }
    return toastr.error('Unknown error');
  }
};
