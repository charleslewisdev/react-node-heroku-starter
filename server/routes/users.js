const express = require('express');
const {authenticate, authorize} = require('../controllers/auth');
const {
  login,
  addUser,
  getUsers,
  updateUser,
  validatorMiddleware,
} = require('../controllers/users');
const router = express.Router();

router.post('/login', validatorMiddleware, login);

router.post('/addUser', authenticate, authorize, validatorMiddleware, addUser);

router.get('/getUsers', authenticate, authorize, validatorMiddleware, getUsers);

router.put(
  '/updateUser',
  authenticate,
  authorize,
  validatorMiddleware,
  updateUser
);

module.exports = router;
