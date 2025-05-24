const logger = require('../utils/logger');

const checkRole = (allowedRoles) => (req, res, next) => {
  if (!req.user) {
    logger.error('RBAC Failed: No user in request');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!allowedRoles.includes(req.user.role)) {
    logger.warn(`RBAC Denied: User ${req.user.id} tried accessing ${allowedRoles}`);
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  next();
};

module.exports = {
  admin: checkRole(['admin']),
  commander: checkRole(['commander', 'admin']),
  logistics: checkRole(['logistics', 'admin'])
};