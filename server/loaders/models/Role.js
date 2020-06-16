const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../utils/sequelize').getSequelize();

class Role extends Model {}

Role.init(
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
    sequelize,
    modelName: 'Role',
    tableName: 'Roles',
  }
);

module.exports = Role;
