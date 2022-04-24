const mongoose = require('mongoose');
const db = require('../../utils/db');
const TypeNotification = require('../../features/notifications/type-notification');
const { accountOne, accountTwo } = require('./account.fixture');

class NotificationInDb {
  constructor({ notifier, type }) {
    this._id = mongoose.Types.ObjectId();
    this.actor = 'some actor';
    this.notifier = notifier;
    this.type = type;
    this.isRead = false;
    this.created = Date.now();
  }
}

const notificationsAccountOne = [
  new NotificationInDb({
    notifier: accountOne.userName,
    type: TypeNotification.friendRequest,
  }),
  new NotificationInDb({
    notifier: accountOne.userName,
    type: TypeNotification.friendRequestResponse,
  }),
];

const notificationsAccountTwo = [
  new NotificationInDb({
    notifier: accountTwo.userName,
    type: TypeNotification.friendRequest,
  }),

  new NotificationInDb({
    notifier: accountTwo.userName,
    type: TypeNotification.friendRequestResponse,
  }),
];

const notificationNew = {
  actor: accountOne.userName,
  notifier: accountTwo.userName,
  type: TypeNotification.friendRequest,
};

const insertNotifications = async (notifications) => {
  await db.Notification.insertMany(notifications);
};

module.exports = {
  notificationNew,
  notificationsAccountOne,
  notificationsAccountTwo,
  insertNotifications,
};
