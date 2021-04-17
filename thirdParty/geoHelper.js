module.exports = function () {
  require('dotenv').config()
  var whichCountry = require('which-country')
  const googleMapsClient = require('@google/maps').createClient({
    key: process.env.MAP_API_KEY,
    Promise: Promise
  })

  this.getDistanceInKM = async function (origin, destination) {
    var data = {}
    return new Promise(function (resolve) {
      googleMapsClient.distanceMatrix({
        origins: origin,
        destinations: [destination]
      }).asPromise()
        .then((distance) => {
          var result = distance.json
          var matrix = {}
          matrix.distance = result.rows[0].elements[0].distance.value
          matrix.distanceTxt = result.rows[0].elements[0].distance.text
          data.error = false
          data.msg = 'success'
          data.result = matrix
          resolve(data)
        })
        .catch((err) => {
          err.error = true
          err.msg = 'OOPS'
          resolve(err)
        })
    })
  }

  this.getProviderGeoMatrix = async function (origin, destination) {
    var data = {}
    return new Promise(function (resolve) {
      googleMapsClient.distanceMatrix({
        origins: origin,
        destinations: destination
      },
      function (err, distance) {
        try {
          if (err) {
            err.error = true
            err.msg = err.message
            err.result = null
            resolve(err)
          } else {
            var result = distance.json.rows[0].elements
            data.result = result.map(element => {
              var matrix = {}
              matrix.distance = element.distance.value
              matrix.duration = element.duration.value
              return matrix
            })
            data.error = false
            data.msg = 'success'
            resolve(data)
          }
        } catch (err) {
          err.error = true
          err.msg = err.message
          err.result = null
          resolve(err)
        }
      })
    })
  }

  this.getCountryShortCode = async function (lat, lng) {
    var shortCode = whichCountry([lng, lat])
    return shortCode
  }
}
