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
        status: 'Active'
      },
      {
        userId: 3,
        groupId: 2,
        status: 'Active'
      },
      {
        userId: 2,
        groupId: 3,
        status: 'Inactive'
      },
      {
        userId: 4,
        groupId: 2,
        status: 'Active'
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Memberships';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {});
  }
};
