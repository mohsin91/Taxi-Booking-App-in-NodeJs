module.exports = function () {
  require('../../repository/Admin/VehicleRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.vehicleBrandAddService = async (data, callback) => {
    var response = {}
    try {
      var vehicledata = {
        BrandName: data.BrandName,
        CountryId: data.CountryId
      }
      var vehicleBrandIData = await this.vehicleBrandAdd(vehicledata)
      if (vehicleBrandIData.error === false) {
        response.error = false
        response.data = vehicleBrandIData.data[0]
        response.msg = 'VALID'
      } else if (vehicleBrandIData.errno === 1062) {
        response.error = true
        response.msg = 'EXIST: $[1],Brand Name'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.vehicleBrandViewService = async (callback) => {
    var response = {}
    try {
      var data = []
      var vehicleBrandSData = await this.vehicleBrandView()
      if (vehicleBrandSData.error === false) {
        vehicleBrandSData.data.forEach(async (i, iindex) => {
          var d = []
          var countryname = await this.getVehicleBrandViewCountryName(vehicleBrandSData.data[iindex].CountryId)
          countryname.data.forEach((j, jindex) => {
            d.push(j.CountryName)
          })
          data.push({
            Id: i.Id,
            BrandName: i.BrandName,
            CountryName: d
          })
          if (--vehicleBrandSData.data.length === 0) {
            if (data.length) {
              response.error = false
              response.data = data
              response.msg = 'VALID'
              callback(response)
            } else {
              response.error = true
              response.msg = 'FAILED'
              callback(response)
            }
          }
        })
      } else {
        response.error = true
        response.msg = 'FAILED'
        callback(response)
      }
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  //vehicle Categories

  this.vehicleCategoriesService = async (callback) => {
    var response = {}
    try {
      var data = []
      var vehicleCategories = await this.vehicleCategory()
      if (vehicleCategories.error === false) {
        response.error = false
        response.data = vehicleCategories.data
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  //
  this.vehicleBrandPageViewService = async (data, callback) => {
    var response = {}
    try {
      var result = []
      var resdata = []
      var vehiclebrandcount = await this.vehicleBrandPageViewListcount()
      var vehicleBrandPSelectSData = await this.vehicleBrandPageView(data)
      if (vehicleBrandPSelectSData.error === false && vehiclebrandcount.error === false) {
        vehicleBrandPSelectSData.data.map(async (i, iindex) => {
          var d = []
          var countryid = i.CountryId.toString()
          var vehicleBrandCountryname = await this.getVehicleBrandCountrySelectView(countryid)
          vehicleBrandCountryname.data.map((j, jindex) => {
            d.push(j.CountryName)
          })
          resdata.push({
            Id: i.Id,
            BrandName: i.BrandName,
            CountryName: d
          })
          if (--vehicleBrandPSelectSData.data.length === 0) {
            result.push({
              data: resdata.sort(function (a, b) {
                return a.Id - b.Id
              }),
              Count: vehiclebrandcount.data[0].count
            })
            response.error = false
            response.data = result
            response.msg = 'VALID'
            callback(response)
          }
        })
      } else {
        response.error = true
        response.msg = 'FAILED'
        callback(response)
      }
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.getVehicleBrandViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGBrandData = await this.getVehicleBrandView(data)
      if (adminGBrandData.error === false) {
        response.error = false
        response.data = adminGBrandData.data[0]
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.vehicleBrandEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        BrandName: data.BrandName,
        CountryId: data.CountryId
      }
      result.where = { Id: data.Id }
      var vehicleBrandUData = await this.vehicleBrandEdit(result)
      if (vehicleBrandUData.error === false) {
        response.error = false
        response.data = vehicleBrandUData.data
        response.msg = 'VALID'
      } else if (vehicleBrandUData.errno === 1062) {
        response.error = true
        response.msg = 'EXIST: $[1],Brand Name'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.vehicleModelAddService = async (data, callback) => {
    var response = {}
    try {
      var vehicledata = {
        VehicleBrandId: data.VehicleBrandId,
        ModelName: data.ModelName,
        VehicleType: data.VehicleType,
        PowerBy: data.PowerBy
      }
      var vehicleModelIData = await this.vehicleModelAdd(vehicledata)
      if (vehicleModelIData.error === false) {
        response.error = false
        response.data = vehicleModelIData.data[0]
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.vehicleModelPageViewService = async (data, callback) => {
    var response = {}
    try {
      var result = []
      var vehiclemodelcount = await this.vehicleModelPageViewListcount()
      var vehicleModelPSelectSData = await this.vehicleModelPageView(data)
      if (vehicleModelPSelectSData.error === false && vehiclemodelcount.error === false) {
        result.push({
          data: vehicleModelPSelectSData.data.sort(function (a, b) {
            return a.Id - b.Id
          }),
          Count: vehiclemodelcount.data[0].count
        })
        response.error = false
        response.data = result
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.vehicleModelViewService = async (callback) => {
    var response = {}
    try {
      var vehicleModelSData = await this.vehicleModelView()
      if (vehicleModelSData.error === false) {
        response.error = false
        response.data = vehicleModelSData.data
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.getVehicleModelViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGModelData = await this.getVehicleModelView(data)
      if (adminGModelData.error === false) {
        response.error = false
        response.data = adminGModelData.data[0]
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  //
  this.getVehicleBrandModelService = async (data, callback) => {
    var response = {}
    try {
      var adminGModelData = await this.getVehicleBrandModel(data)
      if (adminGModelData.error === false) {
        response.error = false
        response.data = adminGModelData.data;
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  //
  
  //
  this.getRideTypeService = async ( callback) => {
    var response = {}
    try {
      var adminGModelData = await this.getRideType()
      if (adminGModelData.error === false) {
        response.error = false
        response.data = adminGModelData.data;
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  //
  this.vehicleModelEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        VehicleBrandId: data.VehicleBrandId,
        ModelName: data.ModelName,
        VehicleType: data.VehicleType,
        PowerBy: data.PowerBy
      }
      result.where = { Id: data.Id }
      var vehicleModelUData = await this.vehicleModelEdit(result)
      if (vehicleModelUData.error === false) {
        response.error = false
        response.data = vehicleModelUData.data
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  //
  this.saveProviderVehicleService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        ProviderId: data.Id,
        VehicleBrandName: data.Brand,
        VehicleModelName: data.Model,
        RideVehicleTypeId: data.Service_Type,
        VehicleNumber:data.Car_Number,
        Year:data.year,
        Color:data.Color,
        VehicleSeats:data.Seats,
        CategoryId:data.CategoryId
      }
      //result.where = { Id: data.Id }
      var vehicleModelUData = await this.saveProvVehicle(result)
      if (vehicleModelUData.error === false) {
        response.error = false
        response.data = vehicleModelUData.data
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}
