'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('Users', {
      id:        { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username:  { type: Sequelize.STRING, allowNull: false, unique: true },
      password:  { type: Sequelize.STRING, allowNull: false },
      role:      { type: Sequelize.ENUM('Admin','BaseCommander','LogisticsOfficer'), allowNull: false },
      baseId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Bases', key: 'id' },
        onDelete: 'SET NULL'
      },
      createdAt:{ type: Sequelize.DATE, allowNull: false },
      updatedAt:{ type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async qi => { await qi.dropTable('Users'); }
};
