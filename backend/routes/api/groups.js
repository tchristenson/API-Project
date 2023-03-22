// backend/routes/api/groups.js
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
        groupId: currGroup.id
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
  res.json(finalObj)
})


// GET ALL GROUPS JOINED OR ORGANIZED BY THE CURRENT USER
router.get('/current', requireAuth, async (req, res, next) => {
  const userId = req.user.id
  const organizedGroups = await Group.findAll({
    where: {
      [Op.or]: [
        {organizerId: userId},
        {'$memberships.userId$': userId}
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
        groupId: currGroup.id
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
  res.json(finalObj)
})


// CREATE A GROUP
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { name, about, type, private, city, state } = req.body
    const organizerId = req.user.id
    // console.log(req.user);
    // console.log(organizerId)
    // console.log(name)

    if (req.user) {
      const newGroup = await Group.create({
        organizerId: organizerId,
        name,
        about,
        type,
        private,
        city,
        state
      })

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

// EDIT A GROUP
router.put('/:groupId', requireAuth, async (req, res, next) => {

  try {
    const { name, about, type, private, city, state } = req.body

    let group = await Group.findOne({
      where: {
        id: req.params.groupId,
        organizerId: req.user.id
      }
    })

    if (group) {
      group.name = name
      group.about = about
      group.type = type
      group.private = private
      group.city = city
      group.state = state
      await group.save()

      res.status(200).json(group)
    } else {
      res.status(404).json({message: "Group couldn't be found"})
    }

  } catch (err) {
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
        groupId: group.id
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

    res.json(group);

  }
  catch (err) {
    let newErr = new Error()
    newErr.message = "Group couln't be found"
    newErr.status = 404;

    next(newErr);

  }
})

// DELETE A GROUP
router.delete('/:groupId', requireAuth, async (req, res, next) => {
  let group = await Group.findOne({
    where: {
      id: req.params.groupId,
      organizerId: req.user.id
    }
  })

  if (group) {
    await group.destroy()
    res.status(200).json({ message: 'Successfully deleted'})

  } else {
      let newErr = new Error()
      newErr.message = "Group couln't be found"
      newErr.status = 404;

      next(newErr);
  }
})

// ADD AN IMAGE TO A GROUP BASED ON THE GROUP'S ID
router.post('/:groupId/images', requireAuth, async (req, res, next) => {

  try {
    let group = await Group.findByPk(req.params.groupId)

    let img = await GroupImage.findOne({
      where: {
        groupId: req.params.groupId
      },
      attributes: {
        exclude: ['groupId', 'createdAt', 'updatedAt']
      }
    })

    const { url, preview } = req.body

    if (group.organizerId === req.user.id) {

      img.url = url
      img.preview = preview

      await img.save()
      res.json(img);
    }
    else {
      let newErr = new Error()
      newErr.message = "Group couln't be found"
      newErr.status = 404;

      next(newErr);
    }

    // Should I just not have a try/catch? And instead just use a simple if/else
  }
  catch(err) {
    let newErr = new Error()
    newErr.message = "Group couln't be found"
    newErr.status = 404;

    next(newErr);
  }
})




module.exports = router;
