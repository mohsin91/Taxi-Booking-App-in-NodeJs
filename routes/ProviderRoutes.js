module.exports = function (server, validator) {
  const basePath = '/api/provider/'
  require('../controller/ProviderController')()
  require('../controller/ProviderVehicleController')()
  require('../Utils/error')()
  require('../thirdParty/pushNotification')()

  const date = new Date()
  const year = date.getFullYear

  server.get(basePath + 'config', (request, response) => {
    this.providerAppSetting((result) => {
      const lang = request.headers.lang
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })
  server.post(basePath + 'check', [
    validator.check('mobile').isLength({ min: 8, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile,8,15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 1, max: 5 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],Country Code, 1, 5')
      .isNumeric().withMessage('NUMERIC: $[1], mobile')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang || 'default'
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      var data = {}
      data.number = body.mobile
      data.ext = body.countryCode
      this.providerMobileValidation(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'resendOtp', [
    validator.check('mobile')
      .isLength({ min: 8, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile, 8, 15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4'),
    validator.check('type')
      .isLength({ min: 5, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],type,5,10')
      .isString().withMessage('TEXT_LIMIT: $[1] $[2] $[3],type,6,10')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      this.providerOtpRecall(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'otpVerify', [
    validator.check('mobile')
      .isLength({ min: 8, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile,8,15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('otp')
      .isLength({ min: 4, max: 4 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],otp,1,4')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4'),
    validator.check('type')
      .isLength({ min: 5, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],type,5,10')
      .isString().withMessage('TEXT_LIMIT: $[1] $[2] $[3],type,6,10'),
    validator.check('uuid')
      .isLength({ min: 10, max: 50 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid,10,50'),
    validator.check('languageName')
      .optional()
      .isLength({ min: 0, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      this.providerOtpValidation(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'signup', [
    validator.check('mobile')
      .isLength({ min: 8, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile,8,15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 1, max: 5 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],Country Code,1,5'),
    validator.check('email')
      .isEmail().withMessage('INVALID: $[1], email Id'),
    validator.check('firstName')
      .isLength({ min: 1, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],firstname,1,50'),
    validator.check('lastName')
      .isLength({ min: 1, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],lastname,1,50'),
    validator.check('loginType').optional()
      .isIn(['manual', 'google', 'facebook']).withMessage('INVALID: $[1],loginType'),
    validator.check('socialToken').optional()
      .isLength({ min: 1, max: 100 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],socialToken,1,100'),
    validator.check('languageName').optional()
      .isLength({ min: 0, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10'),
    validator.check('password')
      .custom((value, { request }) => {
        if (value) {
          if (value.length >= 8 && value.length < 50) {
            return true
          } else {
            throw new Error('PASSWORD: $[1] $[2], 8, 50')
          }
        } else {
          return true
        }
      })
      .isLength({ min: 0, max: 50 }).withMessage('PASSWORD: $[1] $[2], 8, 50'),
    validator.check('countryId')
      .isLength({ min: 1, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryId,1,5'),
    validator.check('uuid')
      .isLength({ min: 10, max: 50 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid,10,50')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      this.registerProvider(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'pwdVerify', [
    validator.check('mobile')
      .isLength({ min: 8, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3], mobile, 8, 15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4'),
    validator.check('password')
      .isLength({ min: 8, max: 20 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3], password, 8, 20'),
    validator.check('uuid')
      .isLength({ min: 10, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3], uuid, 10, 255')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      this.providerPwdValidator(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'forgotPwdOtp', [
    validator.check('mobile')
      .isLength({ min: 8, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3], mobile, 8, 15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4')
  ], function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      this.providerForgotPwdOtp(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updatePwd', [
    validator.check('mobile')
      .isLength({ min: 8, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3], mobile, 8, 15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4'),
    validator.check('otp')
      .isLength({ min: 4, max: 4 }).withMessage('OTP'),
    validator.check('password')
      .isLength({ min: 8, max: 14 }).withMessage('PASSWORD: $[1] $[2],8,14')
  ], function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      this.updateProviderPwd(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updateLocation', [
    validator.check('latitude')
      .isNumeric().withMessage('INVALID_LATITUDE'),
    validator.check('longitude')
      .isNumeric().withMessage('INVALID_LONGITUDE'),
    validator.check('bearing')
      .isNumeric().withMessage('INVALID_BEARING')
  ], server.auth, function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      this.updateProviderLocationCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'deviceUpdate', [
    validator.check('fcmToken')
      .isLength({ min: 10, max: 255 }).withMessage('INVALID: $[1],FCM token'),
    validator.check('brand')
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1],brand'),
    validator.check('model')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1],model no'),
    validator.check('os')
      .isLength({ min: 2, max: 10 }).withMessage('INVALID: $[1],OS type'),
    validator.check('osVersion')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],OS version'),
    validator.check('appVersion')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],App Version')
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
      const lang = request.headers.lang
      this.providerDeviceUpdateCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.get(basePath + 'cancelPolicy', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang
    this.providerCancelPolicyList(body, (result) => {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'cancelBooking', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],booking No'),
    validator.check('reason')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1],reason')
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
      const lang = request.headers.lang
      this.cancelProviderBooking(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.get(basePath + 'staticPage', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    body.id = request.query.id
    const lang = request.headers.lang
    this.providerStaticPageList(body, (result) => {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.get(basePath + 'stateUpdate', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      this.providerStatusToggle(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'profile', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang
    this.viewProviderProfile(body, (result) => {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'profileUpdate', [
    validator.check('fieldName')
      .isIn(['firstName', 'lastName', 'email', 'password', 'image']).withMessage('INVALID_FIELDNAME'),
    validator.check('data')
      .isLength({ min: 1, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3], data,1,50')
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
      const lang = request.headers.lang
      this.providerProfileUpdate(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'docList', [
    validator.check('docType')
      .isIn(['provider', 'bank', 'vehicle']).withMessage('INVALID_FIELDNAME')
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
      const lang = request.headers.lang
      this.providerDocumentListingCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'fileUpload', (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request
      const lang = request.headers.lang
      this.providerFileUploadCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })


  server.post(basePath + 'addPricePerKm', (request, response) => {
    var token = request.headers['token'];
    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });
    else {
      const error = validator.validation(request)
      const lang = request.headers.lang
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, (message) => {
          return response.send(message)
        })
      } else {
        var body = request.body
        body.token = token;
        const lang = request.headers.lang
        this.addPricePerKmCtrl(body, (result) => {
          this.ctrlHandler([result], result.error, lang, (message) => {
            return response.send(message)
          })
        })
      }
    }
  })


  server.get(basePath + 'dashboard', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang
    this.providerDashboardCtrl(body, (result) => {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'rating', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1], booking No'),
    validator.check('comments')
      .isLength({ min: 0, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],comments,0,50'),
    validator.check('rating')
      .isNumeric({ min: 1, max: 1 }).withMessage('NUMERIC: $[1],rating')
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
      const lang = request.headers.lang
      this.providerBookingFeedback(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'myEarning', [
    validator.check('duration')
      .isIn(['day', 'week', 'month', 'year']).withMessage('INVALID_FIELDNAME')
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
      const lang = request.headers.lang
      this.providerEarning(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'vehicleBrand',
    server.auth, (request, response) => {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      this.getVehicleBrandCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    })

  server.post(basePath + 'vehicleModel', [
    validator.check('brandId')
      .isNumeric().withMessage('NUMERIC: $[1], brand Id')
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
      const lang = request.headers.lang
      this.getVehicleModelCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'serviceType', [
    validator.check('seats')
      .isLength({ min: 1, max: 5 }).withMessage('INVALID: $[1], seats')
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
      const lang = request.headers.lang
      this.getProviderSerivceTypeCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'addVehicle', [
    validator.check('vehicleBrand')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Brand'),
    validator.check('vehicleModel')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehilce Model'),
    validator.check('seats')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], seats'),
    validator.check('noPlate')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Vehicle Number Plate'),
    validator.check('year')
      .isInt({ min: 2000, max: 2019 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],Year,2000,2019'),
    validator.check('color')
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1], Color'),
    validator.check('serviceType')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Service Type'),
    validator.check('imageUrl')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Image URL')
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
      const lang = request.headers.lang
      this.addProviderVehicleCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'myVehicle',
    server.auth, (request, response) => {
      var body = request.body
      body.auth = request.params.auth
      const lang = request.headers.lang
      this.getProviderVehicleListCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    })
  server.post(basePath + 'myVehicleDetails', [
    validator.check('vehicleId')
      .isNumeric({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Id')
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
      const lang = request.headers.lang
      this.getProviderVehicleDetailsCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updateVehicleDetails', [
    validator.check('vehicleId')
      .isNumeric().withMessage('INVALID: $[1], Vehicle Id')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Id'),
    validator.check('vehicleBrand')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Brand'),
    validator.check('vehicleModel')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehilce Model'),
    validator.check('seats')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], seats'),
    validator.check('noPlate')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Vehicle Number Plate'),
    validator.check('year')
      .isInt({ min: 2000, max: year }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3], Year,2000,' + year),
    validator.check('color')
      .isLength({ min: 1, max: 50 }).withMessage('INVALID: $[1], Color'),
    validator.check('serviceType')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Service Type'),
    validator.check('imageUrl')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], Image URL')
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
      const lang = request.headers.lang
      this.editProviderVehicleCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'setVehicleActive', [
    validator.check('vehicleId')
      .isNumeric().withMessage('INVALID: $[1], Vehicle Id')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Id')
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
      const lang = request.headers.lang
      this.setProviderVehicleActiveCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'deleteVehicle', [
    validator.check('vehicleId')
      .isNumeric().withMessage('INVALID: $[1], Vehicle Id')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1], Vehicle Id')
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
      const lang = request.headers.lang
      this.removeProviderVehicleCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'docUpload', [
    validator.check('path')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], path'),
    validator.check('docType')
      .isNumeric({ min: 1, max: 11 }).withMessage('INVALID: $[1], docType')
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
      const lang = request.headers.lang
      this.providerDocumentUpdateCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'myWallet', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      this.getProviderWalletInfoCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'providerAccountCreation', [
    validator.check('email')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1], email')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      this.stipeProviderAccountCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'providersSocialTokencheck', [
    validator.check('loginType')
      .isIn(['manual', 'google', 'facebook']).withMessage('INVALID: $[1],loginType'),
    validator.check('socialToken')
      .isLength({ min: 1, max: 100 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],socialToken,1,100'),
    validator.check('uuid')
      .isLength({ min: 10, max: 50 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid,10,50')
  ], function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      this.providersSocialTokenchecksCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'providerPaymentCharge', [
    validator.check('amount').trim().withMessage('MISSING: $[1],Amount')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Amount'),
    validator.check('cardid').trim().withMessage('MISSING: $[1],Card ID')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Card ID')
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
      const lang = request.headers.lang
      this.providerPaymentChargeCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // provider language update
  server.post(basePath + `updateLang`, [
    validator.check('languageName').trim().withMessage('MISSING: $[1],language Name')
      .isLength({ min: 0, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      this.providerUpdateLanguageCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // provider language update
  server.post(basePath + `updateLang`, [
    validator.check('languageName').trim().withMessage('MISSING: $[1],language Name')
      .isLength({ min: 0, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      this.providerUpdateLanguageCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + `withdrawalRequest`, [
    validator.check('amount').isNumeric('INVALID: $[1], amount')
      .isLength({ min: 1, max: 6 }).withMessage('INVALID: $[1], amount')
  ], server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      this.providerWithdrawalRequest(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'getBookingStats', [
    validator.check('year').trim().withMessage('MISSING: $[1],year')
      .isLength({ min: 1, max: 10 }).withMessage('INVALID: $[1],year')
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
      this.getProviderBookingStacksCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'documentUpload', async function (req, res) {
    var token = req.headers['token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    else {

      const lang = req.headers.lang
      const error = validator.validation(req)
      var data = { req: req, res: res }
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, (message) => {
          message.data = error.array()
          return res.send(message)
        })
      } else {
        this.documentUploadCtrl(token, data, (result) => {
          this.ctrlHandler([result], result.error, lang, (message) => {
            return res.send(message)
          })
        })
      }
    }
  })

}
