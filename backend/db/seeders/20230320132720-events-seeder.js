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
        endDate: '2023-05-15 21:00:00',
        private: false
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
        endDate: '2023-04-10 21:00:00',
        private: false
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
        endDate: '2023-04-14 21:00:00',
        private: true
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
        endDate: '2023-04-15 21:00:00',
        private: true
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
        endDate: '2023-04-16 21:00:00',
        private: true
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
        endDate: '2023-04-17 21:00:00',
        private: true
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
        endDate: '2023-04-18 21:00:00',
        private: true
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
        endDate: '2023-04-19 21:00:00',
        private: true
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
        endDate: '2024-01-01 21:00:00',
        private: false
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
        endDate: '2021-5-20 21:00:00',
        private: true
      },
      {
        venueId: 1,
        groupId: 4,
        name: 'Literary Trivia Night',
        description: 'Host a fun trivia night where book club members can test their knowledge on literature and authors from different genres and time periods. Offer prizes for the top scorers and enjoy a fun evening of friendly competition and learning.',
        type: 'In Person',
        capacity: 20,
        price: 10,
        startDate: '2023-05-15 20:00:00',
        endDate: '2023-05-15 21:00:00',
        private: false
      },
      {
        venueId: 1,
        groupId: 5,
        name: 'Hiking and Picnic Day',
        description: 'Plan a group hike on a local trail and have a picnic at a scenic spot along the way. Encourage members to bring their favorite snacks and share them with the group while enjoying the beautiful views and fresh air.',
        type: 'In Person',
        capacity: 20,
        price: 10,
        startDate: '2023-05-16 20:00:00',
        endDate: '2023-05-16 21:00:00',
        private: false
      },
      {
        venueId: 1,
        groupId: 6,
        name: 'International Cooking Class"',
        description: 'Invite a local chef to lead a cooking class where members can learn how to make a new dish from a different culture. Have fun trying new flavors and techniques while expanding culinary horizons.',
        type: 'In Person',
        capacity: 20,
        price: 10,
        startDate: '2023-05-17 20:00:00',
        endDate: '2023-05-17 21:00:00',
        private: false
      },
      {
        venueId: 1,
        groupId: 7,
        name: 'Fun Run and Brunch',
        description: 'Organize a morning fun run followed by a brunch at a local restaurant. Enjoy some well-deserved food and drinks with fellow runners and celebrate a morning of fitness and community.',
        type: 'In Person',
        capacity: 20,
        price: 10,
        startDate: '2023-05-18 20:00:00',
        endDate: '2023-05-18 21:00:00',
        private: false
      },
      {
        venueId: 1,
        groupId: 8,
        name: 'Language Exchange Meetup',
        description: 'Host a language exchange meetup where members can practice speaking in different languages and learn from native speakers. Offer conversation prompts and games to make the event fun and engaging.',
        type: 'In Person',
        capacity: 20,
        price: 10,
        startDate: '2023-05-19 20:00:00',
        endDate: '2023-05-19 21:00:00',
        private: false
      },
      {
        venueId: 1,
        groupId: 9,
        name: 'Guided Meditation Retreat',
        description: 'Host a guided meditation retreat where members can practice different meditation techniques, such as mindfulness or visualization, in a peaceful and supportive environment. Offer healthy snacks and refreshments to complete the experience.',
        type: 'In Person',
        capacity: 20,
        price: 10,
        startDate: '2023-05-20 20:00:00',
        endDate: '2023-05-20 21:00:00',
        private: false
      },
      {
        venueId: 1,
        groupId: 10,
        name: 'Game Night at the Brewery',
        description: 'Organize a board game night at a local brewery or taproom. Play classic and modern games while enjoying some craft beers and snacks with fellow board game enthusiasts.',
        type: 'In Person',
        capacity: 20,
        price: 10,
        startDate: '2023-05-21 20:00:00',
        endDate: '2023-05-21 21:00:00',
        private: false
      },
      {
        venueId: 1,
        groupId: 11,
        name: 'Movie Marathon Night',
        description: 'Host a movie marathon night where members can watch classic or new films from different genres, such as comedies, dramas, or action movies. Offer snacks and drinks to create a cozy and fun movie theater experience.',
        type: 'In Person',
        capacity: 20,
        price: 10,
        startDate: '2023-05-22 20:00:00',
        endDate: '2023-05-22 21:00:00',
        private: false
      },
      {
        venueId: 1,
        groupId: 12,
        name: 'Photography Walk and Critique',
        description: 'Organize a group photography walk in a scenic location and have a critique session afterwards. Share photos and give feedback on techniques and compositions to improve skills and learn from each other.',
        type: 'In Person',
        capacity: 20,
        price: 10,
        startDate: '2023-05-23 20:00:00',
        endDate: '2023-05-23 21:00:00',
        private: false
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Events';
    await queryInterface.bulkDelete(options, {});
  }
};
