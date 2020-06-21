const db = require('../data/db-config.js')

function find(tableName){
     return db(tableName)
}

function findById(tableName, id) {
     return db(tableName)
       .where({ id })
       .first();
   }

// async function getByIdWithDetail(id){
//      const resources = await db('project_line_items as li')
//           .where('li.project_id', id)
//           .join('resources', 'resources.id', '=', 'li.resource_id')
//           .select('resources.name', 'resources.description');

//      const project = await db('projects')
//           .where('projects.id', id)
//           .select('projects.id', 'projects.name', 'projects.description', 'projects.completed?')

//      return {
//           id,
//           name: project[0].name,
//           description: project[0].description,
//           resources
//      }
// }


function add(tableName, newEntity) {
     return db(tableName)
       .insert(newEntity)
       .then(([id]) => findById(tableName, id))
   }

module.exports = {
     find,
     add,
     findById,
     // getByIdWithDetail
}