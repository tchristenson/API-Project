// backend/routes/api/groups.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Attendance, EventImage, Event, User, Group, Membership, GroupImage, Venue } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const group = require('../../db/models/group');


const router = express.Router();

const validateGroupBody = [
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ max: 60 })
    .withMessage('Name must be 60 characters or less'),
  check('about')
    .exists({ checkFalsy: true })
    .isLength({ min: 50 })
    .withMessage('About must be 50 characters or more'),
  check('type')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Type must be Online or In Person'),
  check('private')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Private must be a boolean'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('State is required'),
  handleValidationErrors
];

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


// GET ALL GROUPS
// Get all groups and get all groups joined or organized by the Current User are very similar,
// Consider putting mechanics into a single function if there is time later
router.get('/', async (req, res, next) => {
  const groups = await Group.findAll()
  let groupsArr = [];
  let finalObj = {};

  for (let i = 0; i < groups.length; i++) {
    let currGroup = groups[i].toJSON()

    let count = await Membership.count({
      where: {
        groupId: currGroup.id,
        status: {
          [Op.not]: 'pending'
        }
      }
    })
    currGroup.numMembers = count;

    // console.log(currGroup)
    const groupImages = await GroupImage.findAll({
      where: {
        groupId: currGroup.id,
        preview: true
      }
    })
    // console.log(groupImages)
    if (groupImages.length) {
      let groupImage = groupImages[0].toJSON()
      // console.log(groupImage)

        currGroup.previewImage = groupImage.url

    } else {
      currGroup.previewImage = 'no preview image available'
    }

    groupsArr.push(currGroup)
  }

  finalObj.Groups = groupsArr
  res.status(200).json(finalObj)
})


// GET ALL GROUPS JOINED OR ORGANIZED BY THE CURRENT USER
router.get('/current', requireAuth, async (req, res, next) => {
  const userId = req.user.id
  const organizedGroups = await Group.findAll({
    where: {
      [Op.or]: [
        {organizerId: userId},
        {'$Memberships.userId$': userId,'$Memberships.status$': {[Op.not]: 'pending'} }
      ]
    },
    include: [
      {
        model: Membership,
        attributes: [],
        include: [
          {
            model: User,
            attributes: []
          }
        ]
      }
    ]

  })

  let groupsArr = [];
  let finalObj = {};

  for (let i = 0; i < organizedGroups.length; i++) {
    let currGroup = organizedGroups[i].toJSON()

    let count = await Membership.count({
      where: {
        groupId: currGroup.id,
        status: {
          [Op.not]: 'pending'
        }
      }
    })
    currGroup.numMembers = count;

    // console.log(currGroup)
    const groupImages = await GroupImage.findAll({
      where: {
        groupId: currGroup.id,
        preview: true
      }
    })
    // console.log(groupImages)
    if (groupImages.length) {
      let groupImage = groupImages[0].toJSON()
      // console.log(groupImage)

        currGroup.previewImage = groupImage.url

    } else {
      currGroup.previewImage = 'no preview image available'
    }

    groupsArr.push(currGroup)
  }

  finalObj.Groups = groupsArr
  res.status(200).json(finalObj)
})


// CREATE A GROUP
router.post('/', requireAuth, validateGroupBody, async (req, res, next) => {

    const { name, about, type, private, city, state } = req.body

    const newGroup = await Group.create({
      organizerId: req.user.id,
      name,
      about,
      type,
      private,
      city,
      state
    })

    await Membership.create({
      userId: req.user.id,
      groupId: newGroup.id,
      status: 'organizer'
    })

    res.status(201).json(newGroup);
})

// EDIT A GROUP
router.put('/:groupId', requireAuth, validateGroupBody, async (req, res, next) => {

    const { name, about, type, private, city, state } = req.body

    let group = await Group.findByPk(req.params.groupId);

    if (!group) {
      let newErr = new Error()
      newErr.message = "Group couldn't be found"
      newErr.status = 404;

      next(newErr);
    }

    if (group.organizerId === req.user.id) {
      group.name = name
      group.about = about
      group.type = type
      group.private = private
      group.city = city
      group.state = state
      await group.save()

      res.status(200).json(group)
    } else {
      let newErr = new Error()
      newErr.message = "Forbidden"
      newErr.status = 403;

      next(newErr);
    }
})


