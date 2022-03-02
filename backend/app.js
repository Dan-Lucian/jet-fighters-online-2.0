import express from 'express';
import cors from 'cors';
import middleware from './utils/middleware.js';
import routerWild from './controllers/wild.js';

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.loggerRequest);

app.use('*', routerWild);

app.use(middleware.endpointUknown);
app.use(middleware.handlerError);

export default app;
