/* eslint-disable import/no-extraneous-dependencies */
import * as request from 'supertest';
import app from '../config/app';

describe('Create Account Routes', () => {
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