// GET DETAILS OF A GROUP FROM AN ID
router.get('/:groupId', async (req, res, next) => {

  try {
    let group = await Group.findByPk(req.params.groupId, {
      include: [
        {
          model: GroupImage,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'groupId']
          }
        },
        {
          model: Venue,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      ]
    })

    let count = await Membership.count({
      where: {
        groupId: currGroup.id,
        status: {
          [Op.not]: 'pending'
        }
      }
    })

    group = group.toJSON()
    group.numMembers = count;

    let organizer = await User.findByPk(group.organizerId, {
      attributes: {
        exclude: ['username']
      }
    })
    group.Organizer = organizer

    res.status(200).json(group);

  }
  catch (err) {
    let newErr = new Error()
    newErr.message = "Group couldn't be found"
    newErr.status = 404;

    next(newErr);

  }
})

// DELETE A GROUP
router.delete('/:groupId', requireAuth, async (req, res, next) => {

  let group = await Group.findByPk(req.params.groupId);

  if (!group) {
    let newErr = new Error()
    newErr.message = "Group couldn't be found"
    newErr.status = 404;

    next(newErr);
  }

  if (group.organizerId === req.user.id) {
    await group.destroy()
    res.status(200).json({ message: 'Successfully deleted'})

  } else {
    let newErr = new Error()
    newErr.message = "Forbidden"
    newErr.status = 403;

    next(newErr);
  }
})

// ADD AN IMAGE TO A GROUP BASED ON THE GROUP'S ID
router.post('/:groupId/images', requireAuth, async (req, res, next) => {

    const { url, preview } = req.body

    let group = await Group.findByPk(req.params.groupId)

    if (!group) {
      let newErr = new Error()
      newErr.message = "Group couldn't be found"
      newErr.status = 404;

      next(newErr);
    }

    if (group.organizerId === req.user.id) {

      let newImg = await GroupImage.create({
        groupId: req.params.groupId,
        url: url,
        preview: preview
      })
      newImg = newImg.toJSON()
      delete newImg.createdAt
      delete newImg.updatedAt
      delete newImg.groupId

      res.status(200).json(newImg);
    }
    else {
      let newErr = new Error()
      newErr.message = "Forbidden"
      newErr.status = 403;

      next(newErr);
    }
})


//  GET ALL VENUES FOR A GROUP SPECIFIED BY ITS ID
router.get('/:groupId/venues', requireAuth, async (req, res, next) => {

  let venuesArr = [];
  let finalObj = {};

  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    let newErr = new Error()
    newErr.message = "Group couldn't be found"
    newErr.status = 404;

    next(newErr);
  }

  const isCoHost = await Membership.findOne({
    where: {
      userId: req.user.id,
      status: 'co-host',
      groupId: req.params.groupId
    }
  })

  if (isCoHost || group.organizerId === req.user.id) {

      let venues = await Venue.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: Group,
            attributes: [],
            where: {
              id: req.params.groupId
            }
          }
        ]
    })

    for (let i = 0; i < venues.length; i++) {
      let currVenue = venues[i].toJSON()
      venuesArr.push(currVenue)
    }

    finalObj.Venues = venuesArr
    res.status(200).json(finalObj)

  } else {
    let newErr = new Error()
    newErr.message = "Forbidden"
    newErr.status = 403;

    next(newErr);
  }
})

// CREATE A NEW VENUE FOR A GROUP SPECIFIED BY ITS ID
router.post('/:groupId/venues', requireAuth, validateVenueBody, async (req, res, next) => {

    const { address, city, state, lat, lng } = req.body

    const group = await Group.findByPk(req.params.groupId)

    if (!group) {
      let newErr = new Error()
      newErr.message = "Group couldn't be found"
      newErr.status = 404;

      next(newErr);
    }

    const isCoHost = await Membership.findOne({
      where: {
        userId: req.user.id,
        status: 'co-host',
        groupId: req.params.groupId
      }
    })

    if (isCoHost || group.organizerId === req.user.id) {
      let newVenue = await Venue.create({
        groupId: req.params.groupId,
        address,
        city,
        state,
        lat,
        lng
      })
      newVenue = newVenue.toJSON()
      delete newVenue.createdAt
      delete newVenue.updatedAt
      res.status(200).json(newVenue)

    } else {
      let newErr = new Error()
      newErr.message = "Forbidden"
      newErr.status = 403;

      next(newErr);
    }
})


