require('dotenv').config();
const {DATABASE_URL} = process.env;
const {
  dialect,
  host,
  name: database,
  password,
  username,
} = require('../utils/sequelize').getDbParams(DATABASE_URL);

module.exports = {
  develop: {
    username,
    password,
    database,
    host,
    dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username,
    password,
    database,
    host,
    dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username,
    password,
    database,
    host,
    dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
