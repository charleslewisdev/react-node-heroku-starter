const {successResponse} = require('../utils/responseTypes');
const {models} = require('../utils/sequelize').getSequelize();

const getOne = async (query) => {
  const user = await models.User.findOne(query);
  return successResponse('Success', {user});
};

const getUserPermissions = async (userId) => {
  const user = await models.User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        model: models.Role,
        include: [
          {
            model: models.Permission,
          },
        ],
      },
    ],
  });
  const permissions = user.Role.Permissions.map(({name}) => {
    return name;
  });
  const {Role: role} = user;
  return successResponse('Success', {permissions, role});
};

const login = async (googleProfileObj) => {
  return successResponse('Success', {googleProfileObj});
};

const create = async (query) => {
  const user = await models.User.create(query);
  return successResponse('Success', {user});
};

const findAll = async (query) => {
  const users = await models.User.findAll(query);
  return successResponse('Success', {users});
};

const findOne = async (query) => {
  const user = await models.User.findOne(query);
  return successResponse('Success', {user});
};

const update = async ({id, ...values}) => {
  const user = await models.User.update(values, {where: {id}});
  return successResponse('Success', {user});
};

const destroy = async (query) => {
  const user = await models.User.destroy(query);
  return successResponse('Success', {user});
};

module.exports = {
  create,
  destroy,
  findAll,
  findOne,
  update,
  getOne,
  getUserPermissions,
  login,
};
