const {create, findAll, update} = require('../services/roles');
const {getRouteFromUrl} = require('../utils/requests');
const {badRequestResponse, errorResponse} = require('../utils/responseTypes');
const {models} = require('../utils/sequelize').getSequelize();
const {reqHandler} = require('./requests');

const addRole = async (req, res) => {
  await reqHandler(create)(req, res);
};

const getRoles = async (req, res) => {
  req.body = {
    ...req.body,
    include: [
      {
        model: models.Permission,
        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
        through: {
          attributes: [],
        },
      },
    ],
  };
  await reqHandler(findAll)(req, res);
};

const updateRole = async (req, res) => {
  await reqHandler(update)(req, res);
};

const validatorMiddleware = ({body, originalUrl}, res, next) => {
  const methodName = getRouteFromUrl(originalUrl);
  const {id, name} = body;
  switch (methodName) {
    case 'addRole':
      if (!name) {
        return res.status(400).json(badRequestResponse('"name" is required'));
      }
      break;
    case 'updateRole':
      if (!id) {
        return res.status(400).json(badRequestResponse('"id" is required'));
      }
      if (!name) {
        return res.status(400).json(badRequestResponse('"name" is required'));
      }
      break;
    case 'getRoles':
      break;
    default:
      return res.status(500).json(errorResponse('Unexpected methodName'));
  }
  next();
};

module.exports = {
  addRole,
  getRoles,
  updateRole,
  validatorMiddleware,
};
