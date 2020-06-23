
const bcryptjs = require('bcryptjs')
const rounds = 8

const samplePassword = bcryptjs.hashSync('samplePassword', rounds)


exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: 'sample user',
      email: 'sample@user.com',
      password: samplePassword
    }
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};