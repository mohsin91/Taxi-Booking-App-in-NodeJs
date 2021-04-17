module.exports = function () {
  const review = 'Review'

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

  this.insertUserReview = (data, knex) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(review)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = false
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.insertProviderReview = (data, knex) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(review)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = false
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchUserAverageRating = (userId, knex) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(review)
        .avg('Rating as Rating')
        .where('UserId', userId)
        .where('ReviewedBy', 'provider')
        .then((result) => {
          if (result[0].Rating > 0) {
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

  this.fetchProviderAverageRating = (providerId, knex) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(review)
        .avg('Rating as Rating')
        .where('ProviderId', providerId)
        .where('ReviewedBy', 'user')
        .then((result) => {
          if (result[0].Rating > 0) {
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
  this.fetchRatingDetails = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(review)
        .select('*')
        .where(data.TypeId)
        .where(data.Type)
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
