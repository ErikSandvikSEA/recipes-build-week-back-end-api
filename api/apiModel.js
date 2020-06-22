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
          .join('recipes', 'recipes.author', '=', 'users.username')
          .select('recipes.title');

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
     getUserByIdWithDetail
}