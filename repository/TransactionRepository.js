module.exports = function () {
  require('dotenv').config()

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

  const Knex = require('knex')
  var transaction = 'Transaction'

  this.insertTransaction = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)

      knex(transaction)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            output.result = result[0]
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateTransaction = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(transaction)
        .update(data)
        .where({ Id: data.Id })
        .then((result) => {
          if (result > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchTransaction = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(transaction)
        .where({ UserType: data.UserType, UserTypeId: data.UserTypeId })
        .orderBy('Id', 'desc')
        .then((result) => {
          if (result.length > 0) {
            output.result = result
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
}
