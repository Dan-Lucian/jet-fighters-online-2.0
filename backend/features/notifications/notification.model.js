const mongoose = require('mongoose');
const { NODE_ENV } = require('../../config/env');

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

const getFindManyByIds = (nodeEnv) => {
  console.log('getFindManyByIds RUNS (it should only once)');

  // diff function for "test" because mongoose doesn't allow repeated querries
  // by default, but allows if there is .clone() at the end
  if (nodeEnv === 'test')
    return async (ids) => {
      const results = await Notification.find(
        {
          _id: {
            $in: ids.map((id) => mongoose.Types.ObjectId(id)),
          },
        },
        (err, docs) => {
          console.log(docs);
        }
      ).clone();

      return results;
    };

  return async (ids) => {
    const results = await Notification.find(
      {
        _id: {
          $in: ids.map((id) => mongoose.Types.ObjectId(id)),
        },
      },
      (err, docs) => {
        console.log(docs);
      }
    );

    return results;
  };
};

Notification.findManyByIds = getFindManyByIds(NODE_ENV);

module.exports = Notification;
