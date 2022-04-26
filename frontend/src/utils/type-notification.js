const typeNotification = {
  friendshipRequest: 'friendshipRequest',
  friendshipResponse: 'friendshipResponse',
  welcome: 'welcome',
  featureNotReady: 'featureNotReady',
};

const getMockNotification = (type, notifier) => {
  const notifications = {
    [typeNotification.friendRequest]: {
      actor: '624b0dcf1eef4cf9040ca138',
      notifier,
      type: typeNotification.friendRequest,
    },

    [typeNotification.friendResponse]: {
      actor: '624b0dcf1eef4cf9040ca138',
      notifier,
      type: typeNotification.friendResponse,
    },

    [typeNotification.welcome]: {
      actor: 'jetfightersonline.org',
      notifier,
      type: typeNotification.welcome,
      content: 'Welcome to Jet Fighters Online!',
    },

    [typeNotification.featureNotReady]: {
      actor: 'jetfightersonline.org',
      notifier,
      type: typeNotification.featureNotReady,
      content: `We're still working on the friendship feature, thanks for your patience.`,
    },
  };

  return notifications[type];
};

export default typeNotification;
export { getMockNotification };
