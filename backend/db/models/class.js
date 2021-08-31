"use strict";
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // dates: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
      image: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {}
  );
  Class.associate = function (models) {
    Class.hasMany(models.Ticket, { foreignKey: "classId" });
    Class.hasMany(models.Like, { foreignKey: "classId" });
    Class.belongsTo(models.Category, { foreignKey: "categoryId" });
  };
  return Class;
};
