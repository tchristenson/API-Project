'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'George',
        lastName: 'Costanza',
        username: 'Art-Vandelay',
        hashedPassword: bcrypt.hashSync('password1'),
        email: 'george@summerofgeorge.com'
      },
      {
        firstName: 'Jerry',
        lastName: 'Seinfeld',
        username: 'jseinfeld',
        hashedPassword: bcrypt.hashSync('password2'),
        email: 'jerry@seinfeld.com'
      },
      {
        firstName: 'Elaine',
        lastName: 'Benes',
        username: 'ebenes',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'elaine@benes.com'
      },
      {
        firstName: 'Cosmo',
        lastName: 'Kramer',
        username: 'Dr-Van-Nostrand',
        hashedPassword: bcrypt.hashSync('password4'),
        email: 'kramer@kramericaindustries.com'
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'demouser@email.com'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {});
  }
};
