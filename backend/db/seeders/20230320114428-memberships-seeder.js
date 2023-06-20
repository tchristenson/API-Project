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
        status: 'organizer'
      },
      {
        userId: 1,
        groupId: 2,
        status: 'member'
      },
      {
        userId: 2,
        groupId: 2,
        status: 'organizer'
      },
      {
        userId: 2,
        groupId: 1,
        status: 'co-host'
      },
      {
        userId: 2,
        groupId: 3,
        status: 'pending'
      },
      {
        userId: 3,
        groupId: 2,
        status: 'co-host'
      },
      {
        userId: 3,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 4,
        groupId: 2,
        status: 'pending'
      },
      {
        userId: 4,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 4,
        groupId: 3,
        status: 'organizer'
      },
      {
        userId: 3,
        groupId: 4,
        status: 'organizer'
      },
      {
        userId: 2,
        groupId: 5,
        status: 'organizer'
      },
      {
        userId: 4,
        groupId: 6,
        status: 'organizer'
      },
      {
        userId: 1,
        groupId: 7,
        status: 'organizer'
      },
      {
        userId: 3,
        groupId: 8,
        status: 'organizer'
      },
      {
        userId: 1,
        groupId: 9,
        status: 'organizer'
      },
      {
        userId: 2,
        groupId: 10,
        status: 'organizer'
      },
      {
        userId: 2,
        groupId: 11,
        status: 'organizer'
      },
      {
        userId: 4,
        groupId: 12,
        status: 'organizer'
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Memberships';
    await queryInterface.bulkDelete(options, {});
  }
};
