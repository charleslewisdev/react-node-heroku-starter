const {create, findAll, update} = require('../services/organizations');
const {getRouteFromUrl} = require('../utils/requests');
const {badRequestResponse, errorResponse} = require('../utils/responseTypes');
const {reqHandler} = require('./requests');

const addOrganization = async (req, res) => {
  await reqHandler(create)(req, res);
};

const getOrganizations = async (req, res) => {
  await reqHandler(findAll)(req, res);
};

const updateOrganization = async (req, res) => {
  await reqHandler(update)(req, res);
};

const validatorMiddleware = ({body, originalUrl}, res, next) => {
  const methodName = getRouteFromUrl(originalUrl);
  const {id, name} = body;
  switch (methodName) {
    case 'addOrganization':
      if (!name) {
        return res.status(400).json(badRequestResponse('"name" is required'));
      }
      break;
    case 'updateOrganization':
      if (!id) {
        return res.status(400).json(badRequestResponse('"id" is required'));
      }
      if (!name) {
        return res.status(400).json(badRequestResponse('"name" is required'));
      }
      break;
    case 'getOrganizations':
      break;
    default:
      return res.status(500).json(errorResponse('Unexpected methodName'));
  }
  next();
};

module.exports = {
  addOrganization,
  getOrganizations,
  updateOrganization,
  validatorMiddleware,
};
