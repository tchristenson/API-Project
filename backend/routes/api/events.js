// backend/routes/api/events.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Attendance, EventImage, Event, User, Group, Membership, GroupImage, Venue } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const group = require('../../db/models/group');
const { start } = require('repl');


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

    const numAttending = await Attendance.count({
      where: {
        eventId: currEvent.id,
        status: 'attending'
      }
    })
    currEvent.numAttending = numAttending

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


// GET DETAILS OF AN EVENT SPECIFIED BY ITS ID
router.get('/:eventId', async (req, res, next) => {

  let event = await Event.findOne({
    where: {
      id: req.params.eventId
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [
      {
        model: Group,
        attributes: ['id', 'name', 'private', 'city', 'state']
      },
      {
        model: Venue,
        attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']
      },
      {
        model: EventImage,
        attributes: ['id', 'url', 'preview']
      }
    ]
  })

  event = event.toJSON()

  const numAttending = await Attendance.count({
    where: {
      eventId: req.params.eventId,
      status: 'attending'
    }
  })
  event.numAttending = numAttending

  res.status(200).json(event)
})


// EDIT AN EVENT SPECIFIED BY ITS ID
router.put('/:eventId', requireAuth, async (req, res, next) => {

  try {
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

    let event = await Event.findByPk(req.params.eventId, {
      // attributes: ['venueId', 'name', 'type', 'capacity', 'price', 'description', 'startDate', 'endDate']
    })
    if (!event) {
      let newErr = new Error()
      newErr.message = "Event couldn't be found"
      newErr.status = 404;

      next(newErr);
    }

    let venue = await Venue.findByPk(venueId)
    if (!venue) {
      let newErr = new Error()
      newErr.message = "Venue couldn't be found"
      newErr.status = 404;

      next(newErr);
    }

    const group = await Group.findByPk(event.groupId)
    const isMember = await Membership.findOne({
      where: {
        userId: req.user.id,
        status: 'co-host',
        groupId: event.groupId
      }
    })

    if (isMember || group.organizerId === req.user.id) {
      event.venueId = venueId,
      event.name = name,
      event.type = type,
      event.capacity = capacity,
      event.price = price,
      event.description = description,
      event.startDate = startDate,
      event.endDate = endDate
      await event.save()

      res.json(event)
    }

  } catch(err) {
    let newErr = new Error()
    newErr.message = 'Bad Request'
    newErr.errors = {};
    newErr.status = 400;

    newErr.errors.venueId = 'Venue does not exist'
    newErr.errors.name = 'Name must be at least 5 characters'
    newErr.errors.type = "Type must be Online or In person"
    newErr.errors.capacity = 'Capacity must be an integer'
    newErr.errors.price = 'Price is invalid'
    newErr.errors.description = 'Description is required'
    newErr.errors.startDate = 'Start date must be in the future'
    newErr.errors.endDate = 'End date is less than start date'

    next(newErr);
  }
})


// DELETE AN EVENT SPECIFIED BY ITS ID
router.delete('/:eventId', requireAuth, async (req, res, next) => {

  let event = await Event.findByPk(req.params.eventId)

  const group = await Group.findByPk(event.groupId)
  const isMember = await Membership.findOne({
    where: {
      userId: req.user.id,
      status: 'co-host',
      groupId: event.groupId
    }
  })

  if (isMember || group.organizerId === req.user.id) {
    await event.destroy()
    res.status(200).json({ message: 'Successfully deleted'})

  } else {
      let newErr = new Error()
      newErr.message = "Event couldn't be found"
      newErr.status = 404;

      next(newErr);
  }
})


// ADD AN IMAGE TO AN EVENT BASED ON THE EVENT'S ID
router.post('/:eventId/images', requireAuth, async (req, res, next) => {

})



















module.exports = router;
