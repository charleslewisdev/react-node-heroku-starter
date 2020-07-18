const {DataTypes} = require('sequelize');
const sequelize = require('../utils/sequelize').getSequelize();

const _updateSuperAdmin = async () => {
  const superAdminRole = await sequelize.models.Role.findOne({
    where: {name: 'SUPER_ADMIN'},
  });
  const allPermissions = await sequelize.models.Permission.findAll();
  const allPermissionIds = allPermissions.map(({id}) => id);
  await superAdminRole.setPermissions(allPermissionIds);
};

const Permission = sequelize.define(
  'Permission',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      afterCreate: async (permission, options) => {
        // update SUPER_ADMIN role to have all Permissions
        await _updateSuperAdmin();
      },
    },
  }
);

module.exports = Permission;
