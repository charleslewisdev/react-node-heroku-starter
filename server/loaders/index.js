const express = require('express');
const initExpress = require('./express');
const initDatabase = require('./database');
const initAuth = require('./auth');

const init = () => {
  const app = express();
  initExpress(app);
  initDatabase();
  initAuth(app);
};

module.exports = init;
