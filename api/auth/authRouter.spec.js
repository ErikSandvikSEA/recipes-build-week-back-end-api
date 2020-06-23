const supertest = require('supertest')
const server = require('../server.js')
const db = require('../../database/db-config.js')

beforeEach(async () => {
     await db.seed.run()
})

const newUser = {
     username: 'tester',
     password: 'password',
     email: 'tester@test.com'
}

const registeredUser = {
     username: 'sample user',
     // email: 'sample@user.com',
     password: 'samplePassword'
}

describe('authRouter', () => {
     //REGISTRATION
     describe('registering new user', () => {
          it('should return new user object', async () => {
               return supertest(server)
                    .post('/api/auth/register')
                    .send(newUser)
                         .then(response => {
                              //check for token
                              expect(response.body.token).toBeTruthy()
                              //check for username
                              expect(response.body.newUser.username).toBe('tester')
                         })
          })
          it('should return a 201 status', async () => {
               return supertest(server)
                    .post('/api/auth/register')
                    .send(newUser)
                         .then(response => {
                              expect(response.status).toBe(201)
                         })
          })
     })
     //LOGIN
     describe('logging in', () => {
          it('should return logged in user object', async () => {
               return supertest(server)
                    .post('/api/auth/login')
                    .send(registeredUser)
                         .then(response => {
                              expect(response.body.user.username).toBe('sample user')
                         })
          })
          it('should return a 201 status', async () => {
               return supertest(server)
                    .post('/api/auth/login')
                    .send(registeredUser)
                         .then(response => {
                              expect(response.status).toBe(201)
                         })
          })
     })
})