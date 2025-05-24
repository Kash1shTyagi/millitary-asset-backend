const { AuditLog } = require('../models');
const logger = require('../utils/logger');

const auditLogger = async (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', async () => {
    try {
      await AuditLog.create({
        action: `${req.method} ${req.path}`,
        details: JSON.stringify({
          status: res.statusCode,
          duration: Date.now() - startTime + 'ms'
        }),
        userId: req.user?.id || null
      });
      
      logger.info(`Audit logged: ${req.method} ${req.path} - ${res.statusCode}`);
    } catch (error) {
      logger.error(`Audit logging failed: ${error.message}`);
    }
  });

  next();
};