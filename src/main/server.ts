import 'dotenv/config';
import MongoHelper from '../infra/database/mongodb/helpers/MongoHelper';
import env from './config/env';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () =>
      console.log(`🚀 Server running at localhost:${env.port}`),
    );
  })
  .catch(console.error);
