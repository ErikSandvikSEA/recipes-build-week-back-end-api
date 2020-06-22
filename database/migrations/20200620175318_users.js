
exports.up = function(knex) {
  return knex.schema
       //--------------users--------------//
     .createTable('users', tbl => {
          tbl.increments()
          tbl.string('username', 128).notNullable().unique().index()
          tbl.string('email', 128).notNullable().unique()
          tbl.string('password', 256).notNullable()
     })
      //--------------recipes--------------//
      .createTable('recipesList', tbl => {
        tbl.increments()
        tbl.string('title').notNullable().index()
        tbl.integer('category_id').references('categories.id').onDelete('RESTRICT').onUpdate('CASCADE')
        tbl.string('category').references('categories.category').onDelete('RESTRICT').onUpdate('CASCADE')
        tbl.integer('author_id').references('users.id').onDelete('RESTRICT').onUpdate('CASCADE')
        tbl.string('author').references('users.name').onDelete('RESTRICT').onUpdate('CASCADE')
      })
      //--------------instructions--------------//
      .createTable('instructions', tbl => {
        tbl.increments()
        tbl.integer('step').notNullable()
        tbl.string('instruction_description', 256).notNullable().index()
        tbl.integer('recipe_id')
          .references('recipes.id')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE')
        tbl
          .string('recipe_title')
          .references('recipes.title')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE')
      })
      //--------------ingredients--------------//
      .createTable('ingredients', tbl => {
        tbl.increments()
        tbl.string('name')
      })
      //--------------categories--------------//
      .createTable('categories', tbl => {
        tbl.increments()
        tbl.string('category')
      })
      //--------------ingredients list--------------//
      .createTable('ingredients_list', tbl => {
        tbl.increments()
        tbl
          .string('recipe_title')
          .references('recipes.title')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE')
        tbl
          .string('ingredient')
          .references('ingredients.name')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE')
        tbl.string('quantity_and_units')
      })


};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('recipesList')
  .dropTableIfExists('ingredients')
  .dropTableIfExists('ingredients_list')
  .dropTableIfExists('categories')
  .dropTableIfExists('instructions')
};
