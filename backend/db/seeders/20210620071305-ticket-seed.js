'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Tickets', [
        { userId: 1, classId: 1, price: 45, numOfTickets: 1 },
        { userId: 1, classId: 2, price: 90, numOfTickets: 2 },
        { userId: 1, classId: 3, price: 45, numOfTickets: 1 },
        { userId: 1, classId: 4, price: 45, numOfTickets: 1 },
        { userId: 2, classId: 1, price: 90, numOfTickets: 2 },
        { userId: 2, classId: 3, price: 45, numOfTickets: 1 },
        { userId: 3, classId: 2, price: 90, numOfTickets: 2 },
        { userId: 3, classId: 4, price: 45, numOfTickets: 1 },
        { userId: 4, classId: 1, price: 90, numOfTickets: 2 },
        { userId: 5, classId: 3, price: 45, numOfTickets: 1 },
        { userId: 6, classId: 1, price: 45, numOfTickets: 1 },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tickets', null, {});
  }
};
