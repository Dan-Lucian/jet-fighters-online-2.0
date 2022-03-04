const supertest = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const app = require('../app');
const { SECRET } = require('../utils/config');

const api = supertest(app);

describe('Login', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10);

    const user = new User({
      username: 'admin',
      name: 'admin',
      passwordHash,
    });

    await user.save();
  });

  test('succeedes by returning a jwt if valid login data', async () => {
    const userToLogin = {
      username: 'admin',
      password: 'password',
    };

    const response = await api
      .post('/api/login')
      .send(userToLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.token).toBeDefined();

    const jwtDecoded = jwt.verify(response.body.token, SECRET);
    expect(jwtDecoded.username).toBe(userToLogin.username);
  }, 10000);

  test('fails with 401 and error message if username not found', async () => {
    const userToLogin = {
      username: 'wrongLogin',
      password: 'password',
    };

    const response = await api
      .post('/api/login')
      .send(userToLogin)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBe('invalid username or password');
    expect(response.body.token).toBeUndefined();
  }, 10000);

  test('fails with 401 and error message if password is wrong', async () => {
    const userToLogin = {
      username: 'admin',
      password: 'wrongPassword',
    };

    const response = await api
      .post('/api/login')
      .send(userToLogin)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBe('invalid username or password');
    expect(response.body.token).toBeUndefined();
  }, 10000);
});

afterAll(() => {
  mongoose.connection.close();
});
