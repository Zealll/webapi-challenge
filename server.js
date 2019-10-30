const express = require('express')
const server = express()
const peopleRouter = require('./Routes/people-routes.js')
const choresRouter = require('./Routes/chores-routes.js')

server.use(express.json())

server.use('/api/people', peopleRouter)
server.use('/api/chores', choresRouter)

server.get('/', (req, res) => {
    res.send(" <h1>Elan's Sprint Challenge</h1>")
})

module.exports = server