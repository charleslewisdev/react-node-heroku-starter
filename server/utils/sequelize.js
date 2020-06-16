const {Sequelize} = require('sequelize');
const logger = require('./logger').getLogger();
const {DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, NODE_ENV} = process.env;

const logging =
  NODE_ENV === 'production' ? false : (msg) => logger.verbose(msg);

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging,
});

const _testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.debug('Database connection established successfully');
  } catch (error) {
    logger.error('Error establishing database connection: %o', error);
  }
};
_testConnection();

const getSequelize = () => {
  return sequelize;
};

module.exports = {getSequelize};
