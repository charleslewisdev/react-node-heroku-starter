const {successResponse} = require('../utils/responseTypes');
const {models} = require('../utils/sequelize').getSequelize();

const create = async (query) => {
  const organization = await models.Organization.create(query);
  return successResponse('Success', {organization});
};

const findAll = async (query) => {
  const organizations = await models.Organization.findAll(query);
  return successResponse('Success', {organizations});
};

const findOne = async (query) => {
  const organization = await models.Organization.findOne(query);
  return successResponse('Success', {organization});
};

const update = async ({id, ...values}) => {
  const organization = await models.Organization.update(values, {where: {id}});
  return successResponse('Success', {organization});
};

const destroy = async (query) => {
  const organization = await models.Organization.destroy(query);
  return successResponse('Success', {organization});
};

module.exports = {
  create,
  destroy,
  findAll,
  findOne,
  update,
};
