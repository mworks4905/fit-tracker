exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.integer('tot_pts')
      .notNullable();
    table.integer('lvl')
      .notNullable();
    table.string('email', 255)
      .notNullable()
      .unique();
    table.specificType('hash', 'character(60)')
      .notNullable();
    table.text('accessToken')
      .unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
