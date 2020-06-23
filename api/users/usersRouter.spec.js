const supertest = require('supertest')
const server = require('../server.js')
const db = require('../../database/db-config.js')
const constants = require('../../config/constants.js')
const jwt = require('jsonwebtoken')

function createToken(user){
     const payload = {
       subject: user.id,
       username: user.username
     }
     const secret = constants.jwtSecret
     const options = {
       expiresIn: '1d',
     }
     return jwt.sign(payload, secret, options)
}

const registeredUser = {
     username: 'sample user',
     // email: 'sample@user.com',
     password: 'samplePassword'
}

beforeEach(async () => {
     await db.seed.run()
})

afterEach(async () => {
     await db('users').truncate()
 })

describe('usersRouter', () => {
     let testUserToken= createToken(registeredUser)



     describe('fetching users list', () => {
          it('should return a 200 status', async () => {
               return supertest(server)
                    .get('/api/users')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.status).toBe(200)
                         })
          })
          it('should return the users array', async () => {
               return supertest(server)
                    .get('/api/users')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.body.users).toBeTruthy()
                         })
          })
     })
     describe('fetching a single user', () => {
          it('should return a single user object', () => {
               return supertest(server)
                    .get('/api/users/1')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.body.username).toBe('sample user')
                         })
          })
          it('should return a 200 status', () => {
               return supertest(server)
                    .get('/api/users/1')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.status).toBe(200)
                         })
          })
     })
})