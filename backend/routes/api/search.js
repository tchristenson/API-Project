// backend/routes/api/groups.js
const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Attendance, EventImage, Event, Group, Membership, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

router.post('/', async (req, res, next) => {

    const { query } = req.body
    let searchResults = [];
    let finalObj = {};

    const groups = await Group.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.like]: `%${query.toLowerCase()}%`}},
                { about: { [Op.like]: `%${query.toLowerCase()}%`}},
                { city: { [Op.like]: `%${query.toLowerCase()}%`}},
                { state: { [Op.like]: `%${query.toLowerCase()}%`}}
            ]
        },
        include: {
            model: Event,
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
    });

    console.log('groups in backend route =====>>>>>', groups)

    const events = await Event.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.like]: `%${query.toLowerCase()}%`}},
                { description: { [Op.like]: `%${query.toLowerCase()}%`}}
            ]
        },
        include: [
            {
              model: Group,
              attributes: ['id', 'name', 'city', 'state']
            }
        ]
    });

    console.log('events in backend route =====>>>>>', events)

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

        searchResults.push(currGroup)
    }

    for (let i = 0; i < events.length; i++) {
        let currEvent = events[i].toJSON()

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

        searchResults.push(currEvent)
    }

    finalObj.searchResults = searchResults
    console.log('finalObj in backend route =====>>>>>', finalObj)
    res.status(200).json(finalObj)
  })

module.exports = router;
