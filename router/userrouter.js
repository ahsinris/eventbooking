const router = require('express').Router()

const Validation = require('../validation/joi')

const Controller = require('../controller/usercontroller')

router.post('/adduser', Validation.adduserValidation, Controller.userController)

router.get('/getuserEvents', Validation.geteventValidation, Controller.getuserController)

router.delete('/canceluserEvent', Validation.canceleventValidation, Controller.cancelEventController)

module.exports = router