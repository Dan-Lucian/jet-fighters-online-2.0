const db = require('../../utils/db');
const TypeNotification = require('./type-notification');

module.exports = {
  getByNotifierUserName,
  create,
};

async function getByNotifierUserName(userName) {
  const notifications = await getNotificationsByNotifierUserName(userName);

  return notifications;
}

async function create(notification) {
  let notificationNew;

  if (notification.type === TypeNotification.friendRequest) {
    notificationNew = new db.Notification(notification);
    notificationNew.isRead = false;
  }

  // TODO: handle event
  // if (notification.type === TypeNotification.friendRequestResponse) {
  // ...
  // }

  await notificationNew.save();

  return notificationNew;
}

// helper functions

async function getNotificationsByNotifierUserName(userName) {
  if (!userName) throw 'notifications not found';
  const notifications = await db.Notification.find({ notifier: userName });
  if (notifications.length === 0) throw 'notifications not found';

  return notifications;
}
