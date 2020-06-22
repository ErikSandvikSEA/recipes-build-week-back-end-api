const router = require('express').Router()
const Recipes = require('../apiModel')
const { requiredProperty } = require('../middleware')


router.get(
     '/',
     (req, res) => {
          Recipes.find('recipesList')
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

router.get(
     '/:id',
     (req, res) => {
          const recipeId = req.params.id
          Recipes.getRecipeDetailById(recipeId)
               .then(recipe => {
                    res.status(200).json({
                         recipe: recipe,
                         message:'Recipe succesfully fetched!'
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

router.post(
     '/',
     requiredProperty('title'),
     requiredProperty('author'),
     (req, res) => {
          const newRecipe = req.body
          Recipes.add('recipesList', newRecipe)
               .then(postedNewRecipe => {
                    res.status(201).json({
                         message: 'Recipe Added!',
                         newRecipe: newRecipe
                    })
               })
     }
)

module.exports = router