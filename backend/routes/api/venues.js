// backend/routes/api/venues.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Group, Membership, GroupImage, Venue } = require('../../db/models');

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

// EDIT A VENUE SPECIFIED BY ITS ID
router.put('/:venueId', requireAuth, async (req, res, next) => {
  try {
    const { address, city, state, lat, lng } = req.body

    let venue = await Venue.findOne({
      attributes: {
        exclude: ['updatedAt', 'createdAt']
      },
      where: {
        id: req.params.venueId,
      }
    })
    // console.log(venue)

    const group = await Group.findByPk(venue.groupId)
    console.log(group)

    const isMember = await Membership.findOne({
      where: {
        userId: req.user.id,
        status: 'co-host',
        groupId: venue.groupId
      }
    })

    // console.log(isMember)

    if (isMember || group.organizerId === req.user.id) {
      venue.address = address
      venue.city = city
      venue.state = state
      venue.lat = lat
      venue.lng = lng
      await venue.save()

      venue = venue.toJSON()
      delete venue.updatedAt

      res.status(200).json(venue);

    } else {
      let newErr = new Error()
      newErr.message = "Venue couln't be found"
      newErr.status = 404;

      next(newErr);
    }

  } catch(err) {
    let newErr = new Error()
    newErr.message = 'Bad Request'

    newErr.errors = {};

    newErr.status = 400;

    newErr.errors.address = 'Street address is required'
    newErr.errors.city = 'City is required'
    newErr.errors.state = "State is required"
    newErr.errors.lng = 'Latitude is not valid'
    newErr.errors.lat = 'Longitude is not valid'

    next(newErr);
  }
})


module.exports = router;
