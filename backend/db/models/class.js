'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {});
  Class.associate = function(models) {
    Class.hasMany(models.Ticket, { foreignKey: 'classId' });
    Class.hasMany(models.Like, { foreignKey: 'classId' });

    const columnMapping = {
      through: 'ClassCategory',
      foreignKey: 'classId',
      otherKey: 'categoryId',
    }
    Class.belongsToMany(models.Category, columnMapping);
  };
  return Class;
};
