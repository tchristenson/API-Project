// backend/routes/api/group-images.js
const express = require('express');
const { Op } = require('sequelize');


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Attendance, EventImage, Event, User, Group, Membership, GroupImage, Venue } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { start } = require('repl');


const router = express.Router();


// DELETE AN IMAGE FOR A EVENT
router.delete('/:imageId', requireAuth, async (req, res, next) => {

  let image = await EventImage.findByPk(req.params.imageId)

  if (!image) {
    let newErr = new Error()
    newErr.message = "Event Image couldn't be found"
    newErr.status = 404;

    next(newErr);
  }
  const event = await Event.findByPk(image.eventId);
  const group = await Group.findByPk(event.groupId)

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
      groupId: group.id
    }
  })

  if (group.organizerId === req.user.id || isCoHostorOrganizer) {
    await image.destroy()
    res.status(200).json({ message: 'Successfully deleted'})
  } else {
    let newErr = new Error()
    newErr.message = "Forbidden"
    newErr.status = 403;

    next(newErr);
  }
})


module.exports = router
