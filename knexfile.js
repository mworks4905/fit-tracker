'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/eyc_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/eyc_dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
