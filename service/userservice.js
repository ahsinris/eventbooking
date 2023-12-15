const { date } = require('joi')
const dbconn = require('../DB/mysql')

class Service {

    async userService(reqdata) {
        let { name } = reqdata

        const [result] = await dbconn.query(`insert into users (user_name) values(?)`, [name])
        return {
            sucess: true,
            message: "user added sucessfully",
            status: 200,
            data: result
        }

    }
    async getuserService(reqdata) {
        let { user_id } = reqdata

        // console.log(user_id)

        const [isuserexist] = await dbconn.query(`select * from users where user_id =?`, [user_id])
        // console.log(isuserexist)

        if (isuserexist.length == 0) {
            return {
                sucess: false,
                status: 400,
                message: "user not found"
            }
        }

        const curretdate = new Date()
        // console.log(curretdate)

        const [result] = await dbconn.query(`select * from events e 
        join eventParticipants p 
        on e.event_id =p.event_id 
        where p.user_id=? `, [user_id])
        // console.log(result)
        if (!result.length) {
            return {
                sucess: false,
                status: 400,
                message: "error fetching in users events"
            }
        }

        const pastEvents = []
        const presentEvents = []
        const futureEvents = []


        for (const event of result) {
            // console.log(event)

            let eventStartTime = new Date(event.start_time)
            // console.log(eventStartTime)
            let eventendTime = new Date(event.end_time)
            // console.log(eventendTime)

            if (eventendTime < curretdate) {
                pastEvents.push(event)
            }
            else if (eventStartTime <= curretdate && eventendTime >= curretdate) {
                presentEvents.push(event)
            }
            else {
                futureEvents.push(event)
            }

        }

        // console.log(pastEvents)
        // console.log(presentEvents)
        // console.log(futureEvents)



        const allEvents = [...pastEvents, ...presentEvents, ...futureEvents].sort(
            (a, b) => new Date(b.start_time) - new Date(a.start_time)
        )
        return {
            sucess: true,
            status: 200,
            data: allEvents
        }


    }

    async cancelEventServive(reqdata) {
        let { user_id, event_id } = reqdata
        const [isuserexist] = await dbconn.query(`select * from users where user_id=?`, [user_id])


        if (isuserexist.length == 0) {
            return {
                sucess: false,
                status: 400,
                message: "user not found"
            }
        }
        const [isEventBooked] = await dbconn.query(`select * from eventParticipants where event_id=? and user_id=?`, [event_id, user_id])
        if (isEventBooked.length == 0) {
            return {
                sucess: false,
                status: 400,
                message: "this user has not booked this event"
            }
        }

        const [result] = await dbconn.query(`select * from events where event_id=?`, [event_id])

        console.log(result[0].start_time)

        let eventStartTime = new Date(result[0].start_time)

        let currettime = new Date()

        let timeDifference = eventStartTime - currettime

        console.log(timeDifference)

        let eighthoursinMillsec = 8 * 60 * 60 * 1000

        if (timeDifference < eighthoursinMillsec) {
            return {
                sucess: false,
                status: 400,
                message: "event can't be canceled less than 8 hours before event start time"
            }
        }

        let cancelEvent = await dbconn.query(`delete from eventParticipants where user_id=? and event_id =?`, [user_id, event_id])

        return {
            sucess: true,
            message: "event canceled sucessfully"
        }

    }

}





module.exports = new Service()