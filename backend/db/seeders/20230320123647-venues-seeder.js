'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Venues';
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        address: '1 E 161 St',
        city: 'The Bronx',
        state: 'NY',
        lat: 40.8296,
        lng: 73.9262
      },
      {
        groupId: 2,
        address: '2880 Broadway',
        city: 'Manhattan',
        state: 'NY',
        lat: 40.8055,
        lng: 73.9654
      },
      {
        groupId: 3,
        address: '129 W 81 St',
        city: 'Manhattan',
        state: 'NY',
        lat: 40.7985,
        lng: 73.7002
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Venues';
    await queryInterface.bulkDelete(options, {});
  }
};
