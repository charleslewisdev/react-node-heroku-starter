const EXPIRY_KEY = 'auth.expires_at';
const TOKEN_KEY = 'auth.token';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

export const getApiAuthHeader = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return;
  }
  return {
    'x-access-token': token,
  };
};

export const isAuthenticated = () => {
  const expiresAt = localStorage.getItem(EXPIRY_KEY);
  return expiresAt && expiresAt > new Date().getTime();
};

export const logout = () => {
  localStorage.removeItem(EXPIRY_KEY);
  localStorage.removeItem(TOKEN_KEY);
  window.location.replace('/login');
};

export const setSession = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRY_KEY, new Date().getTime() + SESSION_DURATION_MS);
};
