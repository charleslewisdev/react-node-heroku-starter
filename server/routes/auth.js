const express = require('express');
const {authenticate, authorize} = require('../controllers/auth');
const {getUserToken} = require('../utils/jwt');
const {successResponse} = require('../utils/responseTypes');
const router = express.Router();

router.post('/getToken', ({body}, res) => {
  const {userId} = body;
  const token = getUserToken(userId);
  return res.status(200).json(successResponse('Success', {token}));
});

module.exports = router;
