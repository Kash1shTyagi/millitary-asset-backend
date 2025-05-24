const { AuditLog } = require("../models");
const logger = require("../utils/logger");

const auditLogger = async (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", async () => {
    try {
      await AuditLog.create({
        userId: req.user?.id || null,
        action: `${req.method} ${req.path}`,
        endpoint: req.path,
        method: req.method,
        timestamp: new Date(),
        details: JSON.stringify({
          status: res.statusCode,
          duration: Date.now() - startTime + "ms",
        }),
      });

      logger.info(
        `Audit logged: ${req.method} ${req.path} - ${res.statusCode}`
      );
    } catch (error) {
      logger.error(`Audit logging failed: ${error.message}`);
    }
  });

  next();
};

module.exports = auditLogger;
