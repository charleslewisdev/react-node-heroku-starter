const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const logger = require('../utils/logger').getLogger();
const auth = require('../routes/auth');
const organizations = require('../routes/organizations');
const PORT = process.env.PORT || 8000;

const init = (app) => {
  app.use(bodyParser.json());
  app.use(express.static(path.resolve(__dirname, '../../client/build')));
  app.use(cors());
  app.use('/api/auth', auth);
  app.use('/api/organizations', organizations);
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
  app.listen(PORT, () => {
    logger.debug(`Listening on port ${PORT}...`);
  });
};

module.exports = init;
