const dotenv = require('dotenv');

if (process.env.NODE_ENV == "test") {
  dotenv.config({ path: ".env.test" });
} else if (process.env.NODE_ENV == "development") {
  dotenv.config({ path: ".env.development" })
}

// If using onine database
  

module.exports = {
  // development: {
  //   use_env_variable: process.env.DB_URL
  // },
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
