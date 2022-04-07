const supertest = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../utils/db');
const app = require('../../app');
const { SECRET } = require('../../config/env');
const role = require('../../utils/role');
const {
  accountRegistration,
  accountUnverified,
  accountOne,
  accountTwo,
  accountTokenResetExpired,
  accountAdmin,
  insertAccounts,
} = require('../fixtures/account.fixture');
const {
  tokenRefreshAccountOne,
  tokenRefreshAccountTwo,
  tokenRefreshAccountAdmin,
  tokenRefreshAccountTwoExpired,
  tokenJwtAccountAdminExpired,
  tokenJwtAccountTwo,
  tokenJwtAccountTwoExpired,
  tokenJwtAccountAdmin,
  insertTokensRefresh,
} = require('../fixtures/token.fixture');
const { copyObj, getANonExistingId } = require('../helpers');

const api = supertest(app);

beforeEach(async () => {
  await db.Account.deleteMany({});
  await db.TokenRefresh.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
});

describe('Registration', () => {
  describe('POST /accounts/register', () => {
    test('should return 201 and create account if data ok', async () => {
      await api
        .post('/accounts/register')
        .send(accountRegistration)
        .expect(201);

      const accountFromDb = await db.Account.findOne({
        email: accountRegistration.email,
      });

      expect(accountFromDb).toBeTruthy();
      expect(accountFromDb.password).toBeUndefined();
      expect(accountFromDb.verificationToken).toBeDefined();
      expect(accountFromDb.verified).toBeUndefined();
      expect(accountFromDb.created).toBeDefined();

      const isHashCorrect = await bcrypt.compare(
        accountRegistration.password,
        accountFromDb.passwordHash
      );

      expect(isHashCorrect).toBe(true);
      expect(accountFromDb).toMatchObject({
        userName: accountRegistration.userName,
        email: accountRegistration.email,
      });
    });

    test('should make the first register into an admin and second into a user', async () => {
      await api
        .post('/accounts/register')
        .send(accountRegistration)
        .expect(201);

      await api
        .post('/accounts/register')
        .send({
          ...accountRegistration,
          userName: 'diff username',
          email: 'diffEmail@mail.com',
        })
        .expect(201);

      const accountFromDb1 = await db.Account.findOne({
        email: accountRegistration.email,
      });
      const accountFromDb2 = await db.Account.findOne({
        email: 'diffEmail@mail.com',
      });

      expect(accountFromDb1.role).toBe(role.Admin);
      expect(accountFromDb2.role).toBe(role.User);
    });

    test('should return 400 if any essential data missing', async () => {
      const missingUserName = copyObj(accountRegistration);
      delete missingUserName.userName;
      await api.post('/accounts/register').send(missingUserName).expect(400);

      const missingEmail = copyObj(accountRegistration);
      delete missingEmail.email;
      await api.post('/accounts/register').send(missingEmail).expect(400);

      const missingPassword = copyObj(accountRegistration);
      delete missingPassword.password;
      await api.post('/accounts/register').send(missingPassword).expect(400);

      const missingPasswordConfirm = copyObj(accountRegistration);
      delete missingPasswordConfirm.passwordConfirm;
      await api
        .post('/accounts/register')
        .send(missingPasswordConfirm)
        .expect(400);

      const accountsFromDb = await db.Account.find({});
      expect(accountsFromDb).toHaveLength(0);
    });

    test('should return 400 if any essential data invalid', async () => {
      const passwordTooShort = copyObj(accountRegistration);
      passwordTooShort.password = '1234567';
      await api.post('/accounts/register').send(passwordTooShort).expect(400);

      const passwordTooLong = copyObj(accountRegistration);
      passwordTooLong.password = '12345678901234567890123456';
      await api.post('/accounts/register').send(passwordTooLong).expect(400);

      const passwordsMismatch = copyObj(accountRegistration);
      passwordsMismatch.password = '12345678';
      passwordsMismatch.passwordConfirm = '12345679';
      await api.post('/accounts/register').send(passwordsMismatch).expect(400);

      const userNameTooShort = copyObj(accountRegistration);
      userNameTooShort.userName = '12';
      await api.post('/accounts/register').send(userNameTooShort).expect(400);

      const userNameTooLong = copyObj(accountRegistration);
      userNameTooLong.userName = '1234567890123456';
      await api.post('/accounts/register').send(userNameTooLong).expect(400);

      const emailWithoutAt = copyObj(accountRegistration);
      emailWithoutAt.email = 'email.com';
      await api.post('/accounts/register').send(emailWithoutAt).expect(400);

      const accountsFromDb = await db.Account.find({});
      expect(accountsFromDb).toHaveLength(0);
    });

    test('should return 400 if email or userName already in db', async () => {
      await insertAccounts([accountOne, accountTwo, accountAdmin]);

      const sameUserName = copyObj(accountRegistration);
      sameUserName.userName = accountOne.userName;
      sameUserName.email = 'differentTest@mail.com';
      await api.post('/accounts/register').send(sameUserName).expect(400);

      const sameEmail = copyObj(accountRegistration);
      sameEmail.userName = 'differentUserName';
      sameEmail.email = accountOne.email;
      await api.post('/accounts/register').send(sameEmail).expect(400);
    });
  });

  describe('POST /accounts/verify-email', () => {
    beforeEach(async () => {
      await insertAccounts([accountUnverified]);
    });

    test('should activate account if token correct', async () => {
      const response = await api
        .post('/accounts/verify-email')
        .send({ token: accountUnverified.verificationToken })
        .expect(200);

      expect(response.body).toEqual({
        message: 'Verification successful, you can now login',
      });

      const accountFromDb = await db.Account.findOne({
        email: accountUnverified.email,
      });
      expect(accountFromDb.verified).toBeDefined();
      expect(accountFromDb.verificationToken).toBeUndefined();
    });

    test('should return 400 if token is wrong or missing', async () => {
      await api.post('/accounts/verify-email').expect(400);
      await api
        .post('/accounts/verify-email')
        .send({ token: 'wrongToken' })
        .expect(400);

      const accountFromDb = await db.Account.findOne({
        email: accountUnverified.email,
      });
      expect(accountFromDb.verified).toBeUndefined();
      expect(accountFromDb.verificationToken).toBe('1234567890');
    });
  });
});

