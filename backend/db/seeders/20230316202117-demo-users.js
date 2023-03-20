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
        hashedPassword: bcrypt.hashSync('bosco'),
        email: 'george@summerofgeorge.com'
      },
      {
        firstName: 'Jerry',
        lastName: 'Seinfeld',
        username: 'jseinfeld',
        hashedPassword: bcrypt.hashSync('jor-el'),
        email: 'jerry@seinfeld.com'
      },
      {
        firstName: 'Elaine',
        lastName: 'Benes',
        username: 'ebenes',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'elaine@benes.com'
      },
      {
        firstName: 'Cosmo',
        lastName: 'Kramer',
        username: 'Dr-Van-Nostrand',
        hashedPassword: bcrypt.hashSync('password2'),
        email: 'kramer@kramericaindustries.com'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Art-Vandelay', 'jseinfeld', 'ebenes', 'Dr-Van-Nostrand'] }
    }, {});
  }
};
