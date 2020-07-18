const {create, findAll, update} = require('../services/permissions');
const {getRouteFromUrl} = require('../utils/requests');
const {badRequestResponse, errorResponse} = require('../utils/responseTypes');
const {reqHandler} = require('./requests');

const addPermission = async (req, res) => {
  await reqHandler(create)(req, res);
};

const getPermissions = async (req, res) => {
  await reqHandler(findAll)(req, res);
};

const updatePermission = async (req, res) => {
  await reqHandler(update)(req, res);
};

const validatorMiddleware = ({body, originalUrl}, res, next) => {
  const methodName = getRouteFromUrl(originalUrl);
  const {id, name} = body;
  switch (methodName) {
    case 'addPermission':
      if (!name) {
        return res.status(400).json(badRequestResponse('"name" is required'));
      }
      break;
    case 'updatePermission':
      if (!id) {
        return res.status(400).json(badRequestResponse('"id" is required'));
      }
      if (!name) {
        return res.status(400).json(badRequestResponse('"name" is required'));
      }
      break;
    case 'getPermissions':
      break;
    default:
      return res.status(500).json(errorResponse('Unexpected methodName'));
  }
  next();
};

module.exports = {
  addPermission,
  getPermissions,
  updatePermission,
  validatorMiddleware,
};
