'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Job.init({
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    fullTime: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};