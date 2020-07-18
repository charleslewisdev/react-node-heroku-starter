const express = require('express');
const {authenticate, authorize} = require('../controllers/auth');
const {
  addRole,
  getRoles,
  updateRole,
  validatorMiddleware,
} = require('../controllers/roles');
const router = express.Router();

router.post('/addRole', authenticate, authorize, validatorMiddleware, addRole);

router.get('/getRoles', authenticate, authorize, validatorMiddleware, getRoles);

router.put(
  '/updateRole',
  authenticate,
  authorize,
  validatorMiddleware,
  updateRole
);

module.exports = router;
