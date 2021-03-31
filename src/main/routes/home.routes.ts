import { Router } from 'express';

export default (router: Router): void => {
  router.get('/', (req, res) => {
    res.json({
      context: `${process.env.API_NAME}-api`,
      node_version: process.versions.node,
    });
  });
};
