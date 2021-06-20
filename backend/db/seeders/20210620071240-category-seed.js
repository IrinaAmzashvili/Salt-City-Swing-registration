'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Categories', [
        { type: 'Level 1' },
        { type: 'Level 2' },
        { type: 'Level 3' },
        { type: 'Lindy Hop' },
        { type: 'Charleston' },
        { type: 'Solo Jazz' },
        { type: 'Balboa' },
        { type: 'Collegiate Shag' },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
