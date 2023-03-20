'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'GroupImages';
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: 'example-url-1.com',
        preview: true
      },
      {
        groupId: 2,
        url: 'example-url-2.com',
        preview: true
      },
      {
        groupId: 3,
        url: 'example-url-3.com',
        preview: false
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'GroupImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {});
  }
};
