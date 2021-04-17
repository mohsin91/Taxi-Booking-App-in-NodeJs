module.exports = function (server, validator) {
  const basePath = '/api/booking/'
  require('../Utils/error')()
  require('../thirdParty/geoHelper')()
  require('../controller/BookingController')()

  setInterval(async () => {
    this.bookingHandler((result) => {
      this.ctrlHandler([result], result.error, 'default', (message) => {
        // console.log('Booking Service', message)
      })
    })
    this.reassignBookingCtrl(async (result) => {
      this.ctrlHandler([result], result.error, 'default', (message) => {
        // console.log('Reassign Booking', message)
      })
    })
  }, 10000)

  server.post(basePath + 'rideType', [
    validator.check('pickUpLatitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],pickup latitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],pickup latitude'),
    validator.check('pickUpLongitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],pickup longitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],pickup longitude'),
    validator.check('destinyLatitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],destination latitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],destination latitude'),
    validator.check('destinyLongitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],destination latitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],destination latitude'),
    validator.check('countryShortCode')
      .isLength({ min: 2, max: 2 }).withMessage('INVALID: $[1],country short code')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      this.getAvailabeRide(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'bookRide', [
    validator.check('pickUpLocation')
      .isLength({ min: 10, max: 255 }).withMessage('INVALID_ADDRESS: $[1] $[2] $[3],pickup,10,255'),
    validator.check('dropLocation')
      .isLength({ min: 10, max: 255 }).withMessage('INVALID_ADDRESS: $[1] $[2] $[3],drop,10,255'),
    validator.check('pickUpLatitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],pickup latitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],pickup latitude'),
    validator.check('pickUpLongitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],pickup longitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],pickup longitude'),
    validator.check('destinyLatitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],destination latitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],destination latitude'),
    validator.check('destinyLongitude')
      .isNumeric().withMessage('INVALID_LATLONG: $[1],destination longitude')
      .isLength({ min: 6, max: 12 }).withMessage('INVALID_LATLONG: $[1],destination longitude'),
    validator.check('rideType')
      .isLength({ min: 1, max: 10 }).withMessage('INVALID_RIDETYPE'),
    validator.check('paymentMode')
      .isIn(['wallet', 'cash', 'card']).withMessage('INVALID_PAYMENT_MODE'),
    validator.check('seats')
      .optional()
      .isNumeric().withMessage('INVALID: $[1],Seats count'),
    validator.check('isCouponApplied')
      .optional()
      .isIn(['yes', 'no']).withMessage('INVALID: $[1], coupon status'),
    validator.check('couponCode')
      .optional()
      .isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1], coupon code'),
    validator.check('discountRate')
      .optional()
      .isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1],discount rate'),
    validator.check('bookingType')
      .isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1],booking type'),
    validator.check('bookingTimestamp')
      .optional()
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1],booking time')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      this.bookRideCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'confirmBooking', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],Booking No'),
    validator.check('action')
      .isIn(['accept', 'reject']).withMessage('INVALID_FIELDNAME')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      this.providerBookingStatusCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'changeBookingStatus', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],Booking No.'),
    validator.check('action')
      .isIn(['DriverArrived', 'RideStarted', 'RideEnded', 'PaymentDone', 'Cancelled']).withMessage('INVALID_FIELDNAME')
  ], server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      this.providerBookingStatusCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'onGoingBooking', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      this.providerOngoingBookingCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.get(basePath + 'onGoingBookingStatus', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      this.providerOngoingBookingStatus(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
}
