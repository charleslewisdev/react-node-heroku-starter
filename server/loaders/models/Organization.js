const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../utils/sequelize').getSequelize();

class Organization extends Model {}

Organization.init(
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
    modelName: 'Organization',
    tableName: 'Organizations',
  }
);

module.exports = Organization;
