const express = require('express')
const usersRouter = require('./users/usersRouter.js')
const authRouter = require('./auth/authRouter.js')
const server = express()
const { restricted } = require('./middleware')

server.use(express.json())

server.get('/', (req, res) => {
     res.status(200).json({
          server: 'Up and Running'
     })
})

server.use(
     '/api/auth',
    authRouter
)

server.use(
     '/api/users',
     restricted, 
     usersRouter
)

module.exports = server