'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numOfTickets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Ticket.associate = function(models) {
    Ticket.belongsTo(models.User, { foreignKey: 'userId' });
    Ticket.belongsTo(models.Class, { foreignKey: 'classId' });
  };
  return Ticket;
};
