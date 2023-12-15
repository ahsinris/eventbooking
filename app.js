const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.json())
const userRouter = require('./router/userrouter')
const eventRouter = require('./router/eventrouter')
const participantRouter = require('./router/participantrouter')
app.use(userRouter)
app.use(eventRouter)
app.use(participantRouter)
// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     next(err)
//     res.send({ message: "server side error", data: err.message }).status(500)
// })

app.listen(process.env.PORT, () => {
    console.log(`port listned at ${process.env.PORT}`)
})