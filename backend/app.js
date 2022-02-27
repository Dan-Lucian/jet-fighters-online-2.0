import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import middleware from './utils/middleware.js';
import routerBlogs from './controllers/index.js';

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.loggerRequest);

app.use('/', routerBlogs);

app.use(middleware.endpointUknown);
app.use(middleware.handlerError);

export default app;
