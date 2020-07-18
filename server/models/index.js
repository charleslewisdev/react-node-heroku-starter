const sequelize = require('../utils/sequelize').getSequelize();
require('./Organization');
require('./Permission');
require('./Role');
require('./User');

const _sync = async () => {
  await sequelize.sync();
};
_sync();
