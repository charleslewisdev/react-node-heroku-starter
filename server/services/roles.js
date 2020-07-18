const {successResponse} = require('../utils/responseTypes');
const {models} = require('../utils/sequelize').getSequelize();

const create = async ({Permissions, ...values}) => {
  const role = await models.Role.create(values);
  if (!Permissions) {
    return successResponse('Success', {role});
  }
  const foundRole = await models.Role.findByPk(role.id);
  const permissionIds = Permissions.map(({id}) => id);
  const updated = await foundRole.setPermissions(permissionIds);
  return successResponse('Success', {role: updated});
};

const findAll = async (query) => {
  const roles = await models.Role.findAll(query);
  return successResponse('Success', {roles});
};

const findOne = async (query) => {
  const role = await models.Role.findOne(query);
  return successResponse('Success', {role});
};

const update = async ({id, Permissions, ...values}) => {
  const role = await models.Role.update(values, {where: {id}});
  if (!Permissions) {
    return successResponse('Success', {role});
  }
  const foundRole = await models.Role.findByPk(id);
  const permissionIds = Permissions.map(({id}) => id);
  const updated = await foundRole.setPermissions(permissionIds);
  return successResponse('Success', {role: updated});
};

const destroy = async (query) => {
  const role = await models.Role.destroy(query);
  return successResponse('Success', {role});
};

module.exports = {
  create,
  destroy,
  findAll,
  findOne,
  update,
};