// GET ALL EVENTS OF A GROUP SPECIFIED BY ITS ID
router.get('/:groupId/events', async (req, res, next) => {

  let group = await Group.findByPk(req.params.groupId)

  if (!group) {
    let newErr = new Error()
    newErr.message = "Group couldn't be found"
    newErr.status = 404;

    next(newErr);
  }

  let eventArr = [];
  let finalObj = {};

  const events = await Event.findAll({
    attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'endDate'],
    where: {
      groupId: req.params.groupId
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

    const numAttending = await Attendance.count({
      where: {
        eventId: currEvent.id,
        status: 'attending'
      }
    })
    currEvent.numAttending = numAttending

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


// CREATE AN EVENT FOR A GROUP SPECIFIED BY ITS ID
router.post('/:groupId/events', requireAuth, validateEventBody, async (req, res, next) => {

    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

    const group = await Group.findByPk(req.params.groupId)

    if (!group) {
      let newErr = new Error()
      newErr.message = "Group couldn't be found"
      newErr.status = 404;

      next(newErr);
    }

    const isCoHost = await Membership.findOne({
      where: {
        userId: req.user.id,
        status: 'co-host',
        groupId: req.params.groupId
      }
    })

    if (isCoHost || group.organizerId === req.user.id) {
      let newEvent = await Event.create({
        groupId: req.params.groupId,
        venueId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate
      })

      await Attendance.create({
        eventId: newEvent.id,
        userId: req.user.id,
        status: 'attending'
      })
      newEvent = newEvent.toJSON()

      delete newEvent.createdAt
      delete newEvent.updatedAt

      res.status(200).json(newEvent)

    } else {
      let newErr = new Error()
      newErr.message = "Forbidden"
      newErr.status = 403;

      next(newErr);
    }
})

// GET ALL MEMBERS OF A GROUP SPECIFIED BY ITS ID
router.get('/:groupId/members', async (req, res, next) => {
  let finalObj = {};
  let memberArr = [];

  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    let newErr = new Error()
    newErr.message = "Group couldn't be found"
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
      groupId: req.params.groupId
    }
  })

  if (isCoHostorOrganizer || group.organizerId === req.user.id) {

    let members = await User.findAll({
      attributes: ['id', 'firstName', 'lastName'],
      include: {
        model: Membership,
        attributes: ['status'],
        where: {
          groupId: req.params.groupId
        }
      }
    })

    for (let i = 0; i < members.length; i++) {
      let currMember = members[i]
      currMember = currMember.toJSON()
      currMember.Membership = currMember.Memberships[0]
      delete currMember.Memberships
      memberArr.push(currMember)
    }

    finalObj.Members = memberArr
    res.status(200).json(finalObj)

    // If you are not the organizer or co-host, but the group still exists
  } else if (group) {

    let members = await User.findAll({
      attributes: ['id', 'firstName', 'lastName'],
      include: {
        model: Membership,
        attributes: ['status'],
        where: {
          groupId: req.params.groupId,
          [Op.or]: [
            {
              status: 'co-host'
            },
            {
              status: 'member'
            },
            {
              status: 'organizer'
            }
          ]
        }
      }
    })

    for (let i = 0; i < members.length; i++) {
      let currMember = members[i]
      currMember = currMember.toJSON()
      currMember.Membership = currMember.Memberships[0]
      delete currMember.Memberships
      memberArr.push(currMember)
    }

    finalObj.Members = memberArr
    res.status(200).json(finalObj)
  }
})


// REQUEST A MEMBERSHIP FOR A GROUP BASED ON THE GROUP'S ID
router.post('/:groupId/membership', requireAuth, async (req, res, next) => {

  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    let newErr = new Error()
    newErr.message = "Group couldn't be found"
    newErr.status = 404;

    next(newErr);
  }

  const currMemberCheck = await Membership.findOne({
    where: {
      groupId: req.params.groupId,
      userId: req.user.id
    }
  })

  if (!currMemberCheck) {
    let pendingMember = await Membership.create({
      userId: req.user.id,
      groupId: req.params.groupId,
      status: 'pending'
    })

    pendingMember = pendingMember.toJSON()
    delete pendingMember.updatedAt
    delete pendingMember.createdAt
    delete pendingMember.id
    delete pendingMember.groupId
    pendingMember.memberId = pendingMember.userId
    delete pendingMember.userId

    res.status(200).json(pendingMember);
  }

  else if (currMemberCheck.status === 'pending') {
    let newErr = new Error()
    newErr.message = "Membership has already been requested"
    newErr.status = 400;

    next(newErr);
  }

  else if (currMemberCheck.status === 'member' || currMemberCheck.status === 'organizer' || currMemberCheck.status === 'co-host') {
    let newErr = new Error()
    newErr.message = "User is already a member of the group"
    newErr.status = 400;

    next(newErr);
  }
})


