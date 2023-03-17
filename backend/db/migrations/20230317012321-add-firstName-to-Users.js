"use strict";

const { DataTypes } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.addColumn(options, 'firstName', {
      type: Sequelize.STRING
    }, options);
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Users';
    return queryInterface.removeColumn(options, 'firstName');
  }
};
