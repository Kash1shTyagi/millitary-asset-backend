module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {
    id:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId:  {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Users', key: 'id' },
      onDelete: 'SET NULL'
    },
    action:    { type: DataTypes.STRING, allowNull: false },
    endpoint:  { type: DataTypes.STRING, allowNull: false },
    method:    { type: DataTypes.STRING, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'AuditLogs',
    timestamps: true
  });

  return AuditLog;
};
