const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const getUserToken = (userUuid) => {
  return jwt.sign({userUuid}, JWT_SECRET);
};

module.exports = {
  getUserToken,
};
