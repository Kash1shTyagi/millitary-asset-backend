'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('Transfers', {
      id:        { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      quantity:  { type: Sequelize.INTEGER, allowNull: false },
      timestamp: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      fromBaseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Bases', key: 'id' },
        onDelete: 'CASCADE'
      },
      toBaseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Bases', key: 'id' },
        onDelete: 'CASCADE'
      },
      assetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Assets', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt:{ type: Sequelize.DATE, allowNull: false },
      updatedAt:{ type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async qi => { await qi.dropTable('Transfers'); }
};
