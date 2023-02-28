'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const job = require("../data/job.json")
   job.forEach(el => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
   })
   await queryInterface.bulkInsert('Jobs', job, {}) 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Jobs', null, {}) 
  }
};
