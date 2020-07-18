const express = require('express');
const {authenticate, authorize} = require('../controllers/auth');
const {
  addOrganization,
  getOrganizations,
  updateOrganization,
  validatorMiddleware,
} = require('../controllers/organizations');
const {limiterMiddleware} = require('../middlewares/queryLimiter');
const router = express.Router();

router.post(
  '/addOrganization',
  authenticate,
  authorize,
  validatorMiddleware,
  addOrganization
);

router.get(
  '/getOrganizations',
  authenticate,
  authorize,
  validatorMiddleware,
  limiterMiddleware,
  getOrganizations
);

router.put(
  '/updateOrganization',
  authenticate,
  authorize,
  validatorMiddleware,
  updateOrganization
);

module.exports = router;
