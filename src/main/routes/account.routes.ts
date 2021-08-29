import { Router } from 'express';
import { adapterRouter } from '../adapters/express-router-adapter';
import { makeCreateAccountController } from '../factories/create-account';

export default (router: Router): void => {
  router.post('/accounts', adapterRouter(makeCreateAccountController()));
};
