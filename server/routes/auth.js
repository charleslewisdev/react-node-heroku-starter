const express = require('express');
const {
  authenticate,
  authorize,
  getUserPermissions,
} = require('../controllers/auth');
const {getUserToken} = require('../utils/jwt');
const {successResponse} = require('../utils/responseTypes');
const router = express.Router();

router.post('/getToken', authenticate, authorize, ({body}, res) => {
  const {userId} = body;
  const token = getUserToken(userId);
  return res.status(200).json(successResponse('Success', {token}));
});

router.get('/getUserPermissions', authenticate, getUserPermissions);

module.exports = router;
