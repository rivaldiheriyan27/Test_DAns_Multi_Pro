'use strict';
const {
  Model
} = require('sequelize');
const {encryptPassword} = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Job, { foreignKey: "UserId" });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,  
      validate: {
        notEmpty: {
          msg: "Username is required",
        },
        notNull: {
          msg: "Username is required",
        },
      },  
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password is required",
        },
        notNull: {
          msg: "password is required",
        },
        minPass(value) {
          if (value === null || this.password.length < 5) {
            throw new Error("Password must be at least 5 characters");
          }
        },
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });


  User.beforeCreate((user, options) => {
    const hash = encryptPassword(user.password, 10);
    user.password = hash;
  });
  return User;
};