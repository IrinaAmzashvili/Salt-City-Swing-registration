'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ClassCategories', [
        { classId: 1, categoryId: 1 },
        { classId: 1, categoryId: 4 },
        { classId: 2, categoryId: 2 },
        { classId: 2, categoryId: 4 },
        { classId: 3, categoryId: 1 },
        { classId: 3, categoryId: 4 },
        { classId: 4, categoryId: 2 },
        { classId: 4, categoryId: 4 },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ClassCategories', null, {});
  }
};
