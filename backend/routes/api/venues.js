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
router.put('/:venueId', validateLogin, async (req, res, next) => {
  let editedVenue = await Venue.findOne({
    where: {
      id: req.params.venueId,
      [Op.and]: [
        {
          [Op.or]: [
            {'$Groups.organizerId$': req.user.id},
            {'$Memberships.status$': 'co-host'}
          ]
        }
      ]
    },
    include: [
      {
        model: Group,
        attributes: [],
        include: {
          model: Membership,
          attributes: []
        }
      }
    ]
  })
  console.log(editedVenue)
  res.json(editedVenue)

})




module.exports = router;
