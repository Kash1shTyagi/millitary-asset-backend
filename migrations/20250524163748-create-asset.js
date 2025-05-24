'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('Assets', {
      id:              { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name:            { type: Sequelize.STRING, allowNull: false },
      type:            { type: Sequelize.ENUM('Weapon','Vehicle','Ammunition'), allowNull: false },
      current_quantity:{ type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      baseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Bases', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt:{ type: Sequelize.DATE, allowNull: false },
      updatedAt:{ type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async qi => { await qi.dropTable('Assets'); }
};
