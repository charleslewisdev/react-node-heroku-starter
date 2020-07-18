const {Op} = require('sequelize');
const {getRouteFromUrl, getUserScopes} = require('../utils/requests');

const limiterMiddleware = async (req, res, next) => {
  const methodName = getRouteFromUrl(req.originalUrl);
  const userScopes = await getUserScopes(req);
  const whereClause = _getWhereClause(methodName, userScopes);
  req.body = {
    ...req.body,
    where: {
      ...req.body.where,
      ...whereClause,
    },
  };
  next();
};

const _getWhereClause = (methodName, userScopes) => {
  switch (methodName) {
    case 'getOrganizations':
      return {id: {[Op.or]: userScopes.organizationIds}};
    default:
      throw new Error('Unexpected methodName');
  }
};

module.exports = {
  limiterMiddleware,
};