describe('Authentication', () => {
  describe('POST /accounts/authenticate', () => {
    beforeEach(async () => {
      await insertAccounts([accountOne, accountTwo, accountAdmin]);
    });

    test('should return 200 and a valid jwt if email & passsword are correct', async () => {
      const credentials = {
        email: accountTwo.email,
        password: '12345678',
      };

      const response = await api
        .post('/accounts/authenticate')
        .send(credentials)
        .expect(200);

      expect(response.body).toMatchObject({
        userName: accountTwo.userName,
        email: accountTwo.email,
        role: accountTwo.role,
      });
      expect(response.body.tokenJwt).toBeDefined();

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      const jwtDecoded = jwt.verify(response.body.tokenJwt, SECRET);
      expect(jwtDecoded.id).toBe(response.body.id);
      expect(jwtDecoded.id).toBe(accountFromDb.id);
    });

    test('should return 401 if email not found', async () => {
      const credentials = {
        email: `${accountTwo.email}wrong`,
        password: '12345678',
      };

      const response = await api
        .post('/accounts/authenticate')
        .send(credentials)
        .expect(401);

      expect(response.body).toEqual({ message: 'incorrect email or password' });
    });

    test('should return 401 if password is wrong', async () => {
      const credentials = {
        email: accountTwo.email,
        password: 'wrongPassword',
      };

      const response = await api
        .post('/accounts/authenticate')
        .send(credentials)
        .expect(401);

      expect(response.body).toEqual({ message: 'incorrect email or password' });
    });
  });
});

