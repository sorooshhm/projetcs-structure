import { CONFIGS } from '../src/app/core/enums/Configs.enum';
import App from '../src/app/index';
import envVars from '../src/env/env';
import * as request from 'supertest';
import UsersModels from '../src/app/modules/user/Users.models';
import { emptyCollection } from '../src/app/core/utils';
import * as mongoose from 'mongoose';

envVars();
const env = process.env;
const appHandler = new App(env);
const BASE = '/api/users';
let user = {
  name: 'test user',
  familyName: 'test user',
  phone: '09333264585',
  password: '123456',
  role: 'user',
  email: 'user1@gmail.com',
  description: 'a test user',
  _id: '',
};
const loginBody = {
  phone: '09337743819',
  password: 'admin',
};
let adminToken: string;
let userToken: string;

(async function () {
  await appHandler.setUpDataBase(env);
  emptyCollection(UsersModels, { role: 'user' });
})();

const app = appHandler.app;

describe('testing users apis', () => {
  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });
  test('login admin', async () => {
    const res = await request(app)
      .post(BASE + '/login')
      .send(loginBody);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.headers).toHaveProperty(CONFIGS.AUTH_HEADER);
    adminToken = res.headers[CONFIGS.AUTH_HEADER];
  });

  test('post user', async () => {
    const res = await request(app)
      .post(BASE + '/')
      .send(user);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.headers).toHaveProperty(CONFIGS.AUTH_HEADER);
    userToken = res.headers[CONFIGS.AUTH_HEADER];
    user = res.body.user;
  });

  test('get users', async () => {
    const res = await request(app).get(BASE + '/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('users');
  });

  // test('get one user', async () => {
  //   const res = await request(app)
  //     .get(BASE + '/' + user._id)
  //     .set(CONFIGS.AUTH_HEADER, adminToken);
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty('user');
  //   expect(res.body.user._id).toEqual(user._id);
  // });

  // test('patch user', async () => {
  //   const res = await request(app)
  //     .post(BASE + '/' + user._id)
  //     .set(CONFIGS.AUTH_HEADER, userToken)
  //     .send({ name: 'test user patch' });
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty('user');
  //   user = res.body.user;
  // });

  // test('delete user', async () => {
  //   const res = await request(app)
  //     .delete(BASE + '/' + user._id)
  //     .set(CONFIGS.AUTH_HEADER, adminToken);
  //   expect(res.statusCode).toEqual(200);
  // });
});
