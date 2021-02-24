/* eslint-disable import/no-extraneous-dependencies */
import * as request from 'supertest';
import app from '../config/app';

describe('Body parser Middleware', () => {
  test('should parse body as json', async () => {
    app.get('/test_cors', (req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*');
  });
});