describe('Token manipulations', () => {
  beforeEach(async () => {
    await insertAccounts([accountOne, accountTwo, accountAdmin]);
    await insertTokensRefresh([
      tokenRefreshAccountOne,
      tokenRefreshAccountTwo,
      tokenRefreshAccountAdmin,
      tokenRefreshAccountTwoExpired,
    ]);
  });

  describe('POST /accounts/refresh-token', () => {
    test('should return a new jwt token if refresh token is valid', async () => {
      const response = await api
        .post('/accounts/refresh-token')
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountTwo.token}`])
        .expect(200);

      expect(response.body.tokenJwt).toBeDefined();

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      const jwtDecoded = jwt.verify(response.body.tokenJwt, SECRET);
      expect(jwtDecoded.id).toBe(response.body.id);
      expect(jwtDecoded.id).toBe(accountFromDb.id);
    });

    test('should refresh the refresh token', async () => {
      const response = await api
        .post('/accounts/refresh-token')
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountTwo.token}`])
        .expect(200);

      const tokenRefreshReceived = response.headers['set-cookie'][0]
        .split(',')
        .map((item) => item.split(';')[0])[0];

      const isCookieTokenRefresh =
        tokenRefreshReceived.startsWith('tokenRefresh=');
      expect(isCookieTokenRefresh).toBe(true);
      expect(tokenRefreshReceived).not.toBe(
        `tokenRefresh=${tokenRefreshAccountTwo.token}`
      );
    });

    test('should return 400 if refresh token is invalid or missing', async () => {
      const responseToWrongToken = await api
        .post('/accounts/refresh-token')
        .set('Cookie', [`tokenRefresh=wrongToken`])
        .expect(400);
      const responseToMissingToken = await api
        .post('/accounts/refresh-token')
        .expect(400);

      expect(responseToWrongToken.body.tokenJwt).toBeUndefined();
      expect(responseToMissingToken.body.tokenJwt).toBeUndefined();
      expect(responseToWrongToken.body).toEqual({ message: 'invalid token' });
      expect(responseToMissingToken.body).toEqual({ message: 'invalid token' });
    });

    test('should return 401 if refresh token is expired', async () => {
      const response = await api
        .post('/accounts/refresh-token')
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountTwoExpired.token}`])
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });
    });
  });

  describe('POST /accounts/revoke-token', () => {
    test("should revoke a user's refresh token if refresh token sent", async () => {
      await api
        .post('/accounts/revoke-token')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountTwo.token}`])
        .send({ tokenRefresh: tokenRefreshAccountTwo.token })
        .expect(200);

      const tokenRefreshFromDb = await db.TokenRefresh.findOne({
        token: tokenRefreshAccountTwo.token,
      });
      expect(tokenRefreshFromDb.revokedByIp).toBeDefined();
      expect(tokenRefreshFromDb.revoked).toBeDefined();
    });

    test("should revoke a user's refresh token if refresh token not sent", async () => {
      await api
        .post('/accounts/revoke-token')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountTwo.token}`])
        .expect(200);

      const tokenRefreshFromDb = await db.TokenRefresh.findOne({
        token: tokenRefreshAccountTwo.token,
      });
      expect(tokenRefreshFromDb.revokedByIp).toBeDefined();
      expect(tokenRefreshFromDb.revoked).toBeDefined();
    });

    test('should revoke any refresh token sent by an admin', async () => {
      await api
        .post('/accounts/revoke-token')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountAdmin.token}`])
        .send({ tokenRefresh: tokenRefreshAccountOne.token })
        .expect(200);

      const tokenRefreshFromDb = await db.TokenRefresh.findOne({
        token: tokenRefreshAccountOne.token,
      });
      expect(tokenRefreshFromDb.revokedByIp).toBeDefined();
      expect(tokenRefreshFromDb.revoked).toBeDefined();
    });

    test('should return 400 if invalid or missing jwt is sent in Auth header', async () => {
      const responseToInvalidJwt = await api
        .post('/accounts/revoke-token')
        .set('Authorization', `bearer invalid_jwt_token`)
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountTwo.token}`])
        .send({ tokenRefresh: tokenRefreshAccountTwo.token })
        .expect(400);

      const reponseToMissingJwt = await api
        .post('/accounts/revoke-token')
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountTwo.token}`])
        .send({ tokenRefresh: tokenRefreshAccountTwo.token })
        .expect(400);

      expect(responseToInvalidJwt.body).toEqual({ message: 'invalid token' });
      expect(reponseToMissingJwt.body).toEqual({ message: 'invalid token' });

      const tokenRefreshFromDb = await db.TokenRefresh.findOne({
        token: tokenRefreshAccountTwo.token,
      });
      expect(tokenRefreshFromDb.revokedByIp).toBeUndefined();
      expect(tokenRefreshFromDb.revoked).toBeUndefined();
    });

    test('should return 401 if jwt token is expired', async () => {
      const response = await api
        .post('/accounts/revoke-token')
        .set('Authorization', `bearer ${tokenJwtAccountTwoExpired}`)
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountTwo.token}`])
        .send({ tokenRefresh: tokenRefreshAccountTwo.token })
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });

      const tokenRefreshFromDb = await db.TokenRefresh.findOne({
        token: tokenRefreshAccountTwo.token,
      });
      expect(tokenRefreshFromDb.revokedByIp).toBeUndefined();
      expect(tokenRefreshFromDb.revoked).toBeUndefined();
    });

    test('should return 400 if no refresh in cookie or sent', async () => {
      await api
        .post('/accounts/revoke-token')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(400);

      const tokenRefreshFromDb = await db.TokenRefresh.findOne({
        token: tokenRefreshAccountTwo.token,
      });
      expect(tokenRefreshFromDb.revokedByIp).toBeUndefined();
      expect(tokenRefreshFromDb.revoked).toBeUndefined();
    });

    test('should return 401 if refresh token expired', async () => {
      const response = await api
        .post('/accounts/revoke-token')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountTwoExpired.token}`])
        .expect(401);

      expect(response.body.message).toBe('expired token');

      const tokenRefreshFromDb = await db.TokenRefresh.findOne({
        token: tokenRefreshAccountTwoExpired.token,
      });
      expect(tokenRefreshFromDb.revokedByIp).toBeUndefined();
      expect(tokenRefreshFromDb.revoked).toBeUndefined();
    });

    test('should return 401 if user revokes not his refresh token', async () => {
      await api
        .post('/accounts/revoke-token')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .set('Cookie', [`tokenRefresh=${tokenRefreshAccountTwo.token}`])
        .send({ tokenRefresh: tokenRefreshAccountOne.token })
        .expect(401);

      const tokenRefreshFromDb = await db.TokenRefresh.findOne({
        token: tokenRefreshAccountOne.token,
      });
      expect(tokenRefreshFromDb.revokedByIp).toBeUndefined();
      expect(tokenRefreshFromDb.revoked).toBeUndefined();
    });
  });
});

