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

const validateEventBody = [
  check('venueId')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Venue does not exist'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Name must be at least 5 characters'),
  check('type')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Type must be Online or In Person'),
  check('capacity')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Capacity must be an integer'),
  check('price')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Price is invalid'),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Description is required'),
  check('startDate')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Start date must be in the future'),
  check('endDate')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('End date is less than start date'),
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
router.put('/:eventId', requireAuth, validateEventBody, async (req, res, next) => {

    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

    let event = await Event.findByPk(req.params.eventId)

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
    console.log(isMember)
    console.log(group.organizerId)

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

      event = event.toJSON()
      delete event.createdAt
      delete event.updatedAt

      res.status(200).json(event)
    } else {
      let newErr = new Error()
      newErr.message = "Event couldn't be found"
      newErr.status = 404;

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
