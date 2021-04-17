module.exports = function () {
  require('dotenv').config()
  require('../repository/ProviderVehicleRepository')()

  this.getVehicleBrandService = async (callback) => {
    var response = {}
    try {
      var vehicleBrand = await this.fetchVehicleBrand()
      if (vehicleBrand.error) {
        response.error = true
        response.msg = 'NO_VEHICLE_BRAND'
      } else {
        response.error = false
        response.data = vehicleBrand.result
        response.msg = 'VALID'
      }
      callback(response)
    } catch (err) {
      err.error = false
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getVehicleModelService = async (brandId, callback) => {
    var response = {}
    try {
      var vehicleBrand = await this.fetchVehicleModel(brandId)
      if (vehicleBrand.error) {
        response.error = true
        response.msg = 'NO_VEHICLE_MODEL'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = vehicleBrand.result
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.addProviderVechicleService = async (data, callback) => {
    var response = {}
    try {
      var vehicle = {}
      vehicle.ProviderId = data.auth.Id
      vehicle.VehicleImage = data.imageUrl
      vehicle.VehicleBrandName = data.vehicleBrand
      vehicle.VehicleModelName = data.vehicleModel
      vehicle.RideVehicleTypeId = data.serviceType
      vehicle.VehicleNumber = data.noPlate
      vehicle.Year = data.year
      vehicle.Color = data.color
      vehicle.Status = 'pending'
      vehicle.IsActive = 'no'
      var create = await this.addVehicle(vehicle)
      if (create.error) {
        response.error = true
        response.msg = 'ERROR_ADD_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VEHICLE_ADDED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderVehicleListService = async (ProviderId, callback) => {
    var response = {}
    try {
      var vehicles = await this.fetchProviderVehicle(ProviderId)
      if (vehicles.error) {
        response.error = true
        response.msg = 'NO_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = vehicles.result
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderVehicleDetailsService = async (data, callback) => {
    var response = {}
    try {
      var vehicleId = data.vehicleId
      var providerId = data.auth.Id
      var vehicle = await this.fetchProviderVehicleDetails(providerId, vehicleId)
      if (vehicle.error) {
        response.error = true
        response.msg = 'NO_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = vehicle.result
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.editProviderVehicleSerivce = async (data, callback) => {
    var response = {}
    try {
      var vehicle = {}
      vehicle.Id = data.vehicleId
      vehicle.ProviderId = data.auth.Id
      vehicle.VehicleImage = data.imageUrl
      vehicle.VehicleBrandName = data.vehicleBrand
      vehicle.VehicleModelName = data.vehicleModel
      vehicle.RideVehicleTypeId = data.serviceType
      vehicle.VehicleNumber = data.noPlate
      vehicle.Year = data.year
      vehicle.Color = data.color
      vehicle.Status = 'pending'
      vehicle.IsActive = 'no'

      var edit = await this.updateProviderVehicleDetails(vehicle)

      if (edit.error) {
        response.error = true
        response.msg = 'ERROR_ADD_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VEHICLE_UPDATE'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.setProviderVehicleActiveService = async (data, callback) => {
    var response = {}
    try {
      var vehicleId = data.vehicleId
      var providerId = data.auth.Id
      var status = await this.updateActiveVehicle(vehicleId, providerId)
      if (status.error) {
        response.error = true
        response.msg = 'NO_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VEHICLE_ACTIVE'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.removeProviderVehicleService = async (data, callback) => {
    var response = {}
    try {
      var condition = {}
      condition.Id = data.vehicleId
      condition.ProviderId = data.auth.Id
      var vehilce = await this.deleteVehicle(condition)
      if (vehilce.error) {
        response.error = true
        response.msg = 'NO_VEHICLE'
      } else {
        response.error = false
        response.msg = 'VEHICLE_DELETED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      callback(err)
    }
  }

  this.getProivderActiveVehicleDetails = (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var vehicle = await this.fetchActiveVehilce(providerId)
        if (vehicle.error) {
          response.error = true
          response.msg = 'NO_VEHICLE'
        } else {
          response.error = false
          response.msg = 'VALID'
          response.data = vehicle.result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
}
