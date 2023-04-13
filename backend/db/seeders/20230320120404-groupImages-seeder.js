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
        url: 'https://d136swi17h0tnq.cloudfront.net/Upload/2017-05/8d0a71c2-9daa-4298-b6fe-e84a9a89dc44_lrg.jpg',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://nationaltoday.com/wp-content/uploads/2021/12/National-Gourmet-Coffee-Day-300x300.jpg',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://nationaltoday.com/wp-content/uploads/2020/12/New-Years-Eve-1-1-300x300.jpg',
        preview: true
      },
      // {
      //   groupId: 4,
      //   url: 'https://bostonbioedit.com/wp-content/uploads/2018/01/pile-of-books-open_books-300x300.jpg',
      //   preview: true
      // },
      // {
      //   groupId: 5,
      //   url: 'https://res.cloudinary.com/simpleview/image/upload/v1623428221/clients/steamboat/Hiking_NWETZEL_Lifetime_MKTG_WEB_ONLY_d9e2053a-6490-4b42-8208-c0b89a10d228.jpg',
      //   preview: true
      // },
      // {
      //   groupId: 6,
      //   url: 'https://stanfordinn.com/wp-content/uploads/2019/09/mendocino-resort-hotel-cooking-classes-1-300x300.jpg',
      //   preview: true
      // },
      // {
      //   groupId: 7,
      //   url: 'https://m.media-amazon.com/images/S/aplus-media/vc/633ad629-db9b-4b56-b0fa-29507335b673.__CR0,0,300,300_PT0_SX300_V1___.jpg',
      //   preview: true
      // },
      // {
      //   groupId: 8,
      //   url: 'https://nationaltoday.com/wp-content/uploads/2022/06/International-Mother-Language-Day-300x300.jpg',
      //   preview: true
      // },
      // {
      //   groupId: 9,
      //   url: 'https://images.squarespace-cdn.com/content/v1/5653860ce4b0a1d6c2d24e2a/1533396475663-6CK82AXMSISCYPFSHE0K/dtree-Meditation-bundle.jpg',
      //   preview: true
      // },
      // {
      //   groupId: 10,
      //   url: 'https://continuinged.isl.in.gov/wp-content/uploads/2021/10/Gameschooling-300x300.png',
      //   preview: true
      // },
      // {
      //   groupId: 11,
      //   url: 'https://commercial-acoustics.com/wp-content/uploads/2017/01/theater-resize-300x300.jpg',
      //   preview: true
      // },
      // {
      //   groupId: 12,
      //   url: 'https://nationaltoday.com/wp-content/uploads/2022/06/National-Photography-Day-300x300.jpg',
      //   preview: true
      // }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'GroupImages';
    await queryInterface.bulkDelete(options, {});
  }
};
