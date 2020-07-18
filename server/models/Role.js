const {DataTypes} = require('sequelize');
const sequelize = require('../utils/sequelize').getSequelize();
const Permission = require('./Permission');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Role.belongsToMany(Permission, {
  through: 'RolePermissions',
});
Permission.belongsToMany(Role, {
  through: 'RolePermissions',
});

module.exports = Role;
