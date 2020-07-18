const express = require('express');
const {authenticate, authorize} = require('../controllers/auth');
const {
  addPermission,
  getPermissions,
  updatePermission,
  validatorMiddleware,
} = require('../controllers/permissions');
const router = express.Router();

router.post(
  '/addPermission',
  authenticate,
  authorize,
  validatorMiddleware,
  addPermission
);

router.get(
  '/getPermissions',
  authenticate,
  authorize,
  validatorMiddleware,
  getPermissions
);

router.put(
  '/updatePermission',
  authenticate,
  authorize,
  validatorMiddleware,
  updatePermission
);

module.exports = router;
