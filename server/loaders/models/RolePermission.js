const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../utils/sequelize').getSequelize();
const Permission = require('./Permission');
const Role = require('./Role');

class RolePermission extends Model {}

RolePermission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'RolePermissions',
  }
);

RolePermission.belongsTo(Permission, {
  foreignKey: {
    name: 'permissionId',
  },
});
RolePermission.belongsTo(Role, {
  foreignKey: {
    name: 'roleId',
  },
});

module.exports = RolePermission;
