module.exports = function (http) {
  const io = require('socket.io')(http)
  require('../controller/ProviderController')()
  require('../controller/UserController')()
  require('../Utils/error')()
  require('../Utils/common')()
  require('dotenv').config()

  // setInterval(() => {
  //   updateProivderLocationSimulation(() => {})
  // }, 1000)

  console.log('Socket IO connected successfully')

  io.use(async function (socket, next) {
    var response = {}
    if (socket.handshake.query && socket.handshake.query.token) {
      var auth = await getPayloadFromToken(socket.handshake.query.token, process.env.JWT_SECRET)
      if (auth.error) {
        response.error = true
        response.msg = 'Unauthorized'
        next(new Error(response))
      } else {
        socket.auth = auth
        next()
      }
    } else {
      response.error = true
      response.msg = 'Unauthorized'
      next(new Error(response))
    }
  })
    .on('connection', function (socket) {
      console.log(socket.id, socket.auth)
      if (socket.auth.data.UserType == 'Provider') {
        socket.join(socket.auth.data.Id + ":Provider:Booking");
        var aaaaa = io.sockets.adapter.rooms['6:Provider:Booking']
        console.log(aaaaa)
      }
      else {
        socket.join(socket.auth.data.Id + ":User:Booking");
      }

      socket.on('get_nearest_provider_location', function (data) {
        var socketId = socket.id
        var lang = data.lang ? data.lang : 'default'
        if ((data.latitude && data.longitude) || data.lang) {
          getNearestProviderLocation(data.latitude, data.longitude, (result) => {
            ctrlHandler([result], result.error, lang, (message) => {
              io.to(socketId).emit('get_nearest_provider_location', message)
            })
          })
        } else {
          var error = []
          var errMsg = {}
          errMsg.error = true
          if (!data.latitude) {
            errMsg.msg = 'INVALID_LATITUDE'
          } else if (!data.longitude) {
            errMsg.msg = 'INVALID_LONGITUDE'
          }
          error.push(errMsg)
          requestHandler([error], true, lang, (message) => {
            io.to(socketId).emit('get_nearest_provider_location', message)
          })
        }
      })

      socket.on('update_provider_location', function (data, callback) {
        var lang = data.lang ? data.lang : 'default';
        var distDur={};
        if ((data.latitude && data.longitude)) {
          data.auth = socket.auth.data;
          data.Id=socket.auth.data.Id;
          updateProviderLocationDub(data, (result) => {
            ctrlHandler([result], result.error, lang, (message) => {
              distDur.distance=message.data.Distance;
              distDur.duration=message.data.Duration;
              var response = {}
              var provider = {}
              provider.latitude = data.latitude
              provider.longitude = data.longitude
              provider.bearing = parseInt(data.bearing)
              provider.rideTypeId = 1
              provider.status = 'Will reach you in 10 mins'
              provider.distance=distDur.distance;
              provider.duration=distDur.duration;
              response.error = false
              response.data = provider
              // response.distance=distDur.distance;
              // response.duration=distDur.duration;
              io.to(data.bookingNo).emit('live_tracking', response)
              callback(message)
            })
          })

          if (typeof data.bookingNo === 'undefined' || data.bookingNo === null) {
            getUserLocationCellIdDub(data.latitude, data.longitude,data.Id, (result) => {
              var response = {}
              var rdata = {}
              var provider = {}
              var providerLocation = []

              provider.providerId = data.auth.Id
              provider.latitude = data.latitude
              provider.longitude = data.longitude
              provider.bearing = parseInt(data.bearing)
              provider.rideTypeId = 1
              providerLocation.push(provider)
              rdata.providerLocation = providerLocation
              response.data = rdata
              response.msg = 'You have provider location update'
              response.error = false
              response.distance=result.data.Distance;
              response.duration=result.data.Duration
              io.to(result.data.cellId).emit('get_nearest_provider_location', response)
            })
          } else {
            // var response = {}
            // var provider = {}
            // provider.latitude = data.latitude
            // provider.longitude = data.longitude
            // provider.bearing = parseInt(data.bearing)
            // provider.rideTypeId = 1
            // provider.status = 'Will reach you in 10 mins'
            // response.error = false
            // response.data = provider
            // response.distance=distDur.distance;
            // response.duration=distDur.duration;
            // io.to(data.bookingNo).emit('live_tracking', response)
          }
        } else {
          var error = []
          var errMsg = {}
          errMsg.error = true
          if (!data.latitude) {
            errMsg.msg = 'INVALID_LATITUDE'
          } else if (!data.longitude) {
            errMsg.msg = 'INVALID_LONGITUDE'
          }
          error.push(errMsg)
          requestHandler([error], true, lang, (message) => {
            callback(message)
          })
        }
      })

      socket.on('booking', function (data, callback) {
        // data.UserId
        // data
        // var token = data.headers['token'];
        //if (!token) callback({ auth: false, message: 'No token provided.' });
        var lang = data.lang ? data.lang : 'default'
        //const lang = data.headers.lang
        //const error = validator.validation(data)
        var body = data;
        //body.token = token;
        //body.auth = data.params.auth
        if (data.length == 0) {
          this.requestHandler(error.array(), true, lang, (message) => {
            callback(message)
          })
        } else {
          //is new order
          if (data.bookingId == undefined) {
            //new order
            orderRide(body, (result) => {
              ctrlHandler([result], result.error, lang, (message) => {
                io.to(result.data.providerId + ':Provider:Booking').emit(result.data.providerId + ':Provider:Booking', result)
                callback(message)
              })
            })
          }
          else {
            orderRide(body, (result) => {
              ctrlHandler([result], result.error, lang, (message) => {
                io.to(result.data.providerId + ':Provider:Booking').emit(result.data.providerId + ':Provider:Booking', result)
                // io.emit("")
                io.to(result.data.userId + ':User:Booking').emit(result.data.userId + ':User:Booking', result)
                callback(message)
              })
            })
          }
        }


        // socket.emit(objt)
      })


      // socket.emit("order", orderObj);
      socket.on('get_my_cellId', function (data, callback) {
        var response = {}
        var lang = data.lang ? data.lang : 'default'
        try {
          if ((data.latitude && data.longitude)) {
            getUserLocationCellId(data.latitude, data.longitude, (result) => {
              socket.join(result.data)
            })
            response.error = false
            response.msg = 'VALID'
          } else {
            response.error = true
            response.msg = 'NO_DATA'
          }
          ctrlHandler([response], response.error, lang, (message) => {
            callback(message)
          })
        } catch (err) {
          response.error = true
          response.msg = 'OOPS'
          ctrlHandler([response], response.error, lang, (message) => {
            callback(message)
          })
        }
      })

      socket.on('join_live_tracking', function (data, callback) {
        var response = {}
        var lang = data.lang || 'default'
        try {
          if (data.bookingNo) {
            response.error = false
            response.msg = 'SOCKET_TRACKING_ON'
            socket.join(data.bookingNo)
          } else {
            response.error = true
            response.msg = 'NO_DATA'
          }
        } catch (err) {
          response.error = true
          response.msg = 'OOPS'
        }
        ctrlHandler([response], response.error, lang, (message) => {
          callback(message)
        })
      })
    })
}
