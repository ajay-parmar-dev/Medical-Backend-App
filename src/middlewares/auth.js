const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Authorization token missing'));
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    req.userId = payload.sub;
    req.userRole = payload.role;
    next();
  } catch (e) {
    next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired token'));
  }
}

module.exports = authenticate;


