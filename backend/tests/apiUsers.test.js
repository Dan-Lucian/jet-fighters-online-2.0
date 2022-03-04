import supertest from 'supertest';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/user.js';
import app from '../app.js';
import { usersInDb } from './helperTests.js';

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('admin', 10);
  const user = new User({ username: 'admin', passwordHash });

  await user.save();
});

describe('Creating a new user', () => {
  test('succeeds with 201 if data valid', async () => {
    const usersAtStart = await usersInDb();

    const userNew = {
      username: 'dan',
      name: 'Dan',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(userNew)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(userNew.username);
  }, 10000);

  test('stored password hash matches initial password', async () => {
    const userNew = {
      username: 'dan',
      name: 'Dan',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(userNew)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const userFromDb = await User.findOne({ username: userNew.username });
    const match = await bcrypt.compare(
      userNew.password,
      userFromDb.passwordHash
    );

    expect(match).toBe(true);
  }, 10000);

  test('fails with 400 if username already in db', async () => {
    const usersAtStart = await usersInDb();
    const userNew = {
      username: 'admin',
      name: 'Dan',
      password: 'admin',
    };

    const response = await api
      .post('/api/users')
      .send(userNew)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBe('username must be unique');

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }, 10000);

  test('fails with 400 if username too short (<3 char)', async () => {
    const usersAtStart = await usersInDb();
    const userNew = {
      username: 'ro',
      name: 'Dan',
      password: 'password',
    };

    const response = await api
      .post('/api/users')
      .send(userNew)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBeDefined();

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }, 10000);

  test('fails with 400 if username missing', async () => {
    const usersAtStart = await usersInDb();
    const userNew = {
      name: 'Dan',
      password: 'password',
    };

    const response = await api
      .post('/api/users')
      .send(userNew)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBeDefined();

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }, 10000);

  test('fails with 400 if password too short (<6 char)', async () => {
    const usersAtStart = await usersInDb();
    const userNew = {
      username: 'admin',
      name: 'Dan',
      password: '12345',
    };

    const response = await api
      .post('/api/users')
      .send(userNew)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBeDefined();

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }, 10000);

  test('fails with 400 if password missing', async () => {
    const usersAtStart = await usersInDb();
    const userNew = {
      username: 'admin',
      name: 'Dan',
    };

    const response = await api
      .post('/api/users')
      .send(userNew)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBeDefined();

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }, 10000);
});

afterAll(() => {
  mongoose.connection.close();
});
