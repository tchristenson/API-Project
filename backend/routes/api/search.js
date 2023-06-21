// backend/routes/api/groups.js
const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Event, Group } = require('../../db/models');
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
        }
    });

    console.log('groups in backend route =====>>>>>', groups)

    const events = await Event.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.like]: `%${query.toLowerCase()}%`}},
                { description: { [Op.like]: `%${query.toLowerCase()}%`}}
            ]
        }
    });

    console.log('events in backend route =====>>>>>', events)

    for (let i = 0; i < groups.length; i++) {
        let currGroup = groups[i].toJSON()
        searchResults.push(currGroup)
    }

    for (let i = 0; i < events.length; i++) {
        let currEvent = events[i].toJSON()
        searchResults.push(currEvent)
    }

    finalObj.searchResults = searchResults
    console.log('finalObj in backend route =====>>>>>', finalObj)
    res.status(200).json(finalObj)
  })

module.exports = router;
