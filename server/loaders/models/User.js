const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../utils/sequelize').getSequelize();
const Application = require('./Application');
const Organization = require('./Organization');
const Role = require('./Role');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  }
);

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
User.belongsTo(Application, {
  foreignKey: {
    name: 'applicationId',
  },
});

module.exports = User;
