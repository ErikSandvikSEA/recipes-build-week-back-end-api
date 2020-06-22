
exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const ingredientsList = [
    {
     //id: 1
    recipe_title: 'Bowl of Cereal',
    ingredient: 'Milk',
    quantity_and_units: '1 Cup'
    },
    {
      //id: 2
     recipe_title: 'Bowl of Cereal',
     ingredient: 'Cereal',
     quantity_and_units: '1 Bowl'
     },
     {
      //id: 4
     recipe_title: 'Buttered Toast',
     ingredient: 'Bread',
     quantity_and_units: '1 Slice'
     },
     {
      //id: 5
     recipe_title: 'Buttered Toast',
     ingredient: 'Butter',
     quantity_and_units: '1 Slice'
     },
  ];

  return knex("ingredients_list")
    .insert(ingredientsList)
    .then(() => console.log("\n== Seed data for ingredientsList table added. ==\n"));
};