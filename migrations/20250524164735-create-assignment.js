'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('Assignments', {
      id:        { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      assignee:  { type: Sequelize.STRING, allowNull: false },
      quantity:  { type: Sequelize.INTEGER, allowNull: false },
      expended:  { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      date:      { type: Sequelize.DATEONLY, allowNull: false },
      baseId: {
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
  down: async qi => { await qi.dropTable('Assignments'); }
};
