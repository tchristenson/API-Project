'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    about: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 250]
      }
    },
    type: {
      type: DataTypes.ENUM('Social', 'Food', 'Career', 'Sports', 'Fitness', 'Politics', 'Education', 'Travel')
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUppercase: true,
        isAlpha: true,
        notEmpty: true,
        len: [2,2]
      }
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
