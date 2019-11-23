exports.up = knex => {
    return knex.schema
      .createTable('users', table => {
        table.increments('id').primary();
        table.string('first_name')
        table.string('last_name')
      })
      .createTable('roles', table => {
        table.increments('id').primary();
        table.string('name').unique()
      })
      .createTable('users_roles', table => {
        table.increments('id').primary();
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .index()
        table
          .integer('role_id')
          .unsigned()
          .references('id')
          .inTable('roles')
          .onDelete('CASCADE')
          .index()
      })
  }
  
  exports.down = knex => {
    return knex.schema
      .dropTableIfExists('users_roles')
      .dropTableIfExists('roles')
      .dropTableIfExists('users')
  }