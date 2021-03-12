'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('People', [{
      nome: 'Felipe',
      senha: '$2b$10$n6eSDUf0Y4.sd5tt02BK2ee.s3mMgYy0IeJEgbvrI6ZrAf5QHg66m'
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
