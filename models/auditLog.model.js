module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'audit_logs',
    timestamps: true,
    updatedAt: false
  });

  AuditLog.associate = (models) => {
    AuditLog.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return AuditLog;
};