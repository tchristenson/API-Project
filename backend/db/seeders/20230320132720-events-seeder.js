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
        venueId: 1,
        groupId: 1,
        name: 'Yankees vs Orioles game',
        description: 'Come watch the Yankees and sit behind their own dugout, you just can\'t wear an Orioles hat',
        type: 'In Person',
        capacity: 50,
        price: 200,
        startDate: '2023-05-15 20:00:00',
        endDate: '2023-05-15 21:00:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: 'Yankees vs Dodgers game',
        description: "Come watch the Yankees and Paul O'Neill. He will try to catch a fly ball in his hat",
        type: 'In Person',
        capacity: 50,
        price: 200,
        startDate: '2023-04-10 20:00:00',
        endDate: '2023-04-10 21:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Daily Coffee Shop Meeting',
        description: 'Come discuss work, relationships, and the minutiae of daily life as a single, 30 something living in NYC',
        type: 'In Person',
        capacity: 4,
        price: 20,
        startDate: '2023-03-30 20:00:00',
        endDate: '2023-03-30 21:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Daily Coffee Shop Meeting',
        description: 'Come discuss work, relationships, and the minutiae of daily life as a single, 30 something living in NYC',
        type: 'In Person',
        capacity: 4,
        price: 20,
        startDate: '2023-04-14 20:00:00',
        endDate: '2023-04-14 21:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Daily Coffee Shop Meeting',
        description: 'Come discuss work, relationships, and the minutiae of daily life as a single, 30 something living in NYC',
        type: 'In Person',
        capacity: 4,
        price: 20,
        startDate: '2023-04-15 20:00:00',
        endDate: '2023-04-15 21:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Daily Coffee Shop Meeting',
        description: 'Come discuss work, relationships, and the minutiae of daily life as a single, 30 something living in NYC',
        type: 'In Person',
        capacity: 4,
        price: 20,
        startDate: '2023-04-16 20:00:00',
        endDate: '2023-04-16 21:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Daily Coffee Shop Meeting',
        description: 'Come discuss work, relationships, and the minutiae of daily life as a single, 30 something living in NYC',
        type: 'In Person',
        capacity: 4,
        price: 20,
        startDate: '2023-04-17 20:00:00',
        endDate: '2023-04-17 21:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Daily Coffee Shop Meeting',
        description: 'Come discuss work, relationships, and the minutiae of daily life as a single, 30 something living in NYC',
        type: 'In Person',
        capacity: 4,
        price: 20,
        startDate: '2023-04-18 20:00:00',
        endDate: '2023-04-18 21:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Daily Coffee Shop Meeting',
        description: 'Come discuss work, relationships, and the minutiae of daily life as a single, 30 something living in NYC',
        type: 'In Person',
        capacity: 4,
        price: 20,
        startDate: '2023-04-19 20:00:00',
        endDate: '2023-04-19 21:00:00'
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'New Year\'s Eve Party',
        description: 'Come ring in the new year with Cosmo Kramer. He has balloons and cubed ice.',
        type: 'In Person',
        capacity: 20,
        price: 0,
        startDate: '2023-12-31 20:00:00',
        endDate: '2024-01-01 21:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Festivus for the Rest of Us',
        description: 'Gather around the aluminum pole and take part in the feats of strength',
        type: 'In Person',
        capacity: 30,
        price: 0,
        startDate: '2022-12-23 20:00:00',
        endDate: '2022-12-23 21:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Lunch at Reggies',
        description: "Instead of Tom's Restaurant, the group will try Reggie's for coffee and lunch. Expectations are limited.",
        type: 'In Person',
        capacity: 4,
        price: 20,
        startDate: '2021-5-20 20:00:00',
        endDate: '2021-5-20 21:00:00'
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Events';
    await queryInterface.bulkDelete(options, {});
  }
};
