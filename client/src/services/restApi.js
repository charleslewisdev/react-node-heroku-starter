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
export const fetchWrapper = async (arg1, url, body, additionalOptions) => {
  // if called with one argument, default to 'GET' method
  const _method = url ? arg1.toUpperCase() : 'GET';
  // if called with one argument, first is API route
  const _apiRoute = url || arg1;
  // currently only integrating with one API so there's no need for each caller to pass a full URL
  const _url = API_URL + _apiRoute;

  const options = {
    body: body && JSON.stringify(body), // body can be undefined, that's ok
    headers: {
      'Content-Type': 'application/json',
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
  const responseJson = await response.json();
  // TODO: add error handling
  return responseJson;
};
