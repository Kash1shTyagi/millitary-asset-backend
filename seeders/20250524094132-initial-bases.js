'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Bases', [
      { name: 'HQ Command', location: '35.6895° N, 139.6917° E', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Forward Base Alpha', location: '48.8566° N, 2.3522° E', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Bases', null, {});
  }
};