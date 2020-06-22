const router = require('express').Router()

const Users = require('../apiModel')


router.get(
     '/',
     (req, res) => {
          Users.find('users')
               .then(users => {
                    res.status(200).json({
                         users: users,
                         message: 'Users successfully fetched'
                    })
               })
               .catch(err => {
                    res.status(500).json({
                         error: err.message,
                         message: 'Error occurred while fetching'
                    })
               })
     }
)


router.get(
     '/:id', 
     validateId, 
     (req, res) => {
     res.status(200).json(req.user);
     //remember to add the recipes of that user here
})


//middleware
function validateId(req, res, next){
     const validatedId = req.params.id
     Users.getUserByIdWithDetail(validatedId)
          .then(user => {
               if(user) {
                    req.user = user
                    next()
               } else {
                    res.status(404).json({
                         message: `Could not locate user ID: ${validatedId}`
                    })
               }
          })
          .catch(err => {
               res.status(500).json({
                    message: `Could not locate user ID: ${validatedId}`,
                    error: err.message
               })
          })
}

module.exports = router