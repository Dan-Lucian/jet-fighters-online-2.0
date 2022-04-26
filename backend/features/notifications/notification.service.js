const db = require('../../utils/db');
const TypeNotification = require('./type-notification');

module.exports = {
  getByNotifierUserName,
  create,
  markAsRead,
  markManyAsRead,
};

async function getByNotifierUserName(userName) {
  if (!userName) throw 'notifications not found';

  const notifications = await db.Notification.find({
    notifier: userName,
    isRead: false,
  })
    .sort({ created: 1 })
    .limit(10);
  if (notifications.length === 0) throw 'notifications not found';

  return notifications;
}

async function create(notification) {
  let notificationNew;

  if (notification.type === TypeNotification.friendshipRequest) {
    notificationNew = new db.Notification(notification);
    notificationNew.isRead = false;
  }

  // TODO: handle event
  // if (notification.type === TypeNotification.friendshipResponse) {
  // ...
  // }

  await notificationNew.save();

  return notificationNew;
}

async function markAsRead(id, userName) {
  if (!id) throw 'notifications not found';

  const notification = await db.Notification.findById(id);
  if (!notification) throw 'notifications not found';
  if (notification.notifier !== userName) throw 'unauthorized';

  notification.isRead = true;
  await notification.save();

  return notification;
}

async function markManyAsRead(ids, userName) {
  if (!ids) throw 'notifications not found';

  const notifications = await db.Notification.findManyByIds(ids);

  notifications.forEach((notification) => {
    if (!notification) throw 'notifications not found';
    if (notification.notifier !== userName) throw 'unauthorized';
  });

  const notificationsModified = await Promise.all(
    notifications.map((notification) => {
      const makePromise = async () => {
        notification.isRead = true;
        await notification.save();

        return notification;
      };

      return makePromise();
    })
  );

  return notificationsModified;
}
