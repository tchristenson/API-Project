// backend/routes/api/groups.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Group, Membership, GroupImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

// Get all groups
router.get('/', async (req, res, next) => {
  const groups = await Group.findAll()
  let groupsArr = [];
  let finalObj = {};

  for (let i = 0; i < groups.length; i++) {
    let currGroup = groups[i].toJSON()

    let count = await Membership.count({
      where: {
        groupId: currGroup.id
      }
    })
    currGroup.numMembers = count;

    // console.log(currGroup)
    const groupImages = await GroupImage.findAll({
      where: {
        groupId: currGroup.id
      }
    })

    let groupImage = groupImages[0].toJSON()
    currGroup.previewImage = groupImage.url

    groupsArr.push(currGroup)
  }

  finalObj.Groups = groupsArr
  res.json(finalObj)
})

// Get all groups joined or organized by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  const userId = req.user.id
})

// Create a group
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { name, about, type, private, city, state } = req.body
    const organizerId = req.user.id
    // console.log(req.user);
    // console.log(organizerId)
    // console.log(name)

    if (req.user) {
      console.log('is this hitting')
      const newGroup = await Group.create({
        organizerId: organizerId,
        name,
        about,
        type,
        private,
        city,
        state
      })
      console.log(newGroup)

      res.status(201).json(newGroup);
    }

  } catch(err) {
    let newErr = new Error()
    newErr.message = 'Bad Request'

    newErr.errors = {};

    newErr.status = 400;

    newErr.errors.name = 'Name must be 60 characters or less'
    newErr.errors.about = 'About must be 50 chracters or more'
    newErr.errors.type = "Type must be 'Online' or 'In person'"
    newErr.errors.private = 'Private must be a boolean'
    newErr.errors.city = 'City is required'
    newErr.errors.state = 'State is required'

    next(newErr);
  }
})























module.exports = router;
