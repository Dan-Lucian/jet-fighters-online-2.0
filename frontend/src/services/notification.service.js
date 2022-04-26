import axios from 'axios';
import { getMockNotification } from '../utils/type-notification';

const urlBase = '/api/notifications';

export default {
  getNotifications,
  createNotification,
  markNotificationAsRead,
};

function getNotifications(tokenJwt) {
  if (!tokenJwt) return;

  const tokenJwtDecoded = JSON.parse(atob(tokenJwt.split('.')[1]));
  const { userName } = tokenJwtDecoded;

  return axios
    .get(`${urlBase}/${userName}`, authorize(tokenJwt))
    .then((response) => response.data);
}

function createNotification(tokenJwt, type) {
  if (!tokenJwt) return;

  const tokenJwtDecoded = JSON.parse(atob(tokenJwt.split('.')[1]));
  const { userName } = tokenJwtDecoded;

  return axios
    .post(
      `${urlBase}/${userName}`,
      getMockNotification(type, userName),
      authorize(tokenJwt)
    )
    .then((response) => response.data);
}

function markNotificationAsRead(tokenJwt, id) {
  if (!tokenJwt) return;
  const tokenJwtDecoded = JSON.parse(atob(tokenJwt.split('.')[1]));
  const { userName } = tokenJwtDecoded;

  return axios
    .post(`${urlBase}/${userName}/read/${id}`, {}, authorize(tokenJwt))
    .then((response) => response.data);
}

// helpers

function authorize(tokenJwt) {
  return tokenJwt
    ? {
        headers: {
          authorization: `bearer ${tokenJwt}`,
        },
      }
    : null;
}
