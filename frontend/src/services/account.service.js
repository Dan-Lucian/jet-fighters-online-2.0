import axios from 'axios';

const urlBase = '/accounts';
let tokenJwt;

export default {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

function register(params) {
  return axios
    .post(`${urlBase}/register`, params)
    .then((response) => response.data);
}

function verifyEmail(token) {
  return axios
    .post(`${urlBase}/verify-email`, { token })
    .then((response) => response.data);
}

function login({ email, password }) {
  return axios
    .post(`${urlBase}/authenticate`, { email, password })
    .then((response) => {
      tokenJwt = response.data.tokenJwt;
      startRefreshTokenTimer();
      return response.data;
    });
}

function logout() {
  return axios
    .post(
      `${urlBase}/revoke-token`,
      {},
      {
        headers: {
          authorization: `bearer ${tokenJwt}`,
        },
      }
    )
    .then((response) => {
      tokenJwt = null;
      stopRefreshTokenTimer();
      return response.data;
    });
}

function refreshToken() {
  return axios.post(`${urlBase}/refresh-token`, {}).then((response) => {
    tokenJwt = response.data.tokenJwt;
    startRefreshTokenTimer();
    return response.data;
  });
}

function forgotPassword(email) {
  return axios
    .post(`${urlBase}/forgot-password`, { email })
    .then((response) => response.data);
}

function resetPassword({ token, password, passwordConfirm }) {
  return axios
    .post(`${urlBase}/reset-password`, { token, password, passwordConfirm })
    .then((response) => response.data);
}

// helpers functions

let idTimeoutTokenRefresh;

function startRefreshTokenTimer() {
  if (!tokenJwt) return;
  const tokenJwtDecoded = JSON.parse(atob(tokenJwt.split('.')[1]));

  const expires = new Date(tokenJwtDecoded.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  idTimeoutTokenRefresh = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(idTimeoutTokenRefresh);
}
