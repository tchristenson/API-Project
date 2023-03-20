'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Events';
    await queryInterface.bulkInsert(options, [
      {
        venueId: 2,
        groupId: 2,
        name: 'Daily Coffee Shop Meeting',
        description: 'Come discuss work, relationships, and the minutiae of daily life as a single, 30 something living in NYC',
        type: 'Food',
        capacity: 4,
        price: 20,
        startDate: '2023-03-30',
        endDate: '2023-03-30'
      },
      {
        venueId: 1,
        groupId: 1,
        name: 'Yankees vs Orioles game',
        description: 'Come watch the Yankees and sit behind their own dugout, you just can\'t wear an Orioles hat',
        type: 'Sports',
        capacity: 50,
        price: 200,
        startDate: '2023-05-15',
        endDate: '2023-05-15'
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'New Year\'s Eve Party',
        description: 'Come ring in the new year with Cosmo Kramer. He has balloons and cubed ice.',
        type: 'Social',
        capacity: 20,
        price: 0,
        startDate: '2023-12-31',
        endDate: '2024-01-01'
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Events';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
