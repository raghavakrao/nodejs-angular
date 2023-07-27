'use strict';
const {hashPassword} = require('../../lib/utilities')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        "name":"Rajan Raj",
        "username": "rajan",
        "email":"test@gmail.com",
        "Password": await hashPassword("testuser"),
        "created_at": new Date()
      },
      {
        "name":"Rajan",
        "username": "raj",
        "email":"test2@gmail.com",
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
