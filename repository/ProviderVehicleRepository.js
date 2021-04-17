module.exports = function () {
  const vehicleBrand = 'VehicleBrand'
  const vehicleModel = 'VehicleModel'
  const providerVehicle = 'ProviderVehicle'
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

  this.fetchVehicleBrand = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehicleBrand)
        .select('Id as id', 'BrandName as brandName')
        .then((result) => {
          if (result.length > 0) {
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

  this.fetchVehicleModel = (brandId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehicleModel)
        .select('Id as id', 'ModelName as modelName', knex.raw(`'1 - 5' as seats`))
        .where('VehicleBrandId', brandId)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.addVehicle = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerVehicle)
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
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderVehicle = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerVehicle)
        .select('Id as id', 'VehicleImage as vehicleImage', 'VehicleModelName as modelName', 'VehicleNumber as noPlate', 'Status as status')
        .where('ProviderId', providerId)
        .then((result) => {
          if (result.length > 0) {
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

  this.fetchProviderVehicleDetails = (providerId, vehicleId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerVehicle)
        .select('Id as id', 'VehicleImage as vehicleImage', 'VehicleBrandName as brandName', 'VehicleModelName as modelName', 'RideVehicleTypeId', knex.raw(`'1 - 5' as seats`), 'Color as color', 'Year as year', 'VehicleNumber as noPlate', 'Status as status')
        .where('ProviderId', providerId)
        .where('Id', vehicleId)
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

  this.updateProviderVehicleDetails = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerVehicle)
        .where('Id', data.Id)
        .where('ProviderId', data.ProviderId)
        .update(data)
        .then((result) => {
          if (result) {
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

  this.updateActiveVehicle = (vehicleId, providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerVehicle)
        .update('Status', 'active')
        .where('Id', vehicleId)
        .then((result) => {
          if (result > 0) {
            knex(providerVehicle)
              .update('Status', 'approved')
              .whereNot('Id', vehicleId)
              .where('ProviderId', providerId)
              .where('Status', 'active')
              .then(() => {
                output.error = false
                resolve(output)
              })
              .catch(() => {
                output.error = true
                resolve(output)
              })
          } else {
            output.error = true
            resolve(output)
          }
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

  this.deleteVehicle = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerVehicle)
        .where(data)
        .where('Status', 'approved')
        .delete()
        .then((result) => {
          if (result > 0) {
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

  this.fetchActiveVehilce = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerVehicle)
        .select('VehicleImage as vehicleImage', 'VehicleBrandName as brandName', 'VehicleModelName as modelName', 'VehicleNumber as noPlate')
        .where('ProviderId', providerId)
        .where('Status', 'active')
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
