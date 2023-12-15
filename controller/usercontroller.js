const Service = require('../service/userservice')

class Controller {
    async userController(req, res) {
        try {

            const result = await Service.userService(req.body)

            if (result.sucess) {
                return res.status(result.status).json({
                    message: result.message,
                    data: result.data
                })

            }

            return res.status(400).json({
                message: "bad request" + e
            })

        }
        catch (e) {

            // next(e)
            return res.status(500).json({
                message: "server issue" + e.message
            })
        }
    }
    async getuserController(req, res) {
        try {

            const result = await Service.getuserService(req.body)

            if (!result.sucess) {
                return res.status(result.status).json({
                    message: result.message
                })

            }

            return res.status(200).json({
                data: result.data
            })

        }
        catch (e) {
            console.log(e.message)
            // next(e)
            return res.status(500).json({
                message: "server issue" + e.message
            })
        }
    }

    async cancelEventController(req, res) {
        try {

            const result = await Service.cancelEventServive(req.body)

            if (!result.sucess) {
                return res.status(result.status).json({
                    message: result.message
                })

            }

            return res.status(200).json({
                message: result.message
            })

        }
        catch (e) {

            console.log(e)
            return res.status(500).json({
                message: "server issue" + e.message
            })
        }
    }

}


module.exports = new Controller()