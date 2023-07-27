'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('temparature_label', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      min_temperature: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      max_temperature: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      label: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('temparature_label');
  }
};