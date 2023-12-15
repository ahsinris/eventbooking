const dbconn = require('../DB/mysql')
class Service {

    async participantService(reqdata) {
        let { event_id, user_id } = reqdata


        const [userBookedEvent] = await dbconn.query(`select join_status from eventParticipants where event_id=? and user_id=?`, [event_id, user_id])
        // console.log(userBookedEvent)
        if (userBookedEvent.length > 0) {
            return {
                sucess: false,
                status: 400,
                message: "user alread booked this event"
            }
        }

        const [eventtimes] = await dbconn.query(`select start_time,end_time from events where event_id=?`, [event_id])

        // console.log(eventtimes)

        // const now = new Date()

        const startTime = new Date(eventtimes[0].start_time)
        // console.log(startTime)

        const endTime = new Date(eventtimes[0].end_time)
        // console.log(endTime)

        const [overlap] = await dbconn.query(`select p.join_status from eventParticipants p join events e on p.event_id = e.event_id 
        where p.user_id=? AND ( (e.start_time between ? and ?)or (e.end_time between ? and ?))`, [user_id, startTime, endTime, startTime, endTime])
        // console.log(overlap)
        
        if (overlap.length > 0) {
            return {
                sucess: false,
                status: 400,
                message: "overlap"
            }
        }

        const [insert] = await dbconn.query('insert into eventParticipants(event_id,user_id,join_status) values(?,?,?)',
            [event_id, user_id, `joined`])
        return {
            sucess: true,
            status: 200,
            message: "user joined event",
            data: insert
        }
    }

}



module.exports = new Service()