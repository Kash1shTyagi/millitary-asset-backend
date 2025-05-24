'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // 1. Bases
    await queryInterface.bulkInsert('Bases', [
      { name: 'Base Alpha', location: 'North Sector', createdAt: now, updatedAt: now },
      { name: 'Base Bravo', location: 'East Sector',  createdAt: now, updatedAt: now }
    ]);

    // 2. Assets (must reference existing Bases via baseId)
    await queryInterface.bulkInsert('Assets', [
      { name: 'Tank',       type: 'Vehicle',     current_quantity: 5,  baseId: 1, createdAt: now, updatedAt: now },
      { name: 'Rifle',      type: 'Weapon',      current_quantity: 20, baseId: 1, createdAt: now, updatedAt: now },
      { name: 'Ammo Box',   type: 'Ammunition',  current_quantity: 100,baseId: 2, createdAt: now, updatedAt: now }
    ]);

    // 3. Users (replace 'hashed_pw' with real bcrypt hashes)
    await queryInterface.bulkInsert('Users', [
      { username: 'admin',      password: '$2b$10$hashed_pw_here', role: 'Admin',            baseId: null, createdAt: now, updatedAt: now },
      { username: 'commander1', password: '$2b$10$hashed_pw_here', role: 'BaseCommander',   baseId: 1,    createdAt: now, updatedAt: now },
      { username: 'logistics1',password: '$2b$10$hashed_pw_here', role: 'LogisticsOfficer',baseId: 1,    createdAt: now, updatedAt: now }
    ]);

    // 4. Purchases
    await queryInterface.bulkInsert('Purchases', [
      { quantity: 10, date: now, baseId: 1, assetId: 2, createdAt: now, updatedAt: now },
      { quantity: 50, date: now, baseId: 2, assetId: 3, createdAt: now, updatedAt: now }
    ]);

    // 5. Transfers
    await queryInterface.bulkInsert('Transfers', [
      { quantity:  2, timestamp: now, fromBaseId: 1, toBaseId: 2, assetId: 1, createdAt: now, updatedAt: now },
      { quantity: 10, timestamp: now, fromBaseId: 2, toBaseId: 1, assetId: 3, createdAt: now, updatedAt: now }
    ]);

    // 6. Assignments
    await queryInterface.bulkInsert('Assignments', [
      { assignee: 'Soldier A', quantity: 3, expended: false, date: now, baseId: 1, assetId: 2, createdAt: now, updatedAt: now },
      { assignee: 'Soldier B', quantity: 1, expended: false, date: now, baseId: 1, assetId: 2, createdAt: now, updatedAt: now }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Assignments', null);
    await queryInterface.bulkDelete('Transfers',   null);
    await queryInterface.bulkDelete('Purchases',   null);
    await queryInterface.bulkDelete('Users',       null);
    await queryInterface.bulkDelete('Assets',      null);
    await queryInterface.bulkDelete('Bases',       null);
  }
};
