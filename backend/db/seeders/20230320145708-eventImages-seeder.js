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
        url: 'https://i.imgur.com/AT8Tbqy.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://i.imgur.com/wPSt5rL.jpg',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://i.imgur.com/zdr9QaE.jpg',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://i.imgur.com/0G9Nyx6.jpg',
        preview: true
      },
      {
        eventId: 5,
        url: 'https://i.imgur.com/KOisdf0.jpg',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://i.imgur.com/EfXNzVe.jpg',
        preview: true
      },
      {
        eventId: 7,
        url: 'https://i.imgur.com/nuf7UFH.jpg',
        preview: true
      },
      {
        eventId: 8,
        url: 'https://i.imgur.com/b6jL7Mu.jpg',
        preview: true
      },
      {
        eventId: 9,
        url: 'https://i.imgur.com/MTAPsZP.jpg',
        preview: true
      },
      {
        eventId: 10,
        url: 'https://i.imgur.com/W5TFl39.jpg',
        preview: true
      },
      {
        eventId: 11,
        url: 'https://i.imgur.com/Kss7sxQ.jpg',
        preview: true
      },
      {
        eventId: 12,
        url: 'https://i.imgur.com/u2QMlwR.jpg',
        preview: true
      },
      {
        eventId: 13,
        url: 'https://i.imgur.com/L7CGsdj.jpg',
        preview: true
      },
      {
        eventId: 14,
        url: 'https://i.imgur.com/Xkft0Hr.jpg',
        preview: true
      },
      {
        eventId: 15,
        url: 'https://i.imgur.com/weFkmTl.png',
        preview: true
      },
      {
        eventId: 16,
        url: 'https://i.imgur.com/TwDnv7Y.jpg',
        preview: true
      },
      {
        eventId: 17,
        url: 'https://i.imgur.com/J0DqGP5.jpg',
        preview: true
      },
      {
        eventId: 18,
        url: 'https://i.imgur.com/4M51cYm.png',
        preview: true
      },
      {
        eventId: 19,
        url: 'https://i.imgur.com/TBIeiXL.jpg',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'EventImages';
    await queryInterface.bulkDelete(options, {});
  }
};
