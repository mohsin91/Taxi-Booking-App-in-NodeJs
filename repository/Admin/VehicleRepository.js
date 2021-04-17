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
  const country = 'Country'
  const vehiclebrand = 'VehicleBrand'
  const vehiclemodel = 'VehicleModel'
  // vehicle Brand Insert
  this.vehicleBrandAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclebrand)
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
  // vehicle model Insert
  this.vehicleModelAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclemodel)
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
  // vehicle brand List Count Select
  this.vehicleBrandPageViewListcount = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclebrand).count(`Id as count`)
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

  // vehicle brand Select countryname
  this.getVehicleBrandCountrySelectView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.raw(`select C.CountryName from ${country} as C where C.Id IN (${data})`)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result[0]
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
  // Vehicle Brand Page Select
  this.vehicleBrandPageView = (data) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclebrand)
        .select('*').orderBy('Id', 'asc').limit(limit).offset(offset)
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
  // get vehicle brand Select with country name
  this.getVehicleBrandViewCountryName = (CountryId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(country).select('CountryName')
        .whereIn('Id', CountryId)
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
  // Vehicle Brand Select
  this.vehicleBrandView = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclebrand)
        .select('Id', 'BrandName', 'CountryId').orderBy('Id', 'asc')
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
  // vehicle brand Select
  this.getVehicleBrandView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclebrand).select('*')
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
  // vehicle model Select
  this.getVehicleModelView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclemodel).select('*')
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
  // vehicle model List Count Select
  this.vehicleModelPageViewListcount = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclemodel).count(`Id as count`)
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
  // Vehicle Model Page Select
  this.vehicleModelPageView = (data) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex().select(knex.raw(`${vehiclemodel}.* ,${vehiclebrand}.BrandName`))
        .from(vehiclemodel)
        .leftJoin(vehiclebrand, `${vehiclebrand}.Id`, `${vehiclemodel}.VehicleBrandId`)
        .limit(limit).offset(offset)
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
  // Vehicle Model Select
  this.vehicleModelView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex().select(knex.raw(`${vehiclemodel}.* ,${vehiclebrand}.BrandName`))
        .from(vehiclemodel)
        .leftJoin(vehiclebrand, `${vehiclebrand}.Id`, `${vehiclemodel}.VehicleBrandId`)
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
  // vehicle Brand Update
  this.vehicleBrandEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclebrand)
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
  // vehicle Model Update
  this.vehicleModelEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclemodel)
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
  //
  // vehicle Model Update
  this.saveProvVehicle = (data) => {
    var output = {}
    data=data.data;
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex('providervehicle')
      .insert({ProviderId:data.ProviderId,VehicleBrandName:data.VehicleBrandName,VehicleModelName:data.VehicleModelName,RideVehicleTypeId:data.RideVehicleTypeId,VehicleNumber:data.VehicleNumber,Year:data.Year,Color:data.Color,VehicleSeats:data.VehicleSeats,CategoryId:data.CategoryId})
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

   // vehicle model Select according to brand
   this.getVehicleBrandModel = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(vehiclemodel).select('*')
        .where('VehicleBrandId', id)
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

  //ride vehicle type
  this.getRideType = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.select('*')
        .from('ridevehicletype')
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

  //vehicle Categories
  this.vehicleCategory = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.select('*')
        .from('vehiclecategories')
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
