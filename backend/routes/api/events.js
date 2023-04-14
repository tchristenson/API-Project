// backend/routes/api/events.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Attendance, EventImage, Event, User, Group, Membership, GroupImage, Venue } = require('../../db/models');

const { check } = require('express-validator');
const { query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const group = require('../../db/models/group');
const { start } = require('repl');
const { validationResult } = require('express-validator');


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

const queryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1})
    .withMessage('Page must be greater than or equal to 1'),
  query('size')
    .optional()
    .isInt({ min: 1})
    .withMessage('Size must be greater than or equal to 1'),
  query('name')
    .optional()
    .custom(value => {
      if (isInteger(value)) {
        throw new Error('Name must be a string')
      }
      return true
    })
    .withMessage('Name must be a string'),
  query('type')
    .optional()
    .isIn(['Online', 'In Person', 'In person'])
    .withMessage("Type must be 'Online' or 'In Person'"),
  query('startDate')
    .optional()
    .custom(value => {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        throw new Error('Start date must be a valid datetime')
      }
      return true
    })
    .withMessage('Start date must be a valid datetime'),
  handleValidationErrors
];

// GET ALL EVENTS
router.get('/', queryValidator, async (req, res, next) => {

  let eventArr = [];
  let finalObj = {};

  let { page, size, name, type, startDate } = req.query;

  page = parseInt(page)
  size = parseInt(size)

  if (Number.isNaN(page) || page < 1) page = 1;
  if (page > 10) page = 10;
  if (Number.isNaN(size) || size < 1) size = 20;
  if (size > 20) size = 20;

  const offset = size * (page - 1)
  let pagination = {};

  pagination.limit = size
  pagination.offset = offset

  let where = {};

  if (name && name !== '' && typeof(name) === 'string') {
    where.name = name
  }

  if (type && type !== '') {
    where.type = type
  }

  if (startDate && startDate !== '') {
    where.startDate = startDate
  }

  let events = await Event.findAll({
    where,
    attributes: {
      exclude: ['capacity', 'createdAt', 'updatedAt']
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
    ],
    limit: pagination.limit,
    offset: pagination.offset
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
  finalObj.Page = page
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
        attributes: ['id', 'name', 'private', 'city', 'state'],
        include: [
          {
            model: User
          },
          {
            model: GroupImage
          }
        ]
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

  if (!event) {
    let newErr = new Error()
    newErr.message = "Event couldn't be found"
    newErr.status = 404;

    next(newErr);
  }

  event = event.toJSON()
  // console.log(event);
  let decimalPrice = parseFloat(event.price)
  event.price = decimalPrice

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
    const isCoHost = await Membership.findOne({
      where: {
        userId: req.user.id,
        status: 'co-host',
        groupId: event.groupId
      }
    })

    if (isCoHost || group.organizerId === req.user.id) {
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
      newErr.message = "Forbidden"
      newErr.status = 403;

      next(newErr);
    }
})


// DELETE AN EVENT SPECIFIED BY ITS ID
router.delete('/:eventId', requireAuth, async (req, res, next) => {

  let event = await Event.findByPk(req.params.eventId)

  if (!event) {
    let newErr = new Error()
    newErr.message = "Event couldn't be found"
    newErr.status = 404;

    next(newErr);
  }

  const group = await Group.findByPk(event.groupId)
  const isCoHost = await Membership.findOne({
    where: {
      userId: req.user.id,
      status: 'co-host',
      groupId: event.groupId
    }
  })
  // console.log(isCoHost)

  if (isCoHost || group.organizerId === req.user.id) {
    await event.destroy()
    res.status(200).json({ message: 'Successfully deleted'})
  } else {
    let newErr = new Error()
    newErr.message = "Forbidden"
    newErr.status = 403;

    next(newErr);
  }
})


// ADD AN IMAGE TO AN EVENT BASED ON THE EVENT'S ID
router.post('/:eventId/images', requireAuth, async (req, res, next) => {

  const { url, preview } = req.body

  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    let newErr = new Error()
    newErr.message = "Event couldn't be found"
    newErr.status = 404;

    next(newErr);
  }

  const isAttendee = await Attendance.findOne({
    where: {
      eventId: req.params.eventId,
      userId: req.user.id,
      status: 'attending'
    }
  })

  if (isAttendee) {
    let newImg = await EventImage.create({
      eventId: req.params.eventId,
      url: url,
      preview: preview
    })
    // console.log(newImg)

    newImg = newImg.toJSON()
    delete newImg.createdAt
    delete newImg.updatedAt
    delete newImg.eventId
    delete newImg.userId

    res.status(200).json(newImg);
  }
  else {
    let newErr = new Error()
    newErr.message = "Forbidden"
    newErr.status = 403;

    next(newErr);
  }
})


// GET ALL ATTENDEES OF AN EVENT SPECIFIED BY ITS ID
router.get('/:eventId/attendees', async (req, res, next) => {

  let finalObj = {};
  let memberArr = [];

  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    let newErr = new Error()
    newErr.message = "Event couldn't be found"
    newErr.status = 404;

    next(newErr);
  }
  const group = await Group.findByPk(event.groupId)

  const isCoHostorOrganizer = await Membership.findOne({
    where: {
      userId: req.user.id,
      [Op.or]: [
        {
          status: 'co-host'
        },
        {
          status: 'organizer'
        }
      ],
      groupId: event.groupId
    }
  })

  if (isCoHostorOrganizer || group.organizerId === req.user.id) {

    let attendees = await User.findAll({
      attributes: ['id', 'firstName', 'lastName'],
      include: {
        model: Attendance,
        attributes: ['status'],
        where: {
          eventId: req.params.eventId
        }
      }
    })

    for (let i = 0; i < attendees.length; i++) {
      let currAttend = attendees[i]
      currAttend = currAttend.toJSON()
      currAttend.Attendance = currAttend.Attendances[0]
      delete currAttend.Attendances
      memberArr.push(currAttend)
    }

    finalObj.Attendees = memberArr
    res.status(200).json(finalObj)

    // If you are not the organizer or co-host, but the event still exists
  }
  else if (event) {

      let attendees = await User.findAll({
        attributes: ['id', 'firstName', 'lastName'],
        include: {
          model: Attendance,
          attributes: ['status'],
          where: {
            eventId: req.params.eventId,
            [Op.or]: [
              {
                status: 'attending'
              },
              {
                status: 'waitlist'
              }
            ]
          }
        }
      })
      for (let i = 0; i < attendees.length; i++) {
        let currAttend = attendees[i]
        currAttend = currAttend.toJSON()
        currAttend.Attendance = currAttend.Attendances[0]
        delete currAttend.Attendances
        memberArr.push(currAttend)
      }

      finalObj.Attendees = memberArr
      res.status(200).json(finalObj)
    }
})


