'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'EventImages';
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: 'example-event-image-url-1',
        preview: true
      },
      {
        eventId: 2,
        url: 'example-event-image-url-2',
        preview: true
      },
      {
        eventId: 3,
        url: 'example-event-image-url-3',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'EventImages';
    await queryInterface.bulkDelete(options, {});
  }
};
