const joi = require('joi')

class Validation {
    async adduserValidation(req, res, next) {
        try {
            let schema = joi.object({
                name: joi.string().required()

            })
            await schema.validateAsync(req.body)
            next()


        }
        catch (e) {
            console.log(e)
            return res.status(500).json({
                message: "server issue" + e

            })
        }
    }
    async addEventValidation(req, res, next) {
        try {
            let schema = joi.object({
                event_name: joi.string().required(),
                start_time: joi.date().iso().required(),
                end_time: joi.date().greater(joi.ref('start_time')).required()

            })
            await schema.validateAsync(req.body)
            next()


        }
        catch (e) {
            // console.log(e)
            return res.status(500).json({
                message: "server issue" + e

            })
        }
    }

    async joineventValidation(req, res, next) {
        try {
            let schema = joi.object({
                event_id: joi.string().required(),
                user_id: joi.string().required()

            })
            await schema.validateAsync(req.body)
            next()

        }
        catch (e) {
            return res.status(500).json({
                message: "server issue" + e
            })
        }
    }
    async geteventValidation(req, res, next) {
        try {
            let schema = joi.object({
                user_id: joi.string().required()

            })
            await schema.validateAsync(req.body)
            next()

        }
        catch (e) {
            return res.status(500).json({
                message: "server issue" + e
            })
        }
    }

    async canceleventValidation(req, res, next) {
        try {
            let schema = joi.object({
                user_id: joi.string().required(),
                event_id: joi.string().required()

            })
            await schema.validateAsync(req.body)
            next()

        }
        catch (e) {
            return res.status(500).json({
                message: "server issue" + e
            })
        }
    }

}


module.exports = new Validation()