const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const logger = require('../utils/logger').getLogger();
const auth = require('../routes/auth');
const organizations = require('../routes/organizations');
const permissions = require('../routes/permissions');
const roles = require('../routes/roles');
const users = require('../routes/users');
const PORT = process.env.PORT || 8000;
const CORS_OPTIONS = {
  preflightContinue: true, // enable passing preflight to subsequent request handlers
};

const init = (app) => {
  app.use(bodyParser.json());
  app.use(express.static(path.resolve(__dirname, '../../client/build')));
  app.options('*', cors(CORS_OPTIONS));
  app.use(cors(CORS_OPTIONS));
  app.use('/api/auth', auth);
  app.use('/api/organizations', organizations);
  app.use('/api/permissions', permissions);
  app.use('/api/roles', roles);
  app.use('/api/users', users);
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
  app.listen(PORT, () => {
    logger.debug(`Listening on port ${PORT}...`);
  });
};

module.exports = init;
