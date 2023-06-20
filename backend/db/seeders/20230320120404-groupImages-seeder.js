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
        url: 'https://i.imgur.com/Pl1oUUJ.jpg',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://i.imgur.com/D1AWE1k.jpg',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://i.imgur.com/yYUxxBi.jpg',
        preview: true
      },
      {
        groupId: 4,
        url: 'https://i.imgur.com/5UJWx6v.jpg',
        preview: true
      },
      {
        groupId: 5,
        url: 'https://i.imgur.com/t07lC8q.jpg',
        preview: true
      },
      {
        groupId: 6,
        url: 'https://i.imgur.com/Aq7CXmn.jpg',
        preview: true
      },
      {
        groupId: 7,
        url: 'https://i.imgur.com/AB0nGq2.jpg',
        preview: true
      },
      {
        groupId: 8,
        url: 'https://i.imgur.com/apcbyop.jpg',
        preview: true
      },
      {
        groupId: 9,
        url: 'https://i.imgur.com/YlKEAy2.jpg',
        preview: true
      },
      {
        groupId: 10,
        url: 'https://i.imgur.com/T48J60g.png',
        preview: true
      },
      {
        groupId: 11,
        url: 'https://i.imgur.com/Bp74wQJ.jpg',
        preview: true
      },
      {
        groupId: 12,
        url: 'https://i.imgur.com/INrdGmF.jpg',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'GroupImages';
    await queryInterface.bulkDelete(options, {});
  }
};
