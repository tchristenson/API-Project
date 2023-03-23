// backend/routes/api/events.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { EventImage, Event, User, Group, Membership, GroupImage, Venue } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const group = require('../../db/models/group');


const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// GET ALL EVENTS
router.get('/', async (req, res, nexr) => {
  let eventArr = [];
  let finalObj = {};

  let events = await Event.findAll({
    attributes: {
      exclude: ['description', 'capacity', 'price', 'createdAt', 'updatedAt']
    },
    include: [
      {
        model: Group,
        attributes: ['id', 'name', 'city', 'state']
      },
      {
        model: Venue,
        attributes: ['id', 'city', 'state']
      }
    ]
  })

  for (let i = 0; i < events.length; i++) {
    currEvent = events[i]
    currEvent = currEvent.toJSON()

    const eventImages = await EventImage.findAll({
      where: {
        eventId: currEvent.id,
        preview: true
      }
    })

    if (eventImages.length) {
      let eventImage = eventImages[0].toJSON()
      currEvent.previewImage = eventImage.url

    } else {
      currEvent.previewImage = 'no preview image available'
    }

    eventArr.push(currEvent)
  }

  finalObj.Events = eventArr
  res.status(200).json(finalObj)
})




















module.exports = router;
