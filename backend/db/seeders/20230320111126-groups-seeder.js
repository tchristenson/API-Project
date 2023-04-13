'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Groups';
    await queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: 'Yankees Fan Club',
        about: "Come cheer on the Yankees. If you're lucky you'll get to witness a no hitter, which is kind of just like watching two guys play catch for 3 hours.",
        type: 'In person',
        private: false,
        city: 'Queens',
        state: 'NY'
      },
      {
        organizerId: 2,
        name: 'Coffee Shop Club',
        about: 'Chat with you friends about yada yada yada while grabbing coffee and lunch. The coffee is very hot, but not too hot, and food options include big salads, chicken salad on rye (untoasted), a side of potato salad, and a cup of tea!',
        type: 'In person',
        private: true,
        city: 'Manhattan',
        state: 'NY'
      },
      {
        organizerId: 4,
        name: "Kramer's New Year's Eve Party",
        about: "Cosmo Kramer throws only the best New Year's Eve Parties that you won't want to miss.",
        type: 'In person',
        private: true,
        city: 'Manhattan',
        state: 'NY'
      },
        {
          organizerId: 3,
          name: 'Bookworms Unite',
          about: "A community of passionate readers who come together to delve into the worlds of literature, discuss their favorite authors and books, and explore new genres and perspectives.",
          type: 'In person',
          private: false,
          city: 'Queens',
          state: 'NY'
        },
        {
          organizerId: 2,
          name: 'Trail Blazers',
          about: 'A group of adventurous souls who love to explore the great outdoors, find new trails, and enjoy the beauty of nature while getting fit and making new friends.',
          type: 'In person',
          private: false,
          city: 'Manhattan',
          state: 'NY'
        },
        {
          organizerId: 4,
          name: "Kitchen Wizard",
          about: "A fun and interactive group that is all about exploring the world of cuisine, sharing delicious recipes and culinary tips, and experimenting with new flavors and techniques.",
          type: 'In person',
          private: false,
          city: 'Manhattan',
          state: 'NY'
        },
        {
          organizerId: 1,
          name: 'Run Wild',
          about: " A supportive community of runners who motivate each other to achieve their fitness goals, participate in local races and events, and enjoy the thrill of the open road.",
          type: 'In person',
          private: false,
          city: 'Queens',
          state: 'NY'
        },
        {
          organizerId: 3,
          name: 'Linguaphiles',
          about: 'A cultural melting pot of language learners who come together to share their passion for different languages and cultures, practice speaking with each other, and make new friends from around the world.',
          type: 'In person',
          private: false,
          city: 'Brooklyn',
          state: 'NY'
        },
        {
          organizerId: 1,
          name: "Serenity Seekers",
          about: "A tranquil community of mindfulness practitioners who gather to share peaceful moments, explore different meditation techniques, and find inner calm and balance in a busy world.",
          type: 'In person',
          private: false,
          city: 'Manhattan',
          state: 'NY'
        },
        {
          organizerId: 2,
          name: "Board Game Bonanza",
          about: "A lively and social group of board game enthusiasts who love to play a wide variety of games, from classic to modern, and who enjoy the camaraderie of friendly competition.",
          type: 'In person',
          private: false,
          city: 'Manhattan',
          state: 'NY'
        },
        {
          organizerId: 2,
          name: "Film Fanatics",
          about: "A fun and engaging group of cinephiles who explore the world of cinema, discuss the latest releases and classic films, and enjoy the magic of the big screen with like-minded movie lovers.",
          type: 'In person',
          private: false,
          city: 'The Bronx',
          state: 'NY'
        },
        {
          organizerId: 4,
          name: "Shutterbugs",
          about: "A creative and supportive community of photographers who love to capture the world through their lenses, share their knowledge and tips on photography, and discover new techniques and styles.",
          type: 'In person',
          private: false,
          city: 'Brooklyn',
          state: 'NY'
        }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Groups';
    await queryInterface.bulkDelete(options, {});
  }
};
