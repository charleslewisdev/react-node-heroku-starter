const {successResponse} = require('../utils/responseTypes');
const {models} = require('../utils/sequelize').getSequelize();

const create = async (query) => {
  const permission = await models.Permission.create(query);
  return successResponse('Success', {permission});
};

const findAll = async (query) => {
  const permissions = await models.Permission.findAll(query);
  return successResponse('Success', {permissions});
};

const findOne = async (query) => {
  const permission = await models.Permission.findOne(query);
  return successResponse('Success', {permission});
};

const update = async ({id, ...values}) => {
  const permission = await models.Permission.update(values, {where: {id}});
  return successResponse('Success', {permission});
};

const destroy = async (query) => {
  const permission = await models.Permission.destroy(query);
  return successResponse('Success', {permission});
};

module.exports = {
  create,
  destroy,
  findAll,
  findOne,
  update,
};
