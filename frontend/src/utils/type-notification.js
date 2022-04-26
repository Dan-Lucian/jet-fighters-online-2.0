const typesNotifications = {
  friendshipRequest: 'friendshipRequest',
  friendshipResponse: 'friendshipResponse',
  welcome: 'welcome',
  featureNotReady: 'featureNotReady',
};

const getMockNotification = (type, notifier) => {
  const notifications = {
    [typesNotifications.friendRequest]: {
      actor: '624b0dcf1eef4cf9040ca138',
      notifier,
      type: typesNotifications.friendRequest,
    },

    [typesNotifications.friendResponse]: {
      actor: '624b0dcf1eef4cf9040ca138',
      notifier,
      type: typesNotifications.friendResponse,
    },

    [typesNotifications.welcome]: {
      actor: 'jetfightersonline.org',
      notifier,
      type: typesNotifications.welcome,
      content: 'Welcome to Jet Fighters Online!',
    },

    [typesNotifications.featureNotReady]: {
      actor: 'jetfightersonline.org',
      notifier,
      type: typesNotifications.featureNotReady,
      content: `We're still working on the friendship feature, thanks for your patience.`,
    },
  };

  return notifications[type];
};

export default typesNotifications;
export { getMockNotification };
