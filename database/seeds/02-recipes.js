exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const recipes = [
    {
     //id: 1
      title: 'Bowl of Cereal',
      category: 'Breakfast',
      instructions: '1.) Get ingredients. 2.) Pour cereal into bowl. 3.) Pour milk over cereal',
      ingredients: '1.) Milk, 2.) Cereal',
      user_id: 1,
      user: 'sample user'
    },
    {
      //id: 2
      title: 'Buttered Toast',
      category: 'Breakfast',
      instructions: '1.) Get ingredients. 2.) Put bread in toaster. 3.) Spread butter on toast',
      ingredients: '1.) Bread. 2.) Butter.',
      user: 'sample user',
      user_id: 1

    },
    {
      //id: 3
      title: 'Pop Tart',
      category: 'Breakfast',
      instructions: '1.) Get ingredients. 2.) Remove wrapper 3.) Put Pop Tart in toaster.',
      ingredients: '1.) Pop Tart',
      user: 'sample user',
      user_id: 1

    }
  ];

  return knex("recipesList")
    .insert(recipes)
    .then(() => console.log("\n== Seed data for recipes table added. ==\n"));
};