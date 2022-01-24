import { Router } from 'express';
import mongooseService from './common/services/mongoose.service';

const appRouter = (dbService: typeof mongooseService): Router => {
  const routes = Router();

  // routes.use('/users', User(dbService));

  return routes;
};

export default appRouter;
