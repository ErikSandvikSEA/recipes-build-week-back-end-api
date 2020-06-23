const supertest = require('supertest')
const server = require('../server.js')
const db = require('../../database/db-config.js')
const constants = require('../../config/constants.js')
const jwt = require('jsonwebtoken')
const { request } = require('../server.js')

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
     password: 'samplePassword'
}

const newRecipe = {
     title: "Cup of Coffee",
     category: "Breakfast",
     instructions: "1.) Get ingredients. 2.) Pour hot water over coffee in filter. 3.) Allow cooling",
     ingredients: "1.) Ground coffee, 2.) Filters",
     user_id: 1,
     user: "sample user"
 }

beforeEach(async () => {
     await db.seed.run()
})
afterEach(async () => {
     await db('recipesList').truncate()
})

describe('recipesRouter', () => {
     let testUserToken = createToken(registeredUser)
     describe('fetching recipes list', () => {
          it('should return a 200 status', async () => {
               return supertest(server)
                    .get('/api/recipes')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.status).toBe(200)
                         })
          })
          it('should return an array of 3 recipes (seeds)', async () => {
               return supertest(server)
                    .get('/api/recipes')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.body.recipes).toHaveLength(3)
                         })
          })
     })
     describe('fetching single recipe', () => {
          it('should return a 200 status', async () => {
               return supertest(server)
                    .get('/api/recipes/1')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.status).toBe(200)
                         })
          })
          it('should return an object with a single recipe', () => {
               return supertest(server)
                    .get('/api/recipes/1')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.body.recipe).toBeTruthy()
                         })
          })
          it('should return the success message', () => {
               return supertest(server)
                    .get('/api/recipes/1')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              console.log(response.body.message)
                              expect(response.body.message).toEqual('Recipe successfully fetched!')
                         })
          })
     })
     describe('adding a new recipe', () => {
          it('should return a 201 status', async () => {
               return supertest(server)
                    .post('/api/recipes')
                    .set('Authorization', testUserToken)
                    .send(newRecipe)
                         .then(response => {
                              expect(response.status).toBe(201)
                         })
          })
          it('should return the posted recipe', async () => {
               return supertest(server)
                    .post('/api/recipes')
                    .set('Authorization', testUserToken)
                    .send(newRecipe)
                         .then(response => {
                              expect(response.body.newRecipe).toBeTruthy()
                         })
          })
          it('should return the success message', async () => {
               return supertest(server)
                    .post('/api/recipes')
                    .set('Authorization', testUserToken)
                    .send(newRecipe)
                         .then(response => {
                              expect(response.body.message).toBe('Recipe Added!')
                         })
          })
     })
     describe('deleting a recipe', () => {
          it('should return a 200 status', async () => {
               return supertest(server)
                    .delete('/api/recipes/2')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.status).toBe(200)
                         })
          })
          it('should return the deleted recipe', async () => {
               return supertest(server)
                    .delete('/api/recipes/2')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.body.deletedRecipe).toBeTruthy()
                         })
          })
          it('should return the success message', () => {
               return supertest(server)
                    .delete('/api/recipes/2')
                    .set('Authorization', testUserToken)
                         .then(response => {
                              expect(response.body.message).toBe('Successfully deleted')
                         })
          })
     })
     describe('editing an existing recipe', () => {
          it('should return a 201 status', () => {
               return supertest(server)
                    .put('/api/recipes/3')
                    .set('Authorization', testUserToken)
                    .send(newRecipe)
                         .then(response => {
                              expect(response.status).toBe(201)
                         })
          })
          it('should have the same id as the original', () => {
               return supertest(server)
                    .put('/api/recipes/3')
                    .set('Authorization', testUserToken)
                    .send(newRecipe)
                         .then(response => {
                              console.log(response.body)
                              expect(response.body.updatedRecipe.id).toBe(3)
                         })
          })
          it('should return the success message', () => {
               return supertest(server)
                    .put('/api/recipes/3')
                    .set('Authorization', testUserToken)
                    .send(newRecipe)
                         .then(response => {
                              expect(response.body.message).toBe('Recipe successfully updated!')
                         })
          })
          it('should return the success message', () => {
               return supertest(server)
                    .put('/api/recipes/3')
                    .set('Authorization', testUserToken)
                    .send(newRecipe)
                         .then(response => {
                              expect(response.body.updatedRecipe).toBeTruthy()
                         })
          })
     })
})
