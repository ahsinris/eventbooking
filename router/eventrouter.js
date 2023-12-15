const router = require('express').Router()

const Validation = require('../validation/joi')

const Controller = require('../controller/eventcontroller')

router.post('/addevent', Validation.addEventValidation, Controller.eventController)

router.get('/ongoingEvents', Controller.ongoingeventController)

module.exports = router
