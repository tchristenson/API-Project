// backend/routes/api/groups.js
const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Attendance, EventImage, Event, Group, Membership, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { sequelize } = require('../../db/models/index.js');


const router = express.Router();

router.post('/', async (req, res, next) => {


    const { query } = req.body
    let searchResults = [];
    let finalObj = {};

    if (process.env.NODE_ENV === 'production') {
        const groups = await Group.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: (`%${query.toLowerCase()}%`)}},
                    { about: { [Op.iLike]: (`%${query.toLowerCase()}%`)}},
                    { city: { [Op.iLike]: (`%${query.toLowerCase()}%`)}},
                    { state: { [Op.iLike]: (`%${query.toLowerCase()}%`)}}
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
                    { name: { [Op.iLike]: (`%${query.toLowerCase()}%`)}},
                    { description: { [Op.iLike]: (`%${query.toLowerCase()}%`)}}
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

              console.log('currGroup inside for loop -------->>>>>>>>', currGroup)
              const groupImages = await GroupImage.findAll({
                where: {
                  groupId: currGroup.id,
                  preview: true
                }
              })

              if (groupImages.length) {
                let groupImage = groupImages[0].toJSON()

                  currGroup.previewImage = groupImage.url

              } else {
                currGroup.previewImage = 'no preview image available'
              }

            searchResults.push(currGroup)
        }

        for (let i = 0; i < events.length; i++) {
            let currEvent = events[i].toJSON()
            console.log('currEvent inside for loop -------->>>>>>>>', currEvent)

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

      } else {
          const groups = await Group.findAll({
            where: {

                [Op.or]: [
                    { name: { [Op.substring]: (`${query.toLowerCase()}`)}},
                    { about: { [Op.substring]: (`${query.toLowerCase()}`)}},
                    { city: { [Op.substring]: (`${query.toLowerCase()}`)}},
                    { state: { [Op.substring]: (`${query.toLowerCase()}`)}}
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
                    { name: { [Op.substring]: (`${query.toLowerCase()}`)}},
                    { description: { [Op.substring]: (`${query.toLowerCase()}`)}}
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

              console.log('currGroup inside for loop -------->>>>>>>>', currGroup)
              const groupImages = await GroupImage.findAll({
                where: {
                  groupId: currGroup.id,
                  preview: true
                }
              })

              if (groupImages.length) {
                let groupImage = groupImages[0].toJSON()

                  currGroup.previewImage = groupImage.url

              } else {
                currGroup.previewImage = 'no preview image available'
              }

            searchResults.push(currGroup)
        }

        for (let i = 0; i < events.length; i++) {
            let currEvent = events[i].toJSON()
            console.log('currEvent inside for loop -------->>>>>>>>', currEvent)

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
      }
  })

module.exports = router;
