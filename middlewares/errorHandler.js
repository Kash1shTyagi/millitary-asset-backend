const logger = require('../utils/logger');
const apiResponse = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  if (process.env.NODE_ENV === 'development') {
    return apiResponse.error(res, message, statusCode, { stack: err.stack });
  }
  
  apiResponse.error(res, message, statusCode);
};

module.exports = errorHandler;