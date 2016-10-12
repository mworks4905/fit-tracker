exports.seed = function(knex) {
  return knex('day').del()
    .then(() => {
      return knex('day').insert([{
        user_id: 1,
        day_pts: 500,
        m_health: true,
        m_water: false,
        a_health: false,
        a_water: false,
        n_health: true,
        n_water: true,
        given_bonus_pts: false
      }]);
    });
};
