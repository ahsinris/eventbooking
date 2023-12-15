const res = require('express/lib/response')
const dbconn = require('../DB/mysql')

class Service {

    async eventService(reqdata) {
        let { event_name, start_time, end_time } = reqdata

        const [result] = await dbconn.query(`insert into events (event_name,start_time,end_time) values(?,?,?)`,
            [event_name, start_time, end_time])
        return {
            sucess: true,
            message: "event added sucessfully",
            status: 200,
            data: result
        }

    }

    async ongoinEvents() {
        let currenTime = new Date()

        const [result] = await dbconn.query(`select u.user_name as participant_name,e.event_name from eventParticipants p 
        join users u  
        on p.user_id = u.user_id 
        join events e 
         on p.event_id= e.event_id
          where(e.start_time <=? and e.end_time >=?)`, [currenTime, currenTime])
        // console.log(result)

        return {
            sucess: true,
            message: 'ongoing events',
            status: 200,
            data: result
        }
    }

}

module.exports = new Service()