describe('Reseting the password', () => {
  beforeEach(async () => {
    await insertAccounts([
      accountOne,
      accountTwo,
      accountAdmin,
      accountTokenResetExpired,
    ]);
  });

  describe('POST /accounts/forgot-password', () => {
    test('should create a reset token on the account in db if email found', async () => {
      await api
        .post('/accounts/forgot-password')
        .send({ email: accountTwo.email })
        .expect(200);

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb.resetToken.token).toBeDefined();
      expect(accountFromDb.resetToken.token).not.toBe(
        accountTwo.resetToken.token
      );
    });

    test('should return 200 if email not found in db', async () => {
      await api
        .post('/accounts/forgot-password')
        .send({ email: 'email_that_is_not_in_db@mail.com' })
        .expect(200);
    });

    test('should return 400 if no email sent', async () => {
      await api.post('/accounts/forgot-password').expect(400);
    });

    test('should return 400 if invalid email sent', async () => {
      await api
        .post('/accounts/forgot-password')
        .send({ email: 'invalid_email' })
        .expect(400);
    });
  });

  describe('POST /accounts/reset-password', () => {
    test('should change password if data ok', async () => {
      await api
        .post('/accounts/reset-password')
        .send({
          token: accountTwo.resetToken.token,
          password: '87654321',
          passwordConfirm: '87654321',
        })
        .expect(200);

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb.passwordHash).toBeDefined();
      expect(accountFromDb.resetToken.token).toBeUndefined();

      const isNewPasswordCorrect = await bcrypt.compare(
        '87654321',
        accountFromDb.passwordHash
      );
      const isOldPasswordCorrect = await bcrypt.compare(
        '12345678',
        accountFromDb.passwordHash
      );

      expect(isNewPasswordCorrect).toBe(true);
      expect(isOldPasswordCorrect).toBe(false);
    });

    test('should return 400 if any of essential data is missing', async () => {
      await api
        .post('/accounts/reset-password')
        .send({ token: accountTwo.resetToken.token, password: '87654321' })
        .expect(400);

      await api
        .post('/accounts/reset-password')
        .send({
          token: accountTwo.resetToken.token,
          passwordConfirm: '87654321',
        })
        .expect(400);

      await api
        .post('/accounts/reset-password')
        .send({ password: '87654321', passwordConfirm: '87654321' })
        .expect(400);

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb.passwordHash).toBe(accountTwo.passwordHash);
    });

    test('should return 400 if password too short', async () => {
      await api
        .post('/accounts/reset-password')
        .send({
          token: accountTwo.resetToken.token,
          password: '7654321',
          passwordConfirm: '7654321',
        })
        .expect(400);

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb.passwordHash).toBe(accountTwo.passwordHash);
    });

    test('should return 400 if passwords mismatch', async () => {
      await api
        .post('/accounts/reset-password')
        .send({
          token: accountTwo.resetToken.token,
          password: '97654321',
          passwordConfirm: '87654321',
        })
        .expect(400);

      await api
        .post('/accounts/reset-password')
        .send({
          token: accountTwo.resetToken.token,
          password: '87654321',
          passwordConfirm: '97654321',
        })
        .expect(400);

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb.passwordHash).toBe(accountTwo.passwordHash);
    });

    test('should return 400 if reset token expired', async () => {
      await api
        .post('/accounts/reset-password')
        .send({
          token: accountTokenResetExpired.resetToken.token,
          password: '87654321',
          passwordConfirm: '87654321',
        })
        .expect(400);

      const accountFromDb = await db.Account.findOne({
        email: accountTokenResetExpired.email,
      });
      expect(accountFromDb.passwordHash).toBe(
        accountTokenResetExpired.passwordHash
      );
    });
  });
});

