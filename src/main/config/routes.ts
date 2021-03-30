import { Express, Router } from 'express';
import * as fg from 'fast-glob';

export default (app: Express): void => {
  const router = Router();
  app.use(router);
  fg.sync('**/src/main/routes/**.routes.ts').map(async file => {
    const route = (await import(`../../../${file}`)).default;
    route(router);
  });
};
