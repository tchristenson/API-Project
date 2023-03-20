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
        type: 'Sports',
        private: false,
        city: 'Queens',
        state: 'NY'
      },
      {
        organizerId: 2,
        name: 'Coffee Shop Club',
        about: 'Come talk about yada yada yada',
        type: 'Food',
        private: true,
        city: 'Manhattan',
        state: 'NY'
      },
      {
        organizerId: 4,
        name: 'Millenium Party',
        about: 'Come celebrate Y2K',
        type: 'Social',
        private: true,
        city: 'Manhattan',
        state: 'NY'
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {});

  }
};
