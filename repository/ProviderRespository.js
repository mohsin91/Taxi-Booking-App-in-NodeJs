module.exports = function () {
  const provider = 'Provider'
  const providerOtp = 'ProviderOtp'
  const provideLocationUpdate = 'ProviderLocationUpdate'
  const cancelpolicy = 'CancellationPolicy'
  const staticpage = 'StaticPages'
  const documentType = 'DocumentType'
  const providerDocuments = 'ProviderDocuments'
  const booking = 'Booking'
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

  this.fetchProviderDetailsById = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where({ Id: providerId })
        .select()
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

  this.fetchProvider = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
            output.result = result
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

  this.addProviderOtp = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerOtp)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            output.error = false
            resolve(output)
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

  this.delProviderOtp = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerOtp)
        .where(data)
        .delete()
        .then((result) => {
          if (result > 0) {
            output.error = false
            resolve(output)
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

  this.updateProviderOtpState = (data, status) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerOtp)
        .update({ Status: status })
        .where(data)
        .then((result) => {
          if (result) {
            output.error = false
            resolve(output)
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

  this.getProviderOtpState = (data, condition) => {
    return new Promise(function (resolve) {
      var output = {}
      var knex = new Knex(config)
      knex(providerOtp)
        .where(data)
        .where(condition)
        .then((result) => {
          output.count = result.length
          output.result = result
          if (result.length === 1) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.count = 0
          err.error = true
          err.result = null
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.addProvider = (data) => {
    return new Promise(function (resolve) {
      var output = {}
      var knex = new Knex(config)
      knex(provider)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            output.error = false
            output.message = 'success'
            output.result = result[0]
          } else {
            output.error = true
            output.message = 'fail'
            output.result = null
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.message = err.sqlMessage
          err.result = null
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProviderDetails = (data) => {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      var output = {}
      knex(provider)
        .update(data)
        .where({ Mobile: data.Mobile, ExtCode: data.ExtCode })
        .then((result) => {
          if (result) {
            output.error = false
            output.result = result
            resolve(output)
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

  this.updateProviderLocationById = (data, providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.transaction((t) => {
        return knex(provider)
          .transacting(t)
          .update(data)
          .where({ Id: providerId, IsActive: 'yes' })
          .then(() => {
            return knex(provideLocationUpdate)
              .where({ ProviderId: providerId })
              .update(data)
          })
          .then(t.commit)
          .catch((e) => {
            t.rollback()
            throw e
          })
      })
        .then((result) => {
          output.error = false
          output.result = result
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

  this.addProviderActiveLocation = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provideLocationUpdate)
        .insert({ ProviderId: providerId })
        .where({ ProviderId: providerId })
        .then((result) => {
          if (result[0] > 0) {
            output.error = true
            output.result = result
          } else {
            output.error = false
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

  this.fetchProviderDocList = (docType) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(documentType)
        .where('ApplicableTo', docType)
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
          err.error = false
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProivderFCMToken = (data, userId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where({ Id: userId })
        .update(data)
        .then((result) => {
          if (result === 1) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((err) => {
          err.error = true
          err.result = null
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderCancelPolicyList = (type) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(cancelpolicy)
        .select()
        .where(type)
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
  this.fetchProviderStaticPageList = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpage)
        .select()
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

  this.fetchProviderByCellId = (data, blockList) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provideLocationUpdate)
        .where(data)
        .whereNotIn('ProviderId', blockList)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((err) => {
          err.error = true
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProviderLocationStatus = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provideLocationUpdate)
        .update(data)
        .where('ProviderId', data.ProviderId)
        .then((result) => {
          if (result > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        }).catch((err) => {
          err.error = true
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProviderDetailsUsingId = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where({ Id: data.Id })
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
  ////ADD Price per KM
  this.addPricePerKms = (data) => {
    var output = {}
    var dbData = {}
    dbData.File = data.documentUrl;
    dbData.pricePerKm = data.price;
    dbData.ProviderId = data.providerId;
    dbData.DocumentTypeId = enums.DocumentTypes.vehicleType;
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex('providervehicledocument')
        .insert(dbData)
        .then((result) => {
          if (result[0] > 0) {
            response.error = false
            response.result = result[0]
          } else {
            response.error = true
          }
          resolve(response)
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

  this.fetchProviderStaticPageView = (id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpage)
        .select()
        .where(id)
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

  this.deleteProviderLocationUpdate = (Id) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provideLocationUpdate)
        .where({ ProviderId: Id })
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
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateProviderRating = (providerId, rating) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .update('Rating', rating)
        .where('Id', providerId)
        .then((result) => {
          output.error = false
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

  this.updateVehilceDetails = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .update(data)
        .where('Id', data.Id)
        .then((result) => {
          if (result > 0) {
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

  this.updateProviderDocument = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)

      knex.transaction((t) => {
        return knex(providerDocuments)
          .transacting(t)
          .where({ ProviderId: data.ProviderId, DocTypeId: data.DocTypeId })
          .then((doc) => {
            if (doc.length > 0) {
              return knex(providerDocuments)
                .update(data)
                .where({ ProviderId: data.ProviderId, DocTypeId: data.DocTypeId })
            } else {
              return knex(providerDocuments)
                .insert(data)
            }
          })
          .then((result) => {
            output.error = false
            resolve(output)
          })
          .catch((e) => {
            t.rollback()
            throw e
          })
      })
        .then((result) => {
          output.error = false
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
    })
  }

  this.fetchProviderDocumentExist = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(providerDocuments)
        .select('DocTypeId', 'Status')
        .where({ ProviderId: providerId })
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.providerUpdateLang = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .update(data.update)
        .where(data.where)
        .then((result) => {
          if (result) {
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
  // get provider total earnings of a month
  this.getProviderBookingStacksData = (providerId, year) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.raw(`SELECT MONTH(CreateAt ) as month , YEAR(CreateAt ) AS year, COUNT(Id) AS count , SUM(ProviderEarning ) AS total FROM ${booking} WHERE ProviderId = ${providerId} AND status = 'completed' AND YEAR(CreateAt) = ${year} GROUP BY MONTH(CreateAt) , YEAR(CreateAt)`)
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

  this.updateTripCount = (providerId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(provider)
        .where('Id', providerId)
        .update({ TripCount: knex.raw('?? + ?', ['TripCount', 1]) })
        .then((result) => {
          if (result) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
}
