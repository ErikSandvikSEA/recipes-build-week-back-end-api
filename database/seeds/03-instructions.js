
exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const instructions = [
    {
     //id: 1
      step: '1',
      instruction_description: 'Pour cereal into bowl',
      recipe_title: 'Bowl of Cereal'
    },
    {
      //id: 2
      step: '2',
      instruction_description: 'Pour milk into bowl',
      recipe_title: 'Bowl of Cereal'
    },
    {
      //id: 3
      step: '1',
      instruction_description: 'Toast bread',
      recipe_title: 'Buttered Toast'
    },
    {
      //id: 4
      step: '2',
      instruction_description: 'Spread butter on toast',
      recipe_title: 'Buttered Toast'
    }
  ];

  return knex("instructions")
    .insert(instructions)
    .then(() => console.log("\n== Seed data for instructions table added. ==\n"));
};