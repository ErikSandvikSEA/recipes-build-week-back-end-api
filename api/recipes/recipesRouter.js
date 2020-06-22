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
     requiredProperty('category_id'),
     requiredProperty('category'),
     requiredProperty('author_id'),
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

//add new ingredient to a recipe
router.post(
     '/ingredient',
     requiredProperty('recipe_title'),
     requiredProperty('ingredient'),
     requiredProperty('quantity_and_units'),
     (req, res) => {
          const newIngredient = req.body
          Recipes.addIngredient(newIngredient)
               .then(addedIngredient => {
                    res.status(201).json({
                         message: 'Ingredient successfully added!',
                         addedIngredient
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


//add a new instruction to a recipe
router.post(
     '/instruction',
     requiredProperty('step'),
     requiredProperty('instruction_description'),
     requiredProperty('recipe_id'),
     requiredProperty('recipe_title'),
     (req, res) => {
          const newInstruction = req.body
          Recipes.addInstruction(newInstruction)
               .then(addedInstruction => {
                    res.status(201).json({
                         message: 'Instruction successfully added!',
                         addedInstruction
                    })
               })
     }
)

module.exports = router