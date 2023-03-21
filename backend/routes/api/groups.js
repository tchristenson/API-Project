// backend/routes/api/groups.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Group, Membership, GroupImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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
    // console.log(currGroup)
    // console.log(count)
    currGroup.numMembers = count;

    console.log(currGroup)
    const groupImages = await GroupImage.findAll()

    for (let i = 0; i < groupImages.length; i++) {
      let currGroupImage = groupImages[i].toJSON()
      // console.log(currGroupImage)
      // console.log(typeof currGroupImage)
      if (currGroupImage.id === currGroup.id) {
        currGroup.previewImage = currGroupImage.url
      }
    }
      groupsArr.push(currGroup)
  }
  finalObj.Groups = groupsArr
  res.json(finalObj)
})























module.exports = router;
