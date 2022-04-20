const db = require('../../utils/db');
const TypeNotification = require('./type-notification');

module.exports = {
  getByNotifierId,
  create,
};

async function getByNotifierId(id) {
  const notifications = await getNotificationsByNotifierId(id);

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

async function getNotificationsByNotifierId(id) {
  if (!id) throw 'notifications not found';
  const notifications = await db.Notification.find({ notifier: id });
  if (!notifications) throw 'notifications not found';

  return notifications;
}
