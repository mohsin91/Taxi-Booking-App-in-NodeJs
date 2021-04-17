module.exports = function () {
  require('../services/ProviderVehicleService')()

  this.getVehicleBrandCtrl = (callback) => {
    var response = {}
    this.getVehicleBrandService((result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.getVehicleModelCtrl = (req, callback) => {
    var response = {}
    var data = req
    var brandId = data.brandId
    this.getVehicleModelService(brandId, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.setProviderVehicleActiveCtrl = (req, callback) => {
    var response = {}
    var data = req
    var providerId = data.auth.Id
    this.setProviderVehicleActiveService(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        this.getProviderVehicleDetailsService(data, (result) => {
          var vehicle = {}
          vehicle.Id = providerId
          vehicle.vehicleBrand = result.data.brandName
          vehicle.vehicleModel = result.data.modelName
          vehicle.vehicleNumber = result.data.noPlate
          this.changeProviderActiveVehicle(vehicle)
        })
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.removeProviderVehicleCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.removeProviderVehicleService(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }
}
