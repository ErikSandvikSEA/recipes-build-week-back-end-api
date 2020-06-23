const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const constants = require('../../config/constants')
const Model = require('../apiModel.js')
const { requiredProperty } = require('../middleware')

//REGISTRATION
router.post(
     '/register',
     requiredProperty('username'),
     requiredProperty('email'),
     requiredProperty('password'), 
     (req, res) => {
     const credentials = req.body
     const rounds = 8

     //hash the password
     const hash = bcryptjs.hashSync(credentials.password, rounds)
     credentials.password = hash

     //save the user to the database
     Model.add('users', credentials)
          .then(newUser => {
               const token = createToken(newUser)
               res.status(201).json({
                    message: 'Successfully Registered!',
                    newUser: newUser,
                    token
               })
          })
          .catch(err => {
               res.status(500).json({
                    message: 'Error occurred during registration',
                    error: err.message
               })
          })
})

//Login
router.post(
     '/login',
     requiredProperty('username'),
     requiredProperty('password'),
     (req, res) => {
          const username = req.body.username
          const password = req.body.password
          Model.findByUsername('users', username)
               .then(([user]) => {
                    //compare the password to the hash stored in the database
                    console.log(user)
                    if( user && bcryptjs.compareSync(password, user.password)){
                         const token = createToken(user)
                         res.status(201).json({
                              message: 'Successfully Logged In!',
                              user: user,
                              token
                         })
                    } else {
                         res.status(400).json({
                              message: "Invalid username/password"
                         })
                    }
               })
               .catch(err => {
                    res.status(500).json({
                         message: 'Error occurred during login',
                         error: err.message
                    })
               })
     }
)

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

module.exports = router