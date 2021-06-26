'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Class, { foreignKey: 'categoryId' });
  };
  return Category;
};