// REQUEST TO ATTEND AN EVENT BASED ON THE EVENT'S ID
router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {

  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    let newErr = new Error()
    newErr.message = "Event couldn't be found"
    newErr.status = 404;

    next(newErr);
  }

  const isMember = await Membership.findOne({
    where: {
      userId: req.user.id,
      groupId: event.groupId,
      [Op.or]: [
        {
          status: 'member'
        },
        {
          status: 'co-host'
        },
        {
          status: 'organizer'
        }
      ]
    }
  })

  if (isMember) {
    const attendance = await Attendance.findOne({
      where: {
        eventId: req.params.eventId,
        userId: req.user.id
      }
    })

    if (!attendance) {
      let newAttendance = await Attendance.create({
        eventId: req.params.eventId,
        userId: req.user.id,
        status: 'pending'
      })

      newAttendance = newAttendance.toJSON()
      delete newAttendance.updatedAt
      delete newAttendance.createdAt
      delete newAttendance.eventId
      delete newAttendance.id

      res.status(200).json(newAttendance);
    }

    if (attendance.status === 'pending' || attendance.status === 'waitlist') {
      let newErr = new Error()
      newErr.message = "Attendance has already been requested"
      newErr.status = 400;

      next(newErr);
    }

    if (attendance.status === 'attending') {
      let newErr = new Error()
      newErr.message = "User is already an attendee of the event"
      newErr.status = 400;

      next(newErr);
    }

  } else {
    let newErr = new Error()
    newErr.message = "Forbidden"
    newErr.status = 403;

    next(newErr);
  }
})


// CHANGE THE STATUS OF AN ATTENDANCE FOR AN EVENT SPECIFIED BY ITS ID
router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {

  const { userId, status } = req.body

  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    let newErr = new Error()
    newErr.message = "Event couldn't be found"
    newErr.status = 404;

    next(newErr);
  }
  const group = await Group.findByPk(event.groupId)

  if (status === 'pending') {
    let newErr = new Error()
    newErr.message = "Cannot change an attendance status to pending"
    newErr.status = 400;

    next(newErr);
  }

  let attendance = await Attendance.findOne({
    where: {
      eventId: req.params.eventId,
      userId: userId
    }
  })

  if (!attendance) {
    let newErr = new Error()
    newErr.message = "Attendance between the user and the event does not exist"
    newErr.status = 404;

    next(newErr);
  }

  const isCoHostorOrganizer = await Membership.findOne({
    where: {
      userId: req.user.id,
      [Op.or]: [
        {
          status: 'co-host'
        },
        {
          status: 'organizer'
        }
      ],
      groupId: event.groupId
    }
  })

  if (isCoHostorOrganizer || group.organizerId === req.user.id) {
    attendance.status = 'attending'
    await attendance.save()

    attendance = attendance.toJSON()
    delete attendance.updatedAt
    delete attendance.createdAt

    res.status(200).json(attendance);

  } else {
    let newErr = new Error()
    newErr.message = "Forbidden"
    newErr.status = 403;

    next(newErr);
  }
})


// DELETE ATTENDANCE TO AN EVENT SPECIFIED BY ITS ID
router.delete('/:eventId/attendance', requireAuth, async (req, res, next) => {

  const {userId} = req.body

  const user = await User.findByPk(userId)

  if (!user) {
    let newErr = new Error()
    newErr.message = "User couldn't be found"
    newErr.status = 400;

    next(newErr);
  }

  const event = await Event.findByPk(req.params.eventId);

  if (!event) {
    let newErr = new Error()
    newErr.message = "Event couldn't be found"
    newErr.status = 404;

    next(newErr);
  }
  const group = await Group.findByPk(event.groupId)

  let attendance = await Attendance.findOne({
    where: {
      eventId: req.params.eventId,
      userId: userId
    }
  })

  if (!attendance) {
    let newErr = new Error()
    newErr.message = "Attendance does not exist for this User"
    newErr.status = 404;

    next(newErr);
  }

  if (userId === req.user.id || group.organizerId === req.user.id) {
    await attendance.destroy()
    res.status(200).json({ message: 'Successfully deleted attendance from event'})
  } else {
    let newErr = new Error()
    newErr.message = "Only the User or organizer may delete an Attendance"
    newErr.status = 403;

    next(newErr);
  }
})





module.exports = router
