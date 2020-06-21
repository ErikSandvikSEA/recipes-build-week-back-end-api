const express = require('express')
const usersRouter = require('./users/usersRouter.js')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
     res.status(200).json({
          server: 'Up and Running'
     })
})

// server.use('/api/users', usersRouter)

module.exports = server