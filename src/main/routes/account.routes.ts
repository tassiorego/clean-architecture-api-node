import { Router } from 'express';

export default (router: Router): void => {
  router.post('/accounts', (req, res) => {
    res.json({ ok: true });
  });
};
