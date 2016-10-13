exports.seed = function(knex) {
  return knex('day').del()
    .then(() => {
      return knex('day').insert([{
        user_id: 2,
        day_pts: 500,
        m_health: true,
        m_water: true,
        a_health: false,
        a_water: false,
        n_health: false,
        n_water: false,
        choice: false,
        tod: 'Morning',
        given_bonus_pts: true
      },
      {
        user_id: 3,
        day_pts: 0,
        m_health: false,
        m_water: false,
        a_health: false,
        a_water: false,
        n_health: false,
        n_water: false,
        choice: false,
        tod: 'Morning',
        given_bonus_pts: false
      },
      {
        user_id: 4,
        day_pts: 350,
        m_health: true,
        m_water: true,
        a_health: false,
        a_water: false,
        n_health: false,
        n_water: false,
        choice: false,
        tod: 'Morning',
        given_bonus_pts: false
      },
      {
        user_id: 5,
        day_pts: 5000,
        m_health: true,
        m_water: true,
        a_health: false,
        a_water: false,
        n_health: false,
        n_water: false,
        choice: false,
        tod: 'Morning',
        given_bonus_pts: true
      },
      {
        user_id: 6,
        day_pts: 0,
        m_health: false,
        m_water: false,
        a_health: false,
        a_water: false,
        n_health: false,
        n_water: false,
        choice: false,
        tod: 'Morning',
        given_bonus_pts: false
      }]);
    });
};
