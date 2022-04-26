const mongoose = require('mongoose');
const db = require('../../utils/db');
const TypeNotification = require('../../features/notifications/type-notification');
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
    type: TypeNotification.friendshipRequest,
  }),
  new NotificationInDb({
    notifier: accountOne.userName,
    type: TypeNotification.friendshipResponse,
  }),
];

const notificationsUnreadAccountTwo = [
  new NotificationInDb({
    notifier: accountTwo.userName,
    type: TypeNotification.friendshipRequest,
  }),

  new NotificationInDb({
    notifier: accountTwo.userName,
    type: TypeNotification.friendshipResponse,
  }),
];

const notificationsRead = [
  new NotificationInDb({
    notifier: accountTwo.userName,
    type: TypeNotification.friendshipRequest,
    isRead: true,
  }),

  new NotificationInDb({
    notifier: accountTwo.userName,
    type: TypeNotification.friendshipResponse,
    isRead: true,
  }),

  new NotificationInDb({
    notifier: accountOne.userName,
    type: TypeNotification.friendshipRequest,
    isRead: true,
  }),

  new NotificationInDb({
    notifier: accountOne.userName,
    type: TypeNotification.friendshipResponse,
    isRead: true,
  }),
];

const notificationNew = {
  actor: accountOne.userName,
  notifier: accountTwo.userName,
  type: TypeNotification.friendshipRequest,
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
