// backend/routes/api/group-images.js
const express = require('express');
const { Op } = require('sequelize');


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Attendance, EventImage, Event, User, Group, Membership, GroupImage, Venue } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { start } = require('repl');


const router = express.Router();


// DELETE AN IMAGE FOR A GROUP
router.delete('/:imageId', requireAuth, async (req, res, next) => {

  let image = await GroupImage.findByPk(req.params.imageId)

  if (!image) {
    let newErr = new Error()
    newErr.message = "Group Image couldn't be found"
    newErr.status = 404;

    next(newErr);
  }
  const group = await Group.findByPk(image.groupId);

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
      groupId: image.groupId
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
