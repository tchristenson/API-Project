'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(
        models.EventImage,
        {
          foreignKey: 'eventId', onDelete: 'cascade', hooks: true
        }
      )
      Event.hasMany(
        models.Attendance,
        {
          foreignKey: 'eventId', onDelete: 'cascade', hooks: true
        }
      )
      Event.belongsTo(
        models.Venue,
        {
          foreignKey: 'venueId'
        }
      )
      Event.belongsTo(
        models.Group,
        {
          foreignKey: 'groupId'
        }
      )
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER
    },
    groupId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 250]
      }
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('Online', 'In Person', 'In person')
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 25000
      }
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      validate: {
        min: 0,
        max: 1000000
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: '2023-03-20'
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
