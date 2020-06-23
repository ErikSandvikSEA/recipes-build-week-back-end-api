const router = require('express').Router()
const Recipes = require('../apiModel')
const { requiredProperty } = require('../middleware')
const { findById } = require('../apiModel')


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
          Recipes.findById('recipesList', recipeId)
               .then(recipe => {
                    res.status(200).json({
                         recipe: recipe,
                         message:'Recipe successfully fetched!'
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
     requiredProperty('user'),
     requiredProperty('user_id'),
     requiredProperty('category'),
     requiredProperty('instructions'),
     requiredProperty('ingredients'),
     (req, res) => {
          const newRecipe = req.body
          Recipes.add('recipesList', newRecipe)
               .then(postedNewRecipe => {
                    res.status(201).json({
                         message: 'Recipe Added!',
                         newRecipe: postedNewRecipe
                    })
               })
               .catch(err => {
                    res.status(500).json({
                         error: err.message,
                         message: 'Error occurred while posting'   
                    })
               })
     }
)

router.put(
     '/:id', 
     requiredProperty('title'),
     requiredProperty('user'),
     requiredProperty('user_id'),
     requiredProperty('category'),
     requiredProperty('instructions'),
     requiredProperty('ingredients'),
     (req, res) => {
          const recipeId = req.params.id
          const updatedRecipe =  req.body
          Recipes.updateRecipe(updatedRecipe, recipeId)
               .then(recipe => {
                    res.status(201).json({
                         message: 'Recipe successfully updated!',
                         updatedRecipe: recipe
                    })
               })
               .catch(err => {
                    console.log(err)
                    res.status(500).json({
                         errorMessage: err.message,
                         message: 'Error occurred during update'
                    })
               })
})

router.delete(
     '/:id',
     validateId,
     async (req, res) => {
          const recipeId = req.params.id
          const recipeToDelete = await findById('recipesList', req.params.id)
          Recipes.deleteRecipe(recipeId)
               .then(deleted => {
                    res.status(200).json({
                         message: 'Successfully deleted',
                         deletedRecipe: recipeToDelete
                    })
               })
               .catch(err => {
                    res.status(500).json({
                         message: 'Error occurred while deleting',
                         errorMessage: err.message
                    })
               })
     }
)

function validateId(req, res, next){
     const validatedId = req.params.id
     Recipes.findById('recipesList', validatedId)
          .then(recipe => {
               if(recipe) {
                    next()
               } else {
                    res.status(404).json({
                         message: `Could not locate recipe ID: ${validatedId}`
                    })
               }
          })
          .catch(err => {
               res.status(500).json({
                    message: `Could not locate recipe ID: ${validatedId}`,
                    error: err.message
               })
          })
}

module.exports = router