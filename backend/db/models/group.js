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
      Group.hasMany(
        models.Event,
        {
          foreignKey: 'groupId', onDelete: 'cascade', hooks: true
        }
      )
      Group.hasMany(
        models.Venue,
        {
          foreignKey: 'groupId', onDelete: 'cascade', hooks: true
        }
      )
      Group.hasMany(
        models.GroupImage,
        {
          foreignKey: 'groupId', onDelete: 'cascade', hooks: true
        }
      )
      Group.hasMany(
        models.Membership,
        {
          foreignKey: 'groupId', onDelete: 'cascade', hooks: true
        }
      )
      Group.belongsTo(
        models.User,
        {
          foreignKey: 'organizerId'
        }
      )
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 60]
      }
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [50, 250]
      }
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('In person', 'Online')
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
