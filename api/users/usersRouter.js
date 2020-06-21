const router = require('express').Router()

const Users = require('../apiModel')
const { requiredProperty } = require('../middleware')

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
                         error: err,
                         message: 'Error occurred while fetching'
                    })
               })
     }
)

module.exports = router