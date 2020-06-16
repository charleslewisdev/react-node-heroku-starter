const passport = require('passport');
const {getUserPermissions} = require('../services/user');
const {unauthorizedResponse} = require('../utils/responseTypes');

const authenticate = (req, res, next) => {
  return passport.authenticate('jwt', {session: false})(req, res, next);
};

const authorize = async (req, res, next) => {
  const {user, originalUrl} = req;
  const route = originalUrl.substr(originalUrl.lastIndexOf('/') + 1);
  const {permissions} = await getUserPermissions(user.id);
  if (permissions.includes(route)) {
    return next();
  }
  return res.status(401).json(unauthorizedResponse('Insufficient permissions'));
};

module.exports = {authenticate, authorize};
