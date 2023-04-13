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
        url: 'https://www.docsports.com/images/lib/large/mlb-picks-gary-sanchez-new-york-yankees-predictions-best-bet-odds-2.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://www.docsports.com/images/lib/large/aroldis-chapman.jpg',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://www.treadstonemortgage.com/wp-content/uploads/2017/12/Rowster2-300x300.jpg',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://www.rhubarbarians.com/wp-content/uploads/2015/03/colombian-coffee-recipe-featured-300x300.jpg',
        preview: true
      },
      {
        eventId: 5,
        url: 'https://nationaltoday.com/wp-content/uploads/2019/09/national-starbucks-day-300x300.jpg',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://i.pinimg.com/600x315/17/a9/4d/17a94db90d931bf2cf42a60739bee926.jpg',
        preview: true
      },
      {
        eventId: 7,
        url: 'https://sp-ao.shortpixel.ai/client/q_lossy,ret_img,w_300,h_300/https://www.coffeesheikh.com/wp-content/uploads/2019/09/karl-fredrickson-TYIzeCiZ_60-unsplash-300x300.jpg',
        preview: true
      },
      {
        eventId: 8,
        url: 'https://coffeeshopstartups.com/wp-content/uploads/2021/05/coffee-shop-startups-serving-a-lattee-300x300.jpg',
        preview: true
      },
      {
        eventId: 9,
        url: 'https://www.artsandvenuesdenver.com/assets/img/Resolution-New-Years-Eve-2021-d2c62a7c05.jpg',
        preview: true
      },
      {
        eventId: 10,
        url: 'https://destinationmansfield.com/wp-content/uploads/2022/02/Coney-Island-Diner-300x300.jpg',
        preview: true
      },
      {
        eventId: 11,
        url: 'https://stillfirebrewing.com/wp-content/uploads/2020/05/TriviaNight-300x300.jpg',
        preview: true
      },
      {
        eventId: 12,
        url: 'https://www.mauiticketsforless.com/wp-content/uploads/2016/03/Hike-Maui-Hana-Waterfall-Hike-11-Hours-7-300x300.jpg',
        preview: true
      },
      {
        eventId: 13,
        url: 'https://s3.amazonaws.com/winecountry-media/wp-content/uploads/sites/4/2021/03/12140632/Cakebread-PastaClass-300x300-1.jpg',
        preview: true
      },
      {
        eventId: 14,
        url: 'https://dukeofyorksquare.com/wp-content/uploads/2021/04/run-Club.jpg',
        preview: true
      },
      {
        eventId: 15,
        url: 'https://www.concierge99.com/uploads/2/4/6/0/24609118/hello-talk-product-300-x-300px_orig.png',
        preview: true
      },
      {
        eventId: 16,
        url: 'https://explore.globalhealing.com/wp-content/uploads/2020/07/what-is-meditation-thumb.jpg',
        preview: true
      },
      {
        eventId: 17,
        url: 'https://www.themeadowssarasota.org/wp-content/uploads/2022/06/Donuts-for-2-300x300.jpg',
        preview: true
      },
      {
        eventId: 18,
        url: 'https://myorthodontists.info/wp-content/uploads/2020/03/MOVIE-TIME-300x300.png',
        preview: true
      },
      {
        eventId: 19,
        url: 'https://www.invaluable.com/blog/wp-content/uploads/sites/77/2019/06/hero-5-300x300.jpg',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'EventImages';
    await queryInterface.bulkDelete(options, {});
  }
};
