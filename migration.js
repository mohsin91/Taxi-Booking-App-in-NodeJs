var mysql = require('mysql2')
var migration = require('mysql-migrations')
var path = require('path')
require('dotenv').config()
var connection = mysql.createPool({
  connectionLimit: process.env.DB_CONNTECTION_LIMT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})
migration.init(connection, path.join(__dirname, 'migrations'))
