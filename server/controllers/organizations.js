const service = require('../services/organizations');
const {badRequestResponse, errorResponse} = require('../utils/responseTypes');
const {reqHandler} = require('./requests');

const addOrganization = async (req, res) => {
  await reqHandler(service.add)(req, res);
};

const getOrganizations = async (req, res) => {
  await reqHandler(service.getAll)(req, res);
};

const validatorMiddleware = (methodName) => {
  return ({body}, res, next) => {
    const {name} = body;
    switch (methodName) {
      case 'addOrganization':
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
};

module.exports = {
  addOrganization,
  getOrganizations,
  validatorMiddleware,
};
