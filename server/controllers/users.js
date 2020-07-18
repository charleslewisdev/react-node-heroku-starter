const {create, findAll, findOne, update} = require('../services/users');
const {getUserToken} = require('../utils/jwt');
const {getRouteFromUrl} = require('../utils/requests');
const {
  badRequestResponse,
  errorResponse,
  successResponse,
  unauthorizedResponse,
} = require('../utils/responseTypes');
const {models} = require('../utils/sequelize').getSequelize();
const {reqHandler} = require('./requests');

const login = async ({body}, res) => {
  const {email} = body;
  const {user} = await findOne({where: {email}});
  if (!user) {
    return res.status(401).json(unauthorizedResponse('Unauthorized'));
  }
  const token = getUserToken(user.uuid);
  return res.status(200).json(successResponse('Success', {token}));
};

const addUser = async (req, res) => {
  await reqHandler(create)(req, res);
};

const getUsers = async (req, res) => {
  req.body = {
    ...req.body,
    include: [models.Role],
  };
  await reqHandler(findAll)(req, res);
};

const updateUser = async (req, res) => {
  await reqHandler(update)(req, res);
};

const validatorMiddleware = ({body, originalUrl}, res, next) => {
  const methodName = getRouteFromUrl(originalUrl);
  const {email, googleId, id, username} = body;
  switch (methodName) {
    case 'login':
      if (!email) {
        return res.status(400).json(badRequestResponse('"email" is required'));
      }
      if (!googleId) {
        return res
          .status(400)
          .json(badRequestResponse('"googleId" is required'));
      }
      break;
    case 'addUser':
      if (!username) {
        return res
          .status(400)
          .json(badRequestResponse('"username" is required'));
      }
      if (!email) {
        return res.status(400).json(badRequestResponse('"email" is required'));
      }
      break;
    case 'updateUser':
      if (!id) {
        return res.status(400).json(badRequestResponse('"id" is required'));
      }
      break;
    case 'getUsers':
      break;
    default:
      return res.status(500).json(errorResponse('Unexpected methodName'));
  }
  next();
};

module.exports = {addUser, getUsers, updateUser, login, validatorMiddleware};
