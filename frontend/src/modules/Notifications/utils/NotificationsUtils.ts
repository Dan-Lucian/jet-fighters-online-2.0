import { NotificationTypeEnum } from 'modules/Notifications/enums/NotificationTypeEnum';

export const getMockNotification = (type: NotificationTypeEnum, notifier: string) => {
  const notifications = {
    [NotificationTypeEnum.FriendshipRequest]: {
      actor: '624b0dcf1eef4cf9040ca138',
      notifier,
      type: NotificationTypeEnum.FriendshipRequest,
    },

    [NotificationTypeEnum.FriendshipResponse]: {
      actor: '624b0dcf1eef4cf9040ca138',
      notifier,
      type: NotificationTypeEnum.FriendshipResponse,
    },

    [NotificationTypeEnum.Welcome]: {
      actor: 'jetfightersonline.org',
      notifier,
      type: NotificationTypeEnum.Welcome,
      content: 'Welcome to Jet Fighters Online!',
    },

    [NotificationTypeEnum.FeatureNotReady]: {
      actor: 'jetfightersonline.org',
      notifier,
      type: NotificationTypeEnum.FeatureNotReady,
      content: `We're still working on the friendship feature, thanks for your patience.`,
    },
  };

  return notifications[type];
};

export const getMockNotifications = () => {
  return [
    {
      actor: 'some_actor',
      id: 'some_id',
      created: '10/10/2022',
      notifier: 'test_actor',
      content: '',
      type: NotificationTypeEnum.FriendshipRequest,
    },
    {
      actor: 'some_actor',
      id: 'some_id',
      created: '10/10/2022',
      notifier: 'test_actor',
      content: '',
      type: NotificationTypeEnum.FriendshipResponse,
    },
    {
      actor: 'jetfightersonline.org',
      id: 'some_id',
      created: '10/10/2022',
      notifier: 'test_actor',
      type: NotificationTypeEnum.Welcome,
      content: 'Welcome to Jet Fighters Online!',
    },
    {
      actor: 'jetfightersonline.org',
      id: 'some_id',
      created: '10/10/2022',
      notifier: 'test_actor',
      type: NotificationTypeEnum.FeatureNotReady,
      content: `We're still working on the friendship feature, thanks for your patience.`,
    },
  ];
};
