'use strict';
module.exports = {
  up: async (qi, Sequelize) => {
    await qi.createTable('Bases', {
      id:    { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name:  { type: Sequelize.STRING, allowNull: false, unique: true },
      location:{ type: Sequelize.STRING, allowNull: false },
      createdAt:{ type: Sequelize.DATE, allowNull: false },
      updatedAt:{ type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async qi => { await qi.dropTable('Bases'); }
};
