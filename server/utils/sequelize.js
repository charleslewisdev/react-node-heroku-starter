const {Sequelize} = require('sequelize');
const logger = require('./logger').getLogger();
const {DATABASE_URL, NODE_ENV} = process.env;

const getDbParams = (dbUrl) => {
  const [dialect, untrimmedUsername, pwAndHost, portAndDbName] = dbUrl.split(
    ':'
  );
  const username = untrimmedUsername.slice(2);
  const [password, host] = pwAndHost.split('@');
  const [__, name] = portAndDbName.split('/');
  return {
    dialect,
    host,
    name,
    password,
    username,
  };
};

const {dialect, host, name, password, username} = getDbParams(DATABASE_URL);

const logging =
  NODE_ENV === 'production' ? false : (msg) => logger.verbose(msg);

const sequelize = new Sequelize(name, username, password, {
  host,
  dialect,
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

module.exports = {getDbParams, getSequelize};