// CHANGE THE STATUS OF A MEMBERSHIP FOR A GROUP SPECIFIED BY ID
router.put('/:groupId/membership', requireAuth, async (req, res, next) => {

  const { memberId, status } = req.body

  if (status === 'pending') {
    let newErr = new Error()
    newErr.message = "Cannot change a membership status to pending"
    newErr.status = 400;

    next(newErr);
  }

  const user = await User.findByPk(memberId)

  if (!user) {
    let newErr = new Error()
    newErr.message = "User couldn't be found"
    newErr.status = 400;

    next(newErr);
  }

  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    let newErr = new Error()
    newErr.message = "Group couldn't be found"
    newErr.status = 404;

    next(newErr);
  }

  let member = await Membership.findOne({
    attributes: ['id', 'groupId', 'status'],
    where: {
      groupId: req.params.groupId,
      userId: memberId
    }
  })
  console.log(member.toJSON());

  if (!member) {
    let newErr = new Error()
    newErr.message = "Membership between the user and the group does not exist"
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
      groupId: req.params.groupId
    }
  })

  if (group.organizerId === req.user.id && status === 'co-host') {
    member.status = 'co-host'
    await member.save()
    member = member.toJSON()
    member.memberId = memberId
    delete member.updatedAt

    res.status(200).json(member)
  }
  else if ((isCoHostorOrganizer || group.organizerId === req.user.id) && status === 'member') {
    member.status = 'member'
    await member.save()
    member = member.toJSON()
    member.memberId = memberId
    delete member.updatedAt

    res.status(200).json(member)
  }
  else {
    let newErr = new Error()
    newErr.message = "Forbidden"
    newErr.status = 403;

    next(newErr);
  }
})


// DELETE MEMBERSHIP TO A GROUP SPECIFIED BY ITS ID
router.delete('/:groupId/membership', requireAuth, async (req, res, next) => {

  const { memberId } = req.body

  const user = await User.findByPk(memberId)

  if (!user) {
    let newErr = new Error()
    newErr.message = "User couldn't be found"
    newErr.status = 400;

    next(newErr);
  }

  const group = await Group.findByPk(req.params.groupId)

  if (!group) {
    let newErr = new Error()
    newErr.message = "Group couldn't be found"
    newErr.status = 404;

    next(newErr);
  }

  let member = await Membership.findOne({
    attributes: ['id', 'groupId', 'status'],
    where: {
      groupId: req.params.groupId,
      userId: memberId
    }
  })

  if (!member) {
    let newErr = new Error()
    newErr.message = "Membership does not exist for this user"
    newErr.status = 404;

    next(newErr);
  }
  console.log(member.toJSON());

  if (memberId === req.user.id || group.organizerId === req.user.id) {
    await member.destroy()
    res.status(200).json({ message: 'Successfully deleted membership from group'})
  }
  else {
    let newErr = new Error()
    newErr.message = "Forbidden"
    newErr.status = 403;

    next(newErr);
  }
})



module.exports = router;
