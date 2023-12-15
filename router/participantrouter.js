const router = require('express').Router()

const Validation = require('../validation/joi')

const Controller = require('../controller/participantcontroller')

router.post('/joinevent', Validation.joineventValidation, Controller.paricipantController)

module.exports = router