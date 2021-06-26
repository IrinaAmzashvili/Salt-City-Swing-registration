'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Likes', [
        { userId: 1, classId: 1 },
        { userId: 1, classId: 3 },
        { userId: 2, classId: 4 },
        { userId: 2, classId: 3 },
        { userId: 3, classId: 1 },
        { userId: 3, classId: 2 },
        { userId: 4, classId: 2 },
        { userId: 4, classId: 4 },
        { userId: 5, classId: 1 },
        { userId: 5, classId: 3 },
        { userId: 6, classId: 2 },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Likes', null, {});
  }
};
