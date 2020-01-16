
exports.seed = function(knex) {
  return knex('roles').del().then( async _ => 
    await knex('roles').insert([
      {id: 1, name: 'teacher'},
      {id: 2, name: 'student'},
    ])
  )
}
