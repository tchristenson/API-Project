'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Groups';
    await queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: 'Yankees Fan Club',
        about: 'Come cheer on the Yankees',
        type: 'In person',
        private: false,
        city: 'Queens',
        state: 'NY'
      },
      {
        organizerId: 2,
        name: 'Coffee Shop Club',
        about: 'Come talk about yada yada yada',
        type: 'In person',
        private: true,
        city: 'Manhattan',
        state: 'NY'
      },
      {
        organizerId: 4,
        name: "Kramer's New Year's Eve Party",
        about: 'Come celebrate Y2K',
        type: 'In person',
        private: true,
        city: 'Manhattan',
        state: 'NY'
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Groups';
    await queryInterface.bulkDelete(options, {});
  }
};
