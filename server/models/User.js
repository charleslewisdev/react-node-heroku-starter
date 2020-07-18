const {DataTypes} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const sequelize = require('../utils/sequelize').getSequelize();
const Organization = require('./Organization');
const Role = require('./Role');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: uuidv4(),
    // TODO: change uuid to be on prehook so value is newly generated each time
  },
});

User.belongsTo(Role, {
  foreignKey: {
    name: 'roleId',
    allowNull: false,
  },
});
User.belongsTo(Organization, {
  foreignKey: {
    name: 'organizationId',
  },
});

module.exports = User;
