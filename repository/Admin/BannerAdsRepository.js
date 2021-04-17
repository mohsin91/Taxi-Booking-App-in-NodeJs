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
  var Knex = require('knex')
  const bannerads = 'Banner'
  // admin Banner Ads
  // Insert
  this.bannerAdsAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(bannerads)
        .insert(data)
        .then((result) => {
          if (result.length) {
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
  // banner ads Page Select
  this.bannerAdsPageView = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(bannerads).select()
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = false
            output.data = result
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
  // banner ads Select
  this.getbannerAdsView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(bannerads).select('*')
        .where('Id', id)
        .then((result) => {
          if (result.length) {
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
  // Update
  this.bannerAdsEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(bannerads)
        .where(data.where)
        .update(data.data)
        .then((result) => {
          if (result) {
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
