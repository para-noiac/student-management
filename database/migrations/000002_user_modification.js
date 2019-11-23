/* Add Email Column */
exports.up = knex => {
   return knex.schema.table('users', function (table) {
      table.string('email').unique()
      table.integer('parent_id').unsigned()
      table.foreign('parent_id').references('users.id')
   })
}

exports.down = knex => {
   return knex.schema.table('users', function (table) {
      table.dropForeign('parent_id');
      table.dropColumn('parent_id')
      table.dropColumn('email')
   })
}