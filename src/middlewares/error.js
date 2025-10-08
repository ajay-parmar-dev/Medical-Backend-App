const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  let { statusCode = httpStatus.INTERNAL_SERVER_ERROR, message } = err;

  if (err.name === 'SequelizeValidationError') {
    statusCode = httpStatus.BAD_REQUEST;
    message = err.errors.map((e) => e.message).join(', ');
  }

  const response = {
    code: statusCode,
    message: message || httpStatus[statusCode] || 'Error',
  };

  if (config.env === 'development' && err.stack) {
    response.stack = err.stack;
  }

  logger.error('%s %s %s', req.method, req.originalUrl, err.stack || err);
  res.status(statusCode).json(response);
};

module.exports = errorHandler;


