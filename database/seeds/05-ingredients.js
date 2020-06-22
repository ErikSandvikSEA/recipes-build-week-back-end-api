
exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const ingredients = [
    {
     //id: 1
    name: 'Milk'
    },
    {
      //id: 2
    name: 'Cereal'
    },
    {
      //id: 3
    name: 'Bread'
    },
    {
      //id: 4
    name: 'Butter'
    }
  ];

  return knex("ingredients")
    .insert(ingredients)
    .then(() => console.log("\n== Seed data for ingredients table added. ==\n"));
};