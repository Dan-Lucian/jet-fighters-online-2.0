const jwt = require('jsonwebtoken');
const db = require('../utils/db');
const TokenRefresh = require('../features/accounts/token-refresh.model');
const { SECRET } = require('../config/env');

module.exports = authorize;

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  let arrayRoles = roles;
  if (typeof roles === 'string') {
    arrayRoles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (request.user)
    async (request, response, next) => {
      const authorization = request.get('authorization');

      if (!authorization) throw 'invalid token';
      if (!authorization.toLowerCase().startsWith('bearer '))
        throw 'invalid token';

      // if token invalid it will throw an error by itself
      const tokenDecoded = jwt.verify(authorization.substring(7), SECRET);
      request.user = tokenDecoded;

      next();
    },

    // authorize based on user role
    async (request, response, next) => {
      const account = await db.Account.findById(request.user.id);
      const tokensRefresh = await TokenRefresh.find({ account: account.id });

      if (
        !account ||
        (arrayRoles.length && !arrayRoles.includes(account.role))
      ) {
        // account no longer exists or role not authorized
        throw 'unauthorized';
      }

      // authentication and authorization successful
      request.user.role = account.role;
      request.user.ownsToken = (token) =>
        !!tokensRefresh.find((x) => x.token === token);
      next();
    },
  ];
}
