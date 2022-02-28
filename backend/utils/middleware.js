import logger from './logger.js';

const loggerRequest = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path  :', request.path);
  logger.info('Body  :', request.body);
  logger.info('-------');
  next();
};

const endpointUknown = (request, response) => {
  response.status(404).send({ error: 'uknown enpoint' });
};

const handlerError = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const middleware = {
  loggerRequest,
  endpointUknown,
  handlerError,
};

export default middleware;
