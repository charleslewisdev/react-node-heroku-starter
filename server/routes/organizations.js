const express = require('express');
const {authenticate, authorize} = require('../controllers/auth');
const controller = require('../controllers/organizations');
const router = express.Router();

router.post(
  '/addOrganization',
  authenticate,
  authorize,
  controller.validatorMiddleware('addOrganization'),
  controller.addOrganization
);

router.get(
  '/getOrganizations',
  authenticate,
  authorize,
  controller.validatorMiddleware('getOrganizations'),
  controller.getOrganizations
);

module.exports = router;
