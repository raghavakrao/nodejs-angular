'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('temparature_label', [
      {
        "min_temperature": -20,
        "max_temperature": 0,
        "label":"Very Cold"
      },
      {
        "min_temperature": 0,
        "max_temperature": 15,
        "label":"Cold"
      },
      {
        "min_temperature": 0,
        "max_temperature": 15,
        "label":"Cold"
      },
      {
        "min_temperature": 15,
        "max_temperature": 25,
        "label":"Moderate"
      },
      {
        "min_temperature": 25,
        "max_temperature": 40,
        "label":"Hot"
      },
      {
        "min_temperature": 40,
        "max_temperature": 100,
        "label":"Very Hot"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('temparature_label', {})
  }
};
