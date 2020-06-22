const router = require('express').Router()
const Recipes = require('../apiModel')

router.get(
     '/',
     (req, res) => {
          Recipes.find('recipes')
               .then(recipes => {
                    res.status(200).json({
                         recipes: recipes,
                         message: 'Recipes successfully fetched!'
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

module.exports = router