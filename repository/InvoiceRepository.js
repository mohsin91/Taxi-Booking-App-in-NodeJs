module.exports = function () {
  const booking = 'Booking'
  const users = 'Users'

  require('dotenv').config()
  var config = {
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

  this.updateInvoiceMailBookingState = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .where(data.where)
        .update(data.data)
        .then((result) => {
          if (result > 0) {
            output.error = false
            output.result = result
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
  this.fetchBookingUserDetails = (userdata) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.raw(`select ${booking}.*, ${users}.FirstName, ${users}.LastName, ${users}.Image, ${users}.Email from
      ${booking} JOIN ${users} on ${users}.Id = ${booking}.UserId 
      WHERE ${booking}.Status = 'completed' AND ${booking}.EmailStatus = 'no'`)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result[0]
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
