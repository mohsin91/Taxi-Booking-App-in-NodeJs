module.exports = function () {
  var providerLocationUpdate = 'ProviderLocationUpdate'

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

  this.fetchProviderLocationByS2 = (data) => {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerLocationUpdate)
        .select('ProviderId as providerId', 'Latitude as latitude', 'Longitude as longitude', 'Bearing as bearing', 'RideTypeId as rideTypeId')
        .where(data)
        .then((result) => {
          var output = {}
          output.count = result.length
          if (output.count) {
            output.error = false
            output.result = result
            output.message = 'success'
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.result = err.sqlMessage
          err.message = 'catch'
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.stimulateProviderLocation = () => {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerLocationUpdate)
        .update({ Latitude: knex.raw('CASE WHEN Latitude BETWEEN 13.052 AND 13.054 THEN Latitude + ROUND(RAND() * .00011, 6) ELSE 13.052500 END'), Longitude: knex.raw('CASE WHEN Longitude BETWEEN 80.24 AND 80.26 THEN Longitude + ROUND(RAND() * .00011, 6) ELSE 80.240000 END'), Bearing: knex.raw('CASE WHEN Bearing BETWEEN 0 AND 351 THEN Bearing + FLOOR(RAND() * 10) ELSE 0 END') })
        .then((result) => {
          resolve(false)
        })
        .catch((err) => {
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.getProviderLocation = (data) => {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      var output = {}
      knex(providerLocationUpdate)
        .select('ProviderId as providerId', 'Latitude as latitude', 'Longitude as longitude', 'Bearing as bearing', 'RideTypeId as rideTypeId')
        .where(data)
        .orderByRaw('RAND()')
        .limit(1)
        .then((result) => {
          output.count = result.length
          output.result = result
          if (result.length > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.result = null
          err.count = 0
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.getActiveProvider = (data, knex) => {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      var output = {}
      knex(providerLocationUpdate)
        .where(data)
        .then((result) => {
          output.count = result.length
          output.result = result
          if (result.length > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.result = null
          err.count = 0
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
}
