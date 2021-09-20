/* eslint-disable import/no-extraneous-dependencies */
import * as request from 'supertest';
import MongoHelper from '../../infra/database/mongodb/helpers/MongoHelper';
import app from '../config/app';

describe('Create Account Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  test('should return an account on success', async () => {
    await request(app)
      .post('/accounts')
      .send({
        name: 'Tássio Rego',
        email: 'tassiorego@gmail.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(200);
  });
});