describe('Viewing the accounts', () => {
  beforeEach(async () => {
    await insertAccounts([
      accountOne,
      accountTwo,
      accountAdmin,
      accountTokenResetExpired,
    ]);
  });

  describe('GET /accounts', () => {
    test('should return accounts if is admin and token valid', async () => {
      const response = await api
        .get('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .expect(200);

      expect(response.body).toHaveLength(4);
    });

    test('should return 400 if invalid or missing jwt is sent in Auth header', async () => {
      const responseToInvalidJwt = await api
        .get('/accounts')
        .set('Authorization', `bearer invalid_jwt_token`)
        .expect(400);

      const responseToMissingJwt = await api.get('/accounts').expect(400);

      expect(responseToInvalidJwt.body).toEqual({ message: 'invalid token' });
      expect(responseToMissingJwt.body).toEqual({ message: 'invalid token' });
    });

    test('should return 401 if jwt token is expired', async () => {
      const response = await api
        .get('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdminExpired}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });
    });

    test('should return 401 if is not admin', async () => {
      const response = await api
        .get('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'unauthorized' });
    });
  });

  describe('GET /accounts/:id', () => {
    test('should return account if user requests his own account', async () => {
      const response = await api
        .get(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: accountTwo._id,
        userName: accountTwo.userName,
        email: accountTwo.email,
      });
    });

    test('should return account if admin requests any account', async () => {
      const response = await api
        .get(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: accountTwo._id,
        userName: accountTwo.userName,
        email: accountTwo.email,
      });
    });

    test('should return 400 if invalid or missing jwt is sent in Auth header', async () => {
      const responseToInvalidJwt = await api
        .get(`/accounts/${accountOne._id}`)
        .set('Authorization', `bearer invalid_jwt_token`)
        .expect(400);

      const responseToMissingJwt = await api
        .get(`/accounts/${accountOne._id}`)
        .expect(400);

      expect(responseToInvalidJwt.body).toEqual({ message: 'invalid token' });
      expect(responseToMissingJwt.body).toEqual({ message: 'invalid token' });
    });

    test('should return 401 if jwt token is expired', async () => {
      const response = await api
        .get(`/accounts/${accountOne._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdminExpired}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });
    });

    test('should return 401 if user requests not his account', async () => {
      const response = await api
        .get(`/accounts/${accountOne._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'unauthorized' });
    });

    test('should return 404 if no such account in db', async () => {
      const response = await api
        .get(`/accounts/${await getANonExistingId()}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .expect(404);

      expect(response.body).toMatchObject({ message: 'account not found' });
    });
  });
});

describe('Manipulating accounts', () => {
  beforeEach(async () => {
    await insertAccounts([accountOne, accountTwo, accountAdmin]);
  });

  describe('PUT /accounts/:id', () => {
    test('should update account if user changes his own account', async () => {
      const response = await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send({ userName: 'new_userName' })
        .expect(200);

      expect(response.body).toMatchObject({
        id: accountTwo._id,
        userName: 'new_userName',
        email: accountTwo.email,
      });

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb).toMatchObject({
        userName: 'new_userName',
        email: accountTwo.email,
      });
    });

    test('should update account if admin requests any account', async () => {
      const response = await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send({ userName: 'new_userName_changed_by_admin' })
        .expect(200);

      expect(response.body).toMatchObject({
        id: accountTwo._id,
        userName: 'new_userName_changed_by_admin',
        email: accountTwo.email,
      });

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb).toMatchObject({
        userName: 'new_userName_changed_by_admin',
        email: accountTwo.email,
      });
    });

    test('should hash the password if password changed', async () => {
      const response = await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send({ password: '87654321', passwordConfirm: '87654321' })
        .expect(200);

      expect(response.body).toMatchObject({
        id: accountTwo._id,
        userName: accountTwo.userName,
        email: accountTwo.email,
      });

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      const isNewPasswordCorrect = await bcrypt.compare(
        '87654321',
        accountFromDb.passwordHash
      );
      const isOldPasswordCorrect = await bcrypt.compare(
        '12345678',
        accountFromDb.passwordHash
      );

      expect(isNewPasswordCorrect).toBe(true);
      expect(isOldPasswordCorrect).toBe(false);
    });

    test('should apply role change if admin', async () => {
      const response = await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send({ role: role.Admin })
        .expect(200);

      expect(response.body).toMatchObject({
        id: accountTwo._id,
        userName: accountTwo.userName,
        email: accountTwo.email,
        role: role.Admin,
      });

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb).toMatchObject({
        userName: accountTwo.userName,
        email: accountTwo.email,
        role: role.Admin,
      });
    });

    test('should ignore if user attempts to change role', async () => {
      const response = await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send({ role: role.Admin })
        .expect(200);

      expect(response.body).toMatchObject({
        id: accountTwo._id,
        userName: accountTwo.userName,
        email: accountTwo.email,
        role: role.User,
      });

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb).toMatchObject({
        userName: accountTwo.userName,
        email: accountTwo.email,
        role: role.User,
      });
    });

    test('should return 400 if invalid or missing jwt is sent in Auth header', async () => {
      const responseToInvalidJwt = await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer invalid_jwt_token`)
        .send({ userName: 'new_userName' })
        .expect(400);

      const responseToMissingJwt = await api
        .put(`/accounts/${accountTwo._id}`)
        .send({ userName: 'new_userName' })
        .expect(400);

      expect(responseToInvalidJwt.body).toEqual({ message: 'invalid token' });
      expect(responseToMissingJwt.body).toEqual({ message: 'invalid token' });
    });

    test('should return 401 if jwt token is expired', async () => {
      const response = await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdminExpired}`)
        .send({ userName: 'new_userName' })
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });
    });

    test('should return 401 if user changes not his own account', async () => {
      const response = await api
        .put(`/accounts/${accountOne._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send({ userName: 'new_userName' });

      expect(response.body).toEqual({ message: 'unauthorized' });
    });

    test('should return 404 if no account in db', async () => {
      const response = await api
        .put(`/accounts/${await getANonExistingId()}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send({ userName: 'new_userName_changed_by_admin' })
        .expect(404);

      expect(response.body).toMatchObject({ message: 'account not found' });
    });

    test('should return 400 if userName already taken', async () => {
      const response = await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send({ userName: accountOne.userName })
        .expect(400);

      expect(response.body).toEqual({
        message: `username "${accountOne.userName}" is already taken`,
      });
    });

    test('should return 400 if email already taken', async () => {
      const response = await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send({ email: accountOne.email })
        .expect(400);

      expect(response.body).toEqual({
        message: `email "${accountOne.email}" is already taken`,
      });
    });

    test('should return 400 if password too short', async () => {
      await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send({ password: '7654321', passwordConfirm: '7654321' })
        .expect(400);

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb.passwordHash).toBe(accountTwo.passwordHash);
    });

    test('should return 400 if passwords mismatch', async () => {
      await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send({
          password: '97654321',
          passwordConfirm: '87654321',
        })
        .expect(400);

      await api
        .put(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send({
          password: '87654321',
          passwordConfirm: '97654321',
        })
        .expect(400);

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb.passwordHash).toBe(accountTwo.passwordHash);
    });
  });

  describe('DELETE /accounts/:id', () => {
    test('should delete account if user deletes his own account', async () => {
      const response = await api
        .delete(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .expect(200);

      expect(response.body).toMatchObject({
        message: 'account deleted successfully',
      });

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb).toBeNull();
    });

    test('should update account if admin requests any account', async () => {
      const response = await api
        .delete(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .expect(200);

      expect(response.body).toMatchObject({
        message: 'account deleted successfully',
      });

      const accountFromDb = await db.Account.findOne({
        email: accountTwo.email,
      });
      expect(accountFromDb).toBeNull();
    });

    test('should return 400 if invalid or missing jwt is sent in Auth header', async () => {
      const responseToInvalidJwt = await api
        .delete(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer invalid_jwt_token`)
        .expect(400);

      const responseToMissingJwt = await api
        .delete(`/accounts/${accountTwo._id}`)
        .expect(400);

      expect(responseToInvalidJwt.body).toEqual({ message: 'invalid token' });
      expect(responseToMissingJwt.body).toEqual({ message: 'invalid token' });
    });

    test('should return 401 if jwt token is expired', async () => {
      const response = await api
        .delete(`/accounts/${accountTwo._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdminExpired}`)
        .expect(401);

      expect(response.body).toEqual({ message: 'expired token' });
    });

    test('should return 401 if user deletes not his own account', async () => {
      const response = await api
        .delete(`/accounts/${accountOne._id}`)
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`);

      expect(response.body).toEqual({ message: 'unauthorized' });
    });

    test('should return 404 if no account in db', async () => {
      const response = await api
        .delete(`/accounts/${await getANonExistingId()}`)
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .expect(404);

      expect(response.body).toMatchObject({ message: 'account not found' });
    });
  });

  describe('POST /accounts', () => {
    // creating the accounts
    test('should create account if is admin', async () => {
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(accountRegistration)
        .expect(201);

      const accountFromDb = await db.Account.findOne({
        email: accountRegistration.email,
      });

      expect(accountFromDb).toBeTruthy();
      expect(accountFromDb.password).toBeUndefined();
      expect(accountFromDb.verified).toBeDefined();
      expect(accountFromDb.created).toBeDefined();

      const isHashCorrect = await bcrypt.compare(
        accountRegistration.password,
        accountFromDb.passwordHash
      );

      expect(isHashCorrect).toBe(true);
      expect(accountFromDb).toMatchObject({
        userName: accountRegistration.userName,
        email: accountRegistration.email,
      });

      const accountsFromDb = await db.Account.find({});
      expect(accountsFromDb).toHaveLength(4);
    });

    test('should return 401 if is user', async () => {
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountTwo}`)
        .send(accountRegistration)
        .expect(401);

      const accountsFromDb = await db.Account.find({});
      expect(accountsFromDb).toHaveLength(3);
    });

    test('should return 400 if any essential data missing', async () => {
      const missingUserName = copyObj(accountRegistration);
      delete missingUserName.userName;
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(missingUserName)
        .expect(400);

      const missingEmail = copyObj(accountRegistration);
      delete missingEmail.email;
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(missingEmail)
        .expect(400);

      const missingPassword = copyObj(accountRegistration);
      delete missingPassword.password;
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(missingPassword)
        .expect(400);

      const missingPasswordConfirm = copyObj(accountRegistration);
      delete missingPasswordConfirm.passwordConfirm;
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(missingPasswordConfirm)
        .expect(400);

      const missingRole = copyObj(accountRegistration);
      delete missingRole.role;
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(missingRole)
        .expect(400);

      const accountsFromDb = await db.Account.find({});
      expect(accountsFromDb).toHaveLength(3);
    });

    test('should return 400 if any essential data invalid', async () => {
      const passwordTooShort = copyObj(accountRegistration);
      passwordTooShort.password = '1234567';
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(passwordTooShort)
        .expect(400);

      const passwordsMismatch = copyObj(accountRegistration);
      passwordsMismatch.password = '12345678';
      passwordsMismatch.passwordConfirm = '12345679';
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(passwordsMismatch)
        .expect(400);

      const userNameTooShort = copyObj(accountRegistration);
      userNameTooShort.userName = '12';
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(userNameTooShort)
        .expect(400);

      const emailWithoutAt = copyObj(accountRegistration);
      emailWithoutAt.email = 'email.com';
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(emailWithoutAt)
        .expect(400);

      const accountsFromDb = await db.Account.find({});
      expect(accountsFromDb).toHaveLength(3);
    });

    test('should return 400 if email or userName already in db', async () => {
      const sameUserName = copyObj(accountRegistration);
      sameUserName.userName = accountOne.userName;
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(sameUserName)
        .expect(400);

      const sameEmail = copyObj(accountRegistration);
      sameEmail.email = accountOne.email;
      await api
        .post('/accounts')
        .set('Authorization', `bearer ${tokenJwtAccountAdmin}`)
        .send(sameEmail)
        .expect(400);
    });
  });
});
