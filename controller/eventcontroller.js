const Service = require('../service/eventservice')

class Controller {
    async eventController(req, res) {
        try {

            const result = await Service.eventService(req.body)

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

            console.log(e.messgae, "error")
            return res.status(500).json({
                message: "server issue " + e
            })
        }
    }

    async ongoingeventController(req, res) {
        try {

            const result = await Service.ongoinEvents(req.body)

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

            console.log(e.messgae, "error")
            return res.status(500).json({
                message: "server issue " + e
            })
        }
    }


}


module.exports = new Controller()