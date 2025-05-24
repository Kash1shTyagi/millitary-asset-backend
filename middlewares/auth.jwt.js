const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const config = require('../config/config');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn('JWT Authentication Failed: No token provided');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      logger.error(`JWT Verification Failed: ${err.message}`);
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    req.user = {
      id: decoded.userId,
      role: decoded.role,
      baseId: decoded.baseId
    };
    
    logger.info(`Authenticated user ${decoded.userId} (${decoded.role})`);
    next();
  });
};

module.exports = authenticateJWT;