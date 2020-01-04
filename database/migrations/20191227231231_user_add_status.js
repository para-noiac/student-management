
exports.up = function(knex) {
   return knex.schema.table('users', function (table) {
      table.enu('status', ['ACTIVE', 'SUSPENDED']).defaultTo('ACTIVE')
   })
};

exports.down = function(knex) {
   return knex.schema.table('users', function (table) {
      table.dropColumn('status')
   })
};
