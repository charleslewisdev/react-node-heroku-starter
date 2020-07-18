const passport = require('passport');
const service = require('../services/users');
const {getRouteFromUrl} = require('../utils/requests');
const {
  successResponse,
  unauthorizedResponse,
} = require('../utils/responseTypes');

const authenticate = (req, res, next) => {
  return passport.authenticate('jwt', {session: false})(req, res, next);
};

const authorize = async (req, res, next) => {
  const {user, originalUrl} = req;
  if (user.Role.name === 'SUPER_ADMIN') {
    return next();
  }
  const route = getRouteFromUrl(originalUrl);
  const {permissions} = await service.getUserPermissions(user.id);
  if (permissions.includes(route)) {
    return next();
  }
  return res.status(401).json(unauthorizedResponse('Insufficient permissions'));
};

const getUserPermissions = async ({user}, res) => {
  const {permissions, role} = await service.getUserPermissions(user.id);
  res.status(200).json(successResponse('Success', {permissions, role}));
};

module.exports = {
  authenticate,
  authorize,
  getUserPermissions,
};
