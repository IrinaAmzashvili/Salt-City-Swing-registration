'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Category.associate = function(models) {
    const columnMapping = {
      through: 'ClassCategory',
      foreignKey: 'categoryId',
      otherKey: 'classId'
    }
    Category.belongsToMany(models.Class, columnMapping);
  };
  return Category;
};
