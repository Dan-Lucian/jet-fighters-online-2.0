const mongoose = require('mongoose');
const db = require('../../utils/db');
const typesNotifications = require('../../features/notifications/type-notification');
const { accountOne, accountTwo } = require('./account.fixture');

class NotificationInDb {
  constructor({ notifier, type, isRead = false }) {
    this._id = mongoose.Types.ObjectId();
    this.actor = 'some actor';
    this.notifier = notifier;
    this.type = type;
    this.isRead = isRead;
    this.created = Date.now();
  }
}

const notificationsUnreadAccountOne = [
  new NotificationInDb({
    notifier: accountOne.userName,
    type: typesNotifications.friendshipRequest,
  }),
  new NotificationInDb({
    notifier: accountOne.userName,
    type: typesNotifications.friendshipResponse,
  }),
];

const notificationsUnreadAccountTwo = [
  new NotificationInDb({
    notifier: accountTwo.userName,
    type: typesNotifications.friendshipRequest,
  }),

  new NotificationInDb({
    notifier: accountTwo.userName,
    type: typesNotifications.friendshipResponse,
  }),
];

const notificationsRead = [
  new NotificationInDb({
    notifier: accountTwo.userName,
    type: typesNotifications.friendshipRequest,
    isRead: true,
  }),

  new NotificationInDb({
    notifier: accountTwo.userName,
    type: typesNotifications.friendshipResponse,
    isRead: true,
  }),

  new NotificationInDb({
    notifier: accountOne.userName,
    type: typesNotifications.friendshipRequest,
    isRead: true,
  }),

  new NotificationInDb({
    notifier: accountOne.userName,
    type: typesNotifications.friendshipResponse,
    isRead: true,
  }),
];

const notificationNew = {
  actor: accountOne.userName,
  notifier: accountTwo.userName,
  type: typesNotifications.friendshipRequest,
};

const insertNotifications = async (notifications) => {
  await db.Notification.insertMany(notifications);
};

const getUnreadNotifications = (notifications) =>
  notifications.filter((notification) => !notification.isRead);

module.exports = {
  notificationNew,
  notificationsUnreadAccountOne,
  notificationsUnreadAccountTwo,
  notificationsRead,
  insertNotifications,
  getUnreadNotifications,
};
