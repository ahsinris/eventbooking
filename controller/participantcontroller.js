const Service = require('../service/participantservice')

class Controller {
    async paricipantController(req, res) {
        try {

            const result = await Service.participantService(req.body)

            if (!result.sucess) {
                return res.status(result.status).json({
                    message: result.message
                })

            }

            return res.status(200).json({
                message: result.message,
                data: result.data
            })

        }
        catch (e) {
            console.log(e.message)
            return res.status(500).json({
                message: "server issue" + e.message
            })
        }
    }

}


module.exports = new Controller()