'use strict';
module.exports = (sequelize, DataTypes) => {
  const classCategory = sequelize.define('ClassCategory', {
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  classCategory.associate = function(models) {
    // associations can be defined here
  };
  return classCategory;
};
