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
  tokenJwtAccountOne,
} = require('../fixtures/token.fixture');
const {
  notificationNew,
  notificationsUnreadAccountOne,
  notificationsUnreadAccountTwo,
  notificationsRead,
  insertNotifications,
} = require('../fixtures/notification.fixture');
const { copyObj } = require('../helpers');

const api = supertest(app);

const notificationsAll = notificationsUnreadAccountOne.concat(
  notificationsUnreadAccountTwo,
  notificationsRead
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
    test('should return max 10 unread notifications if user requests his notifications', async () => {
      const response = await api
        .get(`/api/notifications/${accountTwo.userName}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(200);

      expect(response.body).toHaveLength(notificationsUnreadAccountTwo.length);
      expect(response.body.length).toBeLessThan(11);

      response.body.forEach((notification, idx) => {
        expect(notification).toMatchObject({
          actor: notificationsUnreadAccountTwo[idx].actor,
          notifier: notificationsUnreadAccountTwo[idx].notifier,
          type: notificationsUnreadAccountTwo[idx].type,
          isRead: false,
        });
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

  describe('POST /api/notifications/:userName', () => {
    test('should return 201 and create notification if data ok', async () => {
      await api
        .post(`/api/notifications/${accountTwo.userName}`)
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
    });

    test('should return 400 if any essential data missing', async () => {
      const missingActor = copyObj(notificationNew);
      delete missingActor.actor;
      await api
        .post(`/api/notifications/${accountTwo.userName}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send(missingActor)
        .expect(400);

      const missingNotifier = copyObj(notificationNew);
      delete missingNotifier.notifier;
      await api
        .post(`/api/notifications/${accountTwo.userName}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send(missingNotifier)
        .expect(400);

      const missingType = copyObj(notificationNew);
      delete missingType.type;
      await api
        .post(`/api/notifications/${accountTwo.userName}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send(missingType)
        .expect(400);

      const notificationsFromDb = await db.Notification.find({});
      const lengthTotal =
        notificationsUnreadAccountOne.length +
        notificationsUnreadAccountTwo.length +
        notificationsRead.length;
      expect(notificationsFromDb).toHaveLength(lengthTotal);
    });

    test('should return 400 if invalid or missing jwt in Auth header', async () => {
      const responseToInvalidJwt = await api
        .post(`/api/notifications/${accountTwo.userName}`)
        .set('Authorization', `bearer invalid_jwt_token`)
        .expect(400);

      const responseToMissingJwt = await api
        .post(`/api/notifications/${accountTwo.userName}`)
        .expect(400);

      expect(responseToInvalidJwt.body).toEqual({ message: 'invalid token' });
      expect(responseToMissingJwt.body).toEqual({ message: 'invalid token' });

      const notificationsFromDb = await db.Notification.find({});
      const lengthTotal =
        notificationsUnreadAccountOne.length +
        notificationsUnreadAccountTwo.length +
        notificationsRead.length;
      expect(notificationsFromDb).toHaveLength(lengthTotal);
    });

    test('should return 401 if jwt token is expired', async () => {
      const response = await api
        .post(`/api/notifications/${accountTwo.userName}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdminExpired}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });

      const notificationsFromDb = await db.Notification.find({});
      const lengthTotal =
        notificationsUnreadAccountOne.length +
        notificationsUnreadAccountTwo.length +
        notificationsRead.length;
      expect(notificationsFromDb).toHaveLength(lengthTotal);
    });
  });

  describe('POST /api/notifications/:userName/read', () => {
    const ids = notificationsUnreadAccountTwo.map(
      (notification) => notification._id
    );

    test('should mark all sent notifications as read', async () => {
      const notificationsFromDbBefore = await db.Notification.findManyByIds(
        ids
      );
      notificationsFromDbBefore.forEach((notification) => {
        expect(notification.isRead).toBe(false);
      });

      const response = await api
        .post(`/api/notifications/${accountTwo.userName}/read`)
        .send(ids)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(200);

      expect(response.body).toHaveLength(ids.length);
      response.body.forEach((notification) => {
        expect(notification.isRead).toBe(true);
      });

      const notificationsFromDbAfter = await db.Notification.findManyByIds(ids);
      notificationsFromDbAfter.forEach((notification) => {
        expect(notification.isRead).toBe(true);
      });
    });

    test('should return 401 and not modify notifications if not his notification', async () => {
      const response = await api
        .post(`/api/notifications/${accountTwo.userName}/read`)
        .send(ids)
        .set('Authorization', `bearer ${tokenJwtAccountOne}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'unauthorized' });

      const notificationsFromDbAfter = await db.Notification.findManyByIds(ids);
      notificationsFromDbAfter.forEach((notification) => {
        expect(notification.isRead).toBe(false);
      });
    });

    test('should return 401 and not modify notifications if there are foreign notifications mixed in', async () => {
      const idsInfected = ids.concat([notificationsUnreadAccountOne[0]._id]);
      const response = await api
        .post(`/api/notifications/${accountTwo.userName}/read`)
        .send(idsInfected)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'unauthorized' });

      const notificationsFromDbAfter = await db.Notification.findManyByIds(ids);
      notificationsFromDbAfter.forEach((notification) => {
        expect(notification.isRead).toBe(false);
      });
    });

    test('should return 400 and not modify notifications if invalid or missing jwt in Auth header', async () => {
      const responseToInvalidJwt = await api
        .post(`/api/notifications/${accountTwo.userName}/read`)
        .send(ids)
        .set('Authorization', `bearer invalid_jwt_token`)
        .expect(400);

      const responseToMissingJwt = await api
        .post(`/api/notifications/${accountTwo.userName}/read`)
        .send(ids)
        .expect(400);

      expect(responseToInvalidJwt.body).toEqual({ message: 'invalid token' });
      expect(responseToMissingJwt.body).toEqual({ message: 'invalid token' });

      const notificationsFromDbAfter = await db.Notification.findManyByIds(ids);
      notificationsFromDbAfter.forEach((notification) => {
        expect(notification.isRead).toBe(false);
      });
    });

    test('should return 401 and not modify notifications if jwt token is expired', async () => {
      const response = await api
        .post(`/api/notifications/${accountTwo.userName}/read`)
        .send(ids)
        .set('Authorization', `bearer ${tokenJwtAccountAdminExpired}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });

      const notificationsFromDbAfter = await db.Notification.findManyByIds(ids);
      notificationsFromDbAfter.forEach((notification) => {
        expect(notification.isRead).toBe(false);
      });
    });
  });

  describe('POST /api/notifications/:userName/read/:id', () => {
    const notification = notificationsUnreadAccountTwo[0];

    test('should mark the notification as read', async () => {
      const notificationFromDbBefore = await db.Notification.findById(
        notification._id
      );
      expect(notificationFromDbBefore.isRead).toBe(false);

      const response = await api
        .post(
          `/api/notifications/${accountTwo.userName}/read/${notification._id}`
        )
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(200);

      expect(response.body.isRead).toBe(true);

      const notificationFromDbAfter = await db.Notification.findById(
        notification._id
      );

      expect(notificationFromDbAfter.isRead).toBe(true);
    });

    test('should return 401 if not his notification', async () => {
      const response = await api
        .post(
          `/api/notifications/${accountTwo.userName}/read/${notification._id}`
        )
        .set('Authorization', `bearer ${tokenJwtAccountOne}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'unauthorized' });

      const notificationFromDb = await db.Notification.findById(
        notification._id
      );

      expect(notificationFromDb.isRead).toBe(false);
    });

    test('should return 400 if invalid or missing jwt in Auth header', async () => {
      const responseToInvalidJwt = await api
        .post(
          `/api/notifications/${accountTwo.userName}/read/${notification._id}`
        )
        .set('Authorization', `bearer invalid_jwt_token`)
        .expect(400);

      const responseToMissingJwt = await api
        .post(
          `/api/notifications/${accountTwo.userName}/read/${notification._id}`
        )
        .expect(400);

      expect(responseToInvalidJwt.body).toEqual({ message: 'invalid token' });
      expect(responseToMissingJwt.body).toEqual({ message: 'invalid token' });

      const notificationFromDb = await db.Notification.findById(
        notification._id
      );

      expect(notificationFromDb.isRead).toBe(false);
    });

    test('should return 401 if jwt token is expired', async () => {
      const response = await api
        .post(
          `/api/notifications/${accountTwo.userName}/read/${notification._id}`
        )
        .set('Authorization', `bearer ${tokenJwtAccountAdminExpired}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });

      const notificationFromDb = await db.Notification.findById(
        notification._id
      );

      expect(notificationFromDb.isRead).toBe(false);
    });
  });
});
