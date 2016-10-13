exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        email: 'superuser@gmail.com',
        hash: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        lvl: 2,
        tot_pts: 50,
        is_admin: true
      },{
        email: 'jamesfreeman@gmail.com',
        hash: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        lvl: 1,
        tot_pts: 50,
        is_admin: false
      },
      {
        email: 'matthewbouchard@gmail.com',
        hash: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        lvl: 2,
        tot_pts: 500,
        is_admin: false
      },
      {
        email: 'elanakopelevich@gmail.com',
        hash: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        lvl: 2,
        tot_pts: 620,
        is_admin: false
      },
      {
        email: 'craigquincy@gmail.com',
        hash: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        lvl: 3,
        tot_pts: 1000,
        is_admin: false
      },
      {
        email: 'brendanhaskins@gmail.com',
        hash: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        lvl: 1,
        tot_pts: -500,
        is_admin: false
      }]);
    });
};
