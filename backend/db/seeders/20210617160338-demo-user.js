'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        { firstName: 'Demo', lastName: 'User', email: 'demo@user.com', hashedPassword: bcrypt.hashSync('password'), vaxCardImg: 'img.png', userPhoto: 'img.png', mailingList: true, admin: false },
        { firstName: 'Bucky', lastName: 'Barnes', email: 'wintersoldier@avengers.com', hashedPassword: bcrypt.hashSync(faker.internet.password()), vaxCardImg: 'img.png', userPhoto: '', mailingList: true, admin: false },
        { firstName: 'Sam', lastName: 'Wilson', email: 'camptainamerica@avengers.com', hashedPassword: bcrypt.hashSync(faker.internet.password()), vaxCardImg: 'img.png', userPhoto: 'img.png', mailingList: true, admin: false },
        { firstName: 'Wanda', lastName: 'Maximoff', email: 'scarletwitch@avenger.com', hashedPassword: bcrypt.hashSync(faker.internet.password()), vaxCardImg: 'img.png', userPhoto: '', mailingList: true, admin: false },
        { firstName: 'Vis', lastName: 'Vision', email: 'vision@avengers.com', hashedPassword: bcrypt.hashSync(faker.internet.password()), vaxCardImg: 'img.png', userPhoto: '', mailingList: true, admin: true },
        { firstName: 'Loki', lastName: 'Laufeyson', email: 'godofmischief@notavenger.com', hashedPassword: bcrypt.hashSync(faker.internet.password()), vaxCardImg: 'img.png', userPhoto: 'img.png', mailingList: true, admin: true },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
      return queryInterface.bulkDelete('Users', {
        email: { [Op.in]: ['demo@user.com', 'wintersoldier@avengers.com', 'camptainamerica@avengers.com', 'scarletwitch@avenger.com', 'vision@avengers.com', 'godofmischief@notavenger.com'] }
      }, {});
  }
};
