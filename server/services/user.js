const {successResponse} = require('../utils/responseTypes');
const {models} = require('../utils/sequelize').getSequelize();

const getUserPermissions = async (userId) => {
  const {roleId} = await models.User.findOne({
    where: {
      id: userId,
    },
  });
  const rolePermissions = await models.RolePermission.findAll({
    where: {
      roleId,
    },
    include: [
      {
        model: models.Permission,
      },
    ],
  });
  const permissions = rolePermissions.map(({Permission}) => {
    return Permission.name;
  });
  return successResponse('Success', {permissions});
};

module.exports = {getUserPermissions};
