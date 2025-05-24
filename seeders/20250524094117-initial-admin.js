'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('SecurePass123!', 10);
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', { username: 'admin' });
  }
};