const db = require('../database/db-config.js')

function find(tableName){
     return db(tableName)
}

function findById(tableName, id) {
     return db(tableName)
       .where({ id })
       .first();
   }

   function findByUsername(tableName, username) {
     return db(tableName)
       .where({ username })
   }

async function getUserByIdWithDetail(id){
     const recipes = await db('users')
          .where('users.id', id)
          .join('recipesList', 'recipesList.user', '=', 'users.username')
     

     const users = await db('users')
          .where('users.id', id)


     return {
          id,
          username: users[0].username,
          email: users[0].email,
          password: users[0].password,
          recipes
     }
}



// async function getRecipeDetailById(id){
//      const recipes = await db('recipesList')
//           .where('recipesList.id', id)


//      const instructions = await db('recipesList')
//           .where('recipesList.id', id)
//           .join('instructions', 'instructions.recipe_title', '=', 'recipesList.title')
//           .select('instructions.step', 'instructions.instruction_description')
//           .orderBy('instructions.step')

//      const categories = await db('recipesList')
//           .where('recipesList.id', id)
//           .join('categories', 'categories.category', '=', 'recipesList.category')
//           .select('categories.category')

//      const ingredients = await db('recipesList')
//           .where('recipesList.id', id)
//           .join('ingredients_list', 'ingredients_list.recipe_title', '=', 'recipesList.title')
//           .select('ingredients_list.ingredient')


//      return {
//           id,
//           title: recipes[0].title,
//           author: recipes[0].author,
//           instructions: instructions,
//           categories,
//           ingredients: ingredients,
//      }
// }

// function addInstruction(newInstruction) {
//      return db('instructions')
//        .insert(newInstruction)
//        .then(([id]) => findById('instructions', id))
//    }
   
// function addIngredient(newIngredient) {
//      return db('ingredients_list')
//        .insert(newIngredient)
//        .then(([id]) => findById('ingredients_list', id))
//    }

function add(tableName, newEntity) {
     return db(tableName)
       .insert(newEntity)
       .then(([id]) => findById(tableName, id))
   }

module.exports = {
     find,
     add,
     findById,
     findByUsername,
     getUserByIdWithDetail,
     // getRecipeDetailById,
     // addIngredient,
     // addInstruction
}