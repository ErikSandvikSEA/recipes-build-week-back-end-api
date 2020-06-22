const express = require('express')
const usersRouter = require('./users/usersRouter.js')
const authRouter = require('./auth/authRouter.js')
const recipesRouter = require('./recipes/recipesRouter')
const { restricted } = require('./middleware')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())


server.get('/', (req, res) => {
     res.status(200).json({
          server: 'Up and Running',
     })
})



server.use(
     '/api/auth',
    authRouter
)

server.use(
     '/api/users',
     // restricted, 
     usersRouter
)

server.use(
     '/api/recipes',
     // restricted,
     recipesRouter
)

module.exports = server