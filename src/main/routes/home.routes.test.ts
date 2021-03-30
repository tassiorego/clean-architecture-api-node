/* eslint-disable import/no-extraneous-dependencies */
import * as request from 'supertest';
import app from '../config/app';

describe('Create Home Routes', () => {
  test('should return an account on success', async () => {
    await request(app).get('/').expect(200);
  });
});
