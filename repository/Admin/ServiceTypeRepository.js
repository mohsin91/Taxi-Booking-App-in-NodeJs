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
  const state = 'State'
  const city = 'Cities'
  const language = 'Language'
  const ridetype = 'RideType'
  const staticpages = 'StaticPages'
  const ridetypelang = 'RideTypeLanguage'
  const ridevehicletype = 'RideVehicleType'
  const cancellationpolicy = 'CancellationPolicy'
  // Ride Type Insert
  this.adminRideTypeInsert = (data) => {

  }
  // Ride Category Insert
  this.adminRideCategoryInsert = (data) => {

  }
  // Tax Details Insert
  this.adminTaxDetailInsert = (data) => {

  }
  // Static Pages Insert
  this.staticPagesAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpages)
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
  // Ride Type Insert
  this.rideTypeAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridetype)
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
  // Ride Type Language Insert
  this.rideTypeLanguageAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridetypelang)
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
  // Ride Vehicle Type Insert
  this.rideVehicleTypeAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridevehicletype)
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
  // Cancellation Policy Insert
  this.cancellationPolicyAdd = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(cancellationpolicy)
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
  // Ride Type Select
  this.adminRideTypeSelect = (data) => {
  }
  // Ride Category Select
  this.adminRideCategorySelect = (data) => {
  }
  // Tax Details Select
  this.adminTaxDetailSelect = (data) => {
  }
  // Static Pages Select
  this.staticPagesListView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpages)
        .select()
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
  // staticPages List Count Select
  this.staticPagesSelectViewCount = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpages).count(`Id as count`)
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
  // staticPagesSelectView Page Select
  this.staticPagesSelectView = (data) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpages).select()
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
  // Ride Type Select
  this.rideTypeView = (data) => {
    var output = {}
    var finalData = []
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridetype)
        .select()
        .then((result) => {
          result.forEach((i, iindex) => {
            var C_ID = i.CountryId.toString()
            knex.raw(`select C.CountryName from ${country} as C 
                           where C.Id IN (${C_ID})`)
              .then((final) => {
                finalData.push({
                  Id: i.Id,
                  Name: i.Name,
                  Description: i.Description,
                  CountryId: final[0]
                })
                if (--result.length === 0) {
                  if (finalData.length) {
                    output.error = false
                    output.data = finalData
                  } else {
                    output.error = true
                  }
                  resolve(output)
                }
              })
          })
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
  // Ride Type Language Select
  this.rideTypeLanguageView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.raw(`select R.*,L.Name as LanguageName,
                      L.ShortCode from ${ridetypelang} as R 
                      JOIN ${language} as L on L.Id = R.LanguageId`)
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
  // State Select View
  this.stateSelectView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.raw(`select S.Id,S.StateName from ${state} as S
      JOIN ${country} as C on C.Id = S.CountryId
      where S.Id IN (${data})`)
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
  // City Select View
  this.citySelectView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.raw(`select C.CityName from ${city} as C
        JOIN ${state} as S on S.Id = C.StateId
        where C.Id IN (${data})`)
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
  // ride vehicle List Count Select
  this.rideVehicleViewCount = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridevehicletype).count(`Id as count`)
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
  // Ride Vehicle Type Select
  this.rideVehicleTypeView = (data) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridevehicletype).select(knex.raw(`RideVehicleType.*,Country.CountryName`))
        .leftJoin(`Country`, `Country.Id`, `RideVehicleType.CountryId`)
        .limit(limit).offset(offset)
        .orderBy(`RideVehicleType.Id`, `asc`)
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
  // get ridevehicle type view Select
  this.getrideVehicleTypeView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridevehicletype).select(knex.raw(`RideVehicleType.*,Country.CountryName`))
        .leftJoin(`Country`, `Country.Id`, `RideVehicleType.CountryId`)
        .where('RideVehicleType.Id', id)
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
  // Cancellation Policy Select
  this.cancellationPolicyView = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(cancellationpolicy)
        .select()
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
  // cancellationPolicy List Count Select
  this.cancellationPolicyPageViewCount = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(cancellationpolicy).count(`Id as count`)
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
  // cancellationpolicy Page Select
  this.cancellationPolicyPageView = (data) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(cancellationpolicy).select()
        .where('UserType', data.type)
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
  // CancellationPolicy Select
  this.getCancellationPolicyView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(cancellationpolicy).select('*')
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
  // Static Pages Select
  this.getStaticPagesView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpages).select('*')
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
  // Ride Category Update
  this.adminRideCategoryUpdate = (data) => {
  }
  // Tax Details Update
  this.adminTaxDetailUpdate = (data) => {
  }
  // Static Pages Update
  this.staticPagesEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpages)
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
  // cancellation Policy Update
  this.cancellationPolicyEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(cancellationpolicy)
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
  // Ride Type Update
  this.rideTypeEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridetype)
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
  // Ride Type Language Update
  this.rideTypeLanguageEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridetypelang)
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
  // Ride Vehicle Type Update
  this.rideVehicleTypeEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridevehicletype)
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
  // Ride Vehicle Type Status Update
  this.rideVehicleTypeStatusEdit = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridevehicletype)
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
  // get manual taxi booking ridevehicle type view Select
  this.rideManualBookingVehicleTypeView = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(ridevehicletype).select(knex.raw(`RideVehicleType.*,Country.CountryName`))
        .leftJoin(`Country`, `Country.Id`, `RideVehicleType.CountryId`)
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
  // Ride Type Delete
  this.adminRideTypeDelete = (data) => {
  }
  // Ride Category Delete
  this.adminRideCategoryDelete = (data) => {
  }
  // Tax Details Delete
  this.adminTaxDetailDelete = (data) => {
  }
  // Static Pages Delete
  this.adminStaticPageDelete = (data) => {
  }
}
