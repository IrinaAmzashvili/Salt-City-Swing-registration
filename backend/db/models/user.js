"use strict";
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [2, 30],
        },
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [2, 30],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [5, 255],
          isEmail: {
            msg: "Please provide a valid email.",
          },
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      vaxCardImg: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      userPhoto: DataTypes.TEXT,
      mailingList: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // userType: {
      //   allowNull: false,
      //   type: DataTypes.STRING(15),
      //   defaultValue: "user",
      //   validate: {
      //     isIn: {
      //       args: [["user", "admin", "superUser"]],
      //       msg: "User type must be either user, admin, or superUser",
      //     },
      //   },
      // },
      superUser: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Like, { foreignKey: "userId" });
    User.hasMany(models.Ticket, { foreignKey: "userId" });
  };

  User.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { id, firstName, lastName, email, mailingList, userType } = this; // context will be the User instance
    return { id, firstName, lastName, email, mailingList, userType };
  };

  User.prototype.validatePassword = function (password) {
    // debugging
    // let newPassword = bcrypt.hashSync(password);
    // console.log("------>", newPassword === this.hashedPassword.toString());
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({
    firstName,
    lastName,
    email,
    password,
    mailingList,
    userType,
  }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      hashedPassword,
      // vaxCardImg,
      // userPhoto,
      mailingList,
      userType,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};
