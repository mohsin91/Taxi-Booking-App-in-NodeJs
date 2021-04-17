module.exports = function () {
  require('dotenv').config()
  // const config = {
  //   client: 'mysql2',
  //   connection: {
  //     host: '127.0.0.1',
  //     port: '3306',
  //     user: 'root',
  //     password: 'Pyra@db',
  //     database: 'taxi'
  //   },
  //   pool: {
  //     min: Number(2),
  //     max: Number(50),
  //     propagateCreateError: false
  //   },
  //   acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
  // }
  const config = {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    pool: {
      min: Number(process.env.DB_POOL_MIN),
      max: Number(process.env.DB_POOL_MAX)
    },
    acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
  }
  var Knex = require('knex')
  const admin = 'Admin'

  this.fetchadminDetails = (adminData) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(admin)
        .select('*')
        .where(adminData)
        .then((result) => {
          if (result.length === 1) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
  this.adminVerifyJwtToken = (admindata) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(admindata.role)
        .select('*')
        .where(admindata.where)
        .then((result) => {
          if (result.length === 1) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
}
