'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Memberships';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 3,
        groupId: 2,
        status: 'co-host'
      },
      {
        userId: 2,
        groupId: 3,
        status: 'organizer'
      },
      {
        userId: 4,
        groupId: 2,
        status: 'pending'
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Memberships';
    await queryInterface.bulkDelete(options, {});
  }
};
