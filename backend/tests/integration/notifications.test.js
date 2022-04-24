const supertest = require('supertest');
const mongoose = require('mongoose');
const db = require('../../utils/db');
const app = require('../../app');
const {
  accountOne,
  accountTwo,
  accountAdmin,
  insertAccounts,
} = require('../fixtures/account.fixture');
const {
  tokenJwtAccountAdminExpired,
  tokenJwtAccountTwo,
} = require('../fixtures/token.fixture');
const {
  notificationNew,
  notificationsAccountOne,
  notificationsAccountTwo,
  insertNotifications,
} = require('../fixtures/notification.fixture');
const { copyObj } = require('../helpers');

const api = supertest(app);

const notificationsAll = notificationsAccountOne.concat(
  notificationsAccountTwo
);

beforeEach(async () => {
  await db.Account.deleteMany({});
  await db.Notification.deleteMany({});

  await insertAccounts([accountOne, accountTwo, accountAdmin]);
  await insertNotifications(notificationsAll);
});

afterAll(() => {
  mongoose.connection.close();
});

describe('Notifications', () => {
  describe('GET /api/notifications/:userName', () => {
    test('should return all notifications if user requests his notifications', async () => {
      const response = await api
        .get(`/api/notifications/${accountTwo.userName}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({
        actor: notificationsAccountTwo[0].actor,
        notifier: notificationsAccountTwo[0].notifier,
        type: notificationsAccountTwo[0].type,
      });
      expect(response.body[1]).toMatchObject({
        actor: notificationsAccountTwo[1].actor,
        notifier: notificationsAccountTwo[1].notifier,
        type: notificationsAccountTwo[1].type,
      });
    });

    test('should return 400 if invalid or missing jwt in Auth header', async () => {
      const responseToInvalidJwt = await api
        .get(`/api/notifications/${accountTwo.userName}`)
        .set('Authorization', `bearer invalid_jwt_token`)
        .expect(400);

      const responseToMissingJwt = await api
        .get(`/api/notifications/${accountTwo.userName}`)
        .expect(400);

      expect(responseToInvalidJwt.body).toEqual({ message: 'invalid token' });
      expect(responseToMissingJwt.body).toEqual({ message: 'invalid token' });
    });

    test('should return 401 if jwt token is expired', async () => {
      const response = await api
        .get(`/api/notifications/${accountOne.userName}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdminExpired}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });
    });

    test('should return 401 if user requests not his notifications', async () => {
      const response = await api
        .get(`/api/notifications/${accountOne.userName}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'unauthorized' });
    });
  });

  describe('POST /api/notifications', () => {
    test('should return 201 and create notification if data ok', async () => {
      await api
        .post('/api/notifications')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send(notificationNew)
        .expect(201);

      const notificationFromDb = await db.Notification.findOne({
        actor: notificationNew.actor,
        notifier: notificationNew.notifier,
      });

      expect(notificationFromDb.isRead).toBe(false);
      expect(notificationFromDb.created).toBeDefined();
      expect(notificationFromDb).toMatchObject({
        actor: notificationNew.actor,
        notifier: notificationNew.notifier,
        type: notificationNew.type,
      });

      const notificationsFromDb = await db.Notification.find({});

      expect(notificationsFromDb).toHaveLength(notificationsAll.length + 1);
    }, 10000000);

    test('should return 400 if any essential data missing', async () => {
      const missingActor = copyObj(notificationNew);
      delete missingActor.actor;
      await api
        .post('/api/notifications')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send(missingActor)
        .expect(400);

      const missingNotifier = copyObj(notificationNew);
      delete missingNotifier.notifier;
      await api
        .post('/api/notifications')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send(missingNotifier)
        .expect(400);

      const missingType = copyObj(notificationNew);
      delete missingType.type;
      await api
        .post('/api/notifications')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send(missingType)
        .expect(400);

      const notificationsFromDb = await db.Notification.find({});
      const lengthTotal =
        notificationsAccountOne.length + notificationsAccountTwo.length;
      expect(notificationsFromDb).toHaveLength(lengthTotal);
    });

    test('should return 400 if invalid or missing jwt in Auth header', async () => {
      const responseToInvalidJwt = await api
        .get(`/api/notifications/${accountTwo._id}`)
        .set('Authorization', `bearer invalid_jwt_token`)
        .expect(400);

      const responseToMissingJwt = await api
        .get(`/api/notifications/${accountTwo._id}`)
        .expect(400);

      expect(responseToInvalidJwt.body).toEqual({ message: 'invalid token' });
      expect(responseToMissingJwt.body).toEqual({ message: 'invalid token' });

      const notificationsFromDb = await db.Notification.find({});
      const lengthTotal =
        notificationsAccountOne.length + notificationsAccountTwo.length;
      expect(notificationsFromDb).toHaveLength(lengthTotal);
    });

    test('should return 401 if jwt token is expired', async () => {
      const response = await api
        .get(`/api/notifications/${accountOne._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdminExpired}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });

      const notificationsFromDb = await db.Notification.find({});
      const lengthTotal =
        notificationsAccountOne.length + notificationsAccountTwo.length;
      expect(notificationsFromDb).toHaveLength(lengthTotal);
    });
  });
});
