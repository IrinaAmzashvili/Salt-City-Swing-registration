'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Like.belongsTo(models.Class, { foreignKey: 'classId', onDelete: 'CASCADE' });
  };
  return Like;
};
