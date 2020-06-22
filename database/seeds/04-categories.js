exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const categories = [
    {
     //id: 1
    category: 'Breakfast'
    },
    {
      //id: 2
    category: 'Lunch'
    }
  ];

  return knex("categories")
    .insert(categories)
    .then(() => console.log("\n== Seed data for categories table added. ==\n"));
};