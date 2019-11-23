/* Add Email Column */
exports.up = knex => {
   return knex.schema
      .table('users', function (table) {
         table.dropForeign('parent_id');
         table.dropColumn('parent_id')
      }).createTable('users_users', function(table) {
         table.increments('id').primary()
         table.integer('parent_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .index()
         table.integer('child_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .index()
      })
}

exports.down = knex => {
   return knex.schema
      .dropTableIfExists('users_users')
      .table('users', function (table) {
         table.integer('parent_id').unsigned()
         table.foreign('parent_id').references('users.id')
      })
}