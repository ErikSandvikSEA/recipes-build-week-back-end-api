
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
      .createTable('recipes', tbl => {
        tbl.increments()
        tbl.string('title').notNullable().index()
        tbl.string('author').references('users.name').onDelete('RESTRICT').onUpdate('CASCADE')
      })
      //--------------instructions--------------//
      .createTable('instructions', tbl => {
        tbl.increments()
        tbl.string('instruction_description', 256).notNullable().index()
        tbl
          .string('recipe_title')
          .references('recipes.name')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE')
      })
      //--------------ingredients--------------//
      .createTable('ingredients', tbl => {
        tbl.increments()
        tbl.string('name')
      })
      //--------------recipe line items--------------//
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
};
