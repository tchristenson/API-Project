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
        url: 'example-group-image-url-1',
        preview: true
      },
      {
        groupId: 2,
        url: 'example-group-image-url-2',
        preview: true
      },
      {
        groupId: 3,
        url: 'example-group-image-url-3',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'GroupImages';
    await queryInterface.bulkDelete(options, {});
  }
};
