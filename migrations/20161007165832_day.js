exports.up = function(knex) {
  return knex.schema.createTable('day', (table) => {
    table.increments();
    table.integer('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .notNullable()
      .index();
    table.string('tod')
      .notNullable();
    table.integer('day_pts')
      .notNullable();
    table.boolean('m_health')
      .notNullable();
    table.boolean('m_water')
      .notNullable();
    table.boolean('a_health')
      .notNullable();
    table.boolean('a_water')
      .notNullable();
    table.boolean('n_health')
      .notNullable();
    table.boolean('n_water')
      .notNullable();
    table.boolean('choice')
      .notNullable();
    table.boolean('given_bonus_pts')
      .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('day');
};
