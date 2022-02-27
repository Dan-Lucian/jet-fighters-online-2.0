const loggerRequest = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path  :', request.path);
  console.log('Body  :', request.body);
  console.log('-------');
  next();
};

const endpointUknown = (request, response) => {
  response.status(404).send({ error: 'uknown enpoint' });
};

const handlerError = (error, request, response, next) => {
  console.error(error.message);

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
