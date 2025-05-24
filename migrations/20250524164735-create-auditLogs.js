'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('AuditLogs', {
      id:        { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL'
      },
      action:    { type: Sequelize.STRING,  allowNull: false },
      endpoint:  { type: Sequelize.STRING,  allowNull: false },
      method:    { type: Sequelize.STRING,  allowNull: false },
      timestamp: { type: Sequelize.DATE,    defaultValue: Sequelize.NOW },
      createdAt:{ type: Sequelize.DATE, allowNull: false },
      updatedAt:{ type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async qi => { await qi.dropTable('AuditLogs'); }
};
