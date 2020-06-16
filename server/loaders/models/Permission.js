const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../utils/sequelize').getSequelize();

class Permission extends Model {}

Permission.init(
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
    modelName: 'Permission',
    tableName: 'Permissions',
  }
);

module.exports = Permission;
