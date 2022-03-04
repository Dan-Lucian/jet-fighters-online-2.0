import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cors from 'cors';
import middleware from './utils/middleware.js';
import routerWild from './controllers/wild.js';
import routerUsers from './controllers/users.js';
import { MONGODB_URI } from './utils/config.js';
import logger from './utils/logger.js';

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.loggerRequest);

app.use('/api/users', routerUsers);
app.use('*', routerWild);

app.use(middleware.endpointUknown);
app.use(middleware.handlerError);

export default app;
