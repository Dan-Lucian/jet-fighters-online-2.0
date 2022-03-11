/* eslint-disable no-nested-ternary */
/* eslint-disable no-case-declarations */
module.exports = errorHandler;

function errorHandler(error, request, response, next) {
  switch (true) {
    case typeof error === 'string':
      const errorNormalized = error.toLowerCase();
      switch (true) {
        case errorNormalized.endsWith('not found'):
          return response.status(404).json({ message: errorNormalized });

        case errorNormalized === 'unauthorized':
          return response.status(401).json({ message: errorNormalized });

        case errorNormalized === 'incorrect email or password':
          return response.status(401).json({ message: errorNormalized });

        case errorNormalized === 'expired token':
          return response.status(401).json({ message: errorNormalized });

        default:
          return response.status(400).json({ message: error });
      }

    case error.name === 'ValidationError':
      // mongoose validation error
      return response
        .status(400)
        .json({ message: `${error.name}: ${error.message}` });

    case error.name === 'UnauthorizedError':
      // jwt authentication error
      return response.status(401).json({ message: 'unauthorized' });

    case error.name === 'JsonWebTokenError':
      return response.status(400).json({ message: 'invalid token' });

    case error.name === 'TokenExpiredError':
      return response.status(401).json({ message: 'expired token' });

    default:
      return response
        .status(500)
        .json({ message: `${error.name}: ${error.message}` });
  }
}
