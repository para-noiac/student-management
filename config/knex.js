require('dotenv').config({path: '../.env'});

module.exports = {
  development: {
    client: process.env.DB_DIALECT,
    useNullAsDefault: true,
    connection: {
      host : process.env.DB_HOST || '127.0.0.1',
      user : process.env.DB_USER || 'root',
      password : process.env.DB_PASS || '',
      database : process.env.DB_NAME || 'example_db'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: '../database/migrations'
    }, 
    seeds: {
      directory: '../database/seeds'
    }
  }, 
  production: {
    client: process.env.DB_DIALECT,
    connection: {
      host : process.env.DB_HOST || '127.0.0.1',
      user : process.env.DB_USER || 'root',
      password : process.env.DB_PASS || '',
      database : process.env.DB_NAME || 'example_db'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
