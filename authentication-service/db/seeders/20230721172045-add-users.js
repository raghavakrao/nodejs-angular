'use strict';
const {hashPassword} = require('../../lib/utilities')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        "name":"Rajan Raj",
        "username": "rajan",
        "email":"rajanonly98@gmail.com",
        "Password": await hashPassword("test"),
        "created_at": new Date()
      },
      {
        "name":"Raj",
        "username": "raj",
        "email":"rajanonly98test@gmail.com",
        "Password": await hashPassword("testpassword"),
        "created_at": new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('users', {})
  }
};
