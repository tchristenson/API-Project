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

const validateVenueBody = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('State is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Longitude is not valid'),
  handleValidationErrors
];

// EDIT A VENUE SPECIFIED BY ITS ID
router.put('/:venueId', requireAuth, validateVenueBody,async (req, res, next) => {

    const { address, city, state, lat, lng } = req.body

    let venue = await Venue.findOne({
      attributes: {
        exclude: ['updatedAt', 'createdAt']
      },
      where: {
        id: req.params.venueId,
      }
    })

    if (!venue) {
      let newErr = new Error()
      newErr.message = "Venue couln't be found"
      newErr.status = 404;

      next(newErr);

    }

    const group = await Group.findByPk(venue.groupId)

    const isMember = await Membership.findOne({
      where: {
        userId: req.user.id,
        status: 'co-host',
        groupId: venue.groupId
      }
    })

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
})


module.exports = router;
