import axios from 'axios';
import typeNotification from '../utils/type-notification';

const urlBase = '/api/notifications';

export default {
  getNotifications,
  createNotification,
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

  console.log(tokenJwtDecoded);

  return axios
    .post(
      `${urlBase}/${userName}`,
      getMockNoitification(type, userName),
      authorize(tokenJwt)
    )
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

const getMockNoitification = (type, notifier) => {
  const noitfications = {
    [typeNotification.friendRequest]: {
      actor: '624b0dcf1eef4cf9040ca138',
      notifier,
      type: 'friendRequest',
    },

    [typeNotification.friendResponse]: {
      actor: '624b0dcf1eef4cf9040ca138',
      notifier,
      type: 'friendRequest',
    },

    [typeNotification.welcome]: {
      actor: 'jetfightersonline.org',
      notifier,
      type: 'welcome',
      content: 'Welcome to Jet Fighters Online!',
    },
  };

  return noitfications[type];
};
