import axios from 'axios';

const urlApi = '/accounts';
let tokenJwt;

export default {
  register,
  login,
  logout,
  verifyEmail,
};

function register(params) {
  return axios
    .post(`${urlApi}/register`, params)
    .then((response) => response.data);
}

function verifyEmail(token) {
  return axios
    .post(`${urlApi}/verify-email`, { token })
    .then((response) => response.data);
}

function login({ email, password }) {
  return axios
    .post(`${urlApi}/authenticate`, { email, password })
    .then((response) => {
      tokenJwt = response.data.tokenJwt;
      startRefreshTokenTimer();
      return response.data;
    });
}

function logout() {
  return axios
    .post(
      `${urlApi}/revoke-token`,
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
  return axios.post(`${urlApi}/refresh-token`, {}).then((response) => {
    tokenJwt = response.data.tokenJwt;
    startRefreshTokenTimer();
    return response.data;
  });
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
