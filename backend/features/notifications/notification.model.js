const mongoose = require('mongoose');

// look up a notification db model
// https://tannguyenit95.medium.com/designing-a-notification-system-1da83ca971bc

const schemaNotification = mongoose.Schema({
  actor: {
    type: String,
    ref: 'Account',
    required: true,
  },
  notifier: {
    type: String,
    ref: 'Account',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: String,
  isRead: {
    type: Boolean,
    required: true,
  },
  created: { type: Date, default: Date.now },
});

schemaNotification.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, objectReturned) => {
    delete objectReturned._id;
    delete objectReturned.passwordHash;
  },
});

const Notification = mongoose.model('Notification', schemaNotification);

module.exports = Notification;
