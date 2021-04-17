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
  const booking = 'Booking'
  const providerloc = 'ProviderLocationUpdate'

  // Booking delete all data
  this.bookingAllDelete = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking).truncate()
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
  // bookings List Count Select
  this.bookingsSelectViewCount = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking).count(`Id as count`)
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
  // bookings SelectView Page Select
  this.bookingsSelectView = (data) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking).select()
        .limit(limit).offset(offset)
        .orderBy('Id', 'desc')
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
  // bookings Pages Select
  this.getBookingsView = (id) => {
    var output = {}

    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking).select(knex.raw(`${booking}.*,Users.FirstName as uFirstName,
      Users.LastName as uLastName,Users.Image as uImage,Users.Email as uEmail,CONCAT(Users.ExtCode, Users.Mobile) as uMobile,
      Provider.FirstName as pFirstName,Provider.LastName as pLastName,Provider.Image as pImage,
      Provider.Email as pEmail,CONCAT(Provider.ExtCode, Provider.Mobile) as pMobile,RideVehicleType.Name,
      Country.CountryName`))
        .leftJoin('Users', 'Users.Id', `${booking}.UserId`)
        .leftJoin('Provider', 'Provider.Id', `${booking}.ProviderId`)
        .leftJoin('RideVehicleType', 'RideVehicleType.Id', `${booking}.RideTypeId`)
        .leftJoin('Country', 'Country.Id', `${booking}.CountryId`)
        .where(`${booking}.Id`, id)
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
  // provider get bookings Pages Select
  this.getProviderLocationBookingsView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerloc).select(`ProviderId`, `S2CellId`, `Latitude`, `Longitude`, `Bearing`)
        .where(`ProviderId`, id)
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
}
