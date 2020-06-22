exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const recipes = [
    {
     //id: 1
      title: 'Bowl of Cereal',
      author: 'sample user'
    },
    {
      //id: 2
      title: 'Buttered Toast',
      author: 'sample user'
    }
  ];

  return knex("recipes")
    .insert(recipes)
    .then(() => console.log("\n== Seed data for recipes table added. ==\n"));
};