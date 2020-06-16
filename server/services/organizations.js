const {successResponse} = require('../utils/responseTypes');
const {models} = require('../utils/sequelize').getSequelize();

const add = async (query) => {
  const organization = await models.Organization.create(query);
  return successResponse('Success', {organization});
};

const getAll = async (query) => {
  const organizations = await models.Organization.findAll(query);
  return successResponse('Success', {organizations});
};

const getOne = async (query) => {
  const organization = await models.Organization.findOne(query);
  return successResponse('Success', {organization});
};

module.exports = {add, getAll, getOne};
