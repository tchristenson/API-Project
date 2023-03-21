// backend/routes/api/groups.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Group, Membership, GroupImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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




module.exports = router;























module.exports = router;
