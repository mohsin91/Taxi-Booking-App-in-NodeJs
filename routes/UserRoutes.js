module.exports = function (server, validator) {
  const basePath = '/api/users/'
  require('../controller/UserController')()
  require('../controller/PromoCodesCtrl')()
  require('../Utils/error')()

  server.get(basePath + 'config', (request, response) => {
    this.appSetting((result) => {
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
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      var mobile = {}
      mobile.number = body.mobile
      mobile.ext = body.countryCode
      this.twilioMobileValidation(mobile, (result) => {
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
    validator.check('countryId')
      .isLength({ min: 1, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryId,1,5'),
    validator.check('loginType').optional()
      .isIn(['manual', 'google', 'facebook']).withMessage('INVALID: $[1],loginType'),
    validator.check('socialToken')
      .optional()
      .isLength({ min: 1, max: 100 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],socialToken,1,100'),
    validator.check('languageName')
      .optional()
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
      this.registerUser(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'loginForParentApp', [
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
    validator.check('countryId')
      .isLength({ min: 1, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryId,1,5'),
    validator.check('loginType').optional()
      .isIn(['manual', 'google', 'facebook']).withMessage('INVALID: $[1],loginType'),
    validator.check('socialToken')
      .optional()
      .isLength({ min: 1, max: 100 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],socialToken,1,100'),
    validator.check('languageName')
      .optional()
      .isLength({ min: 0, max: 10 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],languageName,0,10'),
    validator.check('password')
      .custom((value, { request }) => {
        if (value) {
          if (value.length >= 6 && value.length < 50) {
            return true
          } else {
            throw new Error('PASSWORD: $[1] $[2], 8, 50')
          }
        } else {
          return true
        }
      })
      .isLength({ min: 0, max: 50 }).withMessage('PASSWORD: $[1] $[2], 8, 50'),
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
      this.parentAppLogin(body, (result) => {
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
      this.otpValidate(body, (result) => {
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
      this.recallOTP(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'pwdVerify', [
    validator.check('mobile')
      .isLength({ min: 8, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile, 8, 15')
      .isNumeric().withMessage('NUMERIC: $[1], mobile'),
    validator.check('countryCode')
      .isLength({ min: 2, max: 5 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],countryCode,1,4'),
    validator.check('password')
      .isLength({ min: 6, max: 20 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],password, 8, 20'),
    validator.check('uuid')
      .isLength({ min: 10, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],uuid, 10, 255')
  ], (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      this.pwdValidate(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'forgotPwdOtp', [
    validator.check('mobile')
      .isLength({ min: 8, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile, 8, 15')
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
      this.forgotPwdOtp(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'updatePwd', [
    validator.check('mobile')
      .isLength({ min: 8, max: 15 }).withMessage('NUMERIC_LIMIT: $[1] $[2] $[3],mobile, 8, 15')
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
      this.UpdatePwd(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'listNearProvider', [
    validator.check('latitude')
      .isNumeric().withMessage('NUMERIC: $[1], latitude'),
    validator.check('longitude')
      .isNumeric().withMessage('NUMERIC: $[1], longitude')
  ], server.auth, function (request, response) {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      var lat = body.latitude
      var lon = body.longitude
      this.getNearestProviderLocationForUser(lat, lon, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.get(basePath + 'tripHistory', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'

    this.getTripHistory(body, (result) => {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'tripDetails', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 20 }).withMessage('INVALID: $[1],Booking No')
  ], server.auth, function (request, response) {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'

    this.getTripDetails(body, (result) => {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.get(basePath + 'profile', server.auth, (request, response) => {
    var body = request.body
    body.auth = request.params.auth
    const lang = request.headers.lang || 'default'

    this.viewUserProfile(body, (result) => {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'profileUpdate', [
    validator.check('fieldName')
      .isIn(['firstName', 'lastName', 'email', 'password', 'image']).withMessage('INVALID_FIELDNAME'),
    validator.check('data')
      .isLength({ min: 1, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],data,1,50')
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
      this.userProfileUpdate(body, (result) => {
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
      this.userFileUploadCtrl(body, (result) => {
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
      this.userDeviceUpdateCtrl(body, (result) => {
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
    this.userCancelPolicyList(body, (result) => {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })

  server.post(basePath + 'cancelBooking', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],booking No'),
    validator.check('reason')
      .isLength({ min: 0, max: 255 }).withMessage('INVALID: $[1],reason')
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
      this.cancelUserBooking(body, (result) => {
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
    this.userStaticPageList(body, (result) => {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return response.send(message)
      })
    })
  })
  server.get(basePath + 'myActiveBooking', server.auth, (request, response) => {
    const error = validator.validation(request)
    const lang = request.headers.lang
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      var body = request.body
      body.auth = request.params.auth
      this.getUserActiveBookingCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'rating', [
    validator.check('bookingNo')
      .isLength({ min: 1, max: 11 }).withMessage('INVALID: $[1],booking No'),
    validator.check('comments')
      .optional()
      .isLength({ min: 0, max: 255 }).withMessage('TEXT_LIMIT: $[1] $[2] $[3],comments,0,255'),
    validator.check('rating')
      .optional()
      .isNumeric({ min: 1, max: 1 }).withMessage('NUMERIC: $[1],rating'),
    validator.check('action')
      .isIn(['yes', 'skipped']).withMessage('INVALID_FIELDNAME')
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
      this.userBookingFeedback(body, (result) => {
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
      this.getUserWalletInfoCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'generateEphemeralKeys', [
    validator.check('stripe_version').trim().withMessage('MISSING: $[1],stripe version')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],stripe version')
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
      this.generateEphemeralKeysCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'payBookingFromCard', [
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
      this.customerPaymentChargeCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'usersSocialTokencheck', [
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
      this.usersSocialTokenchecksCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'addMoneyFromCard', [
    validator.check('amount').trim().withMessage('MISSING: $[1],Amount')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Amount'),
    validator.check('cardId').trim().withMessage('MISSING: $[1],Card Id')
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
      this.usersUpdateWalletCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

  server.post(basePath + 'addCard', [
    validator.check('source').trim().withMessage('MISSING: $[1],Source')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Source')
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
      this.usersStripeCreateCardsCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.get(basePath + 'cardList', server.auth, (request, response) => {
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
      this.usersStripeCardListsCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  server.post(basePath + 'removeCard', [
    validator.check('source').trim().withMessage('MISSING: $[1],Source')
      .isLength({ min: 1 }).withMessage('INVALID: $[1],Source')
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
      this.usersStripeRemoveCardCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // user promo codes
  server.get(basePath + `promoCodesList`, server.auth, (request, response) => {
    const lang = request.headers.lang
    const error = validator.validation(request)
    var body = request.body
    body.auth = request.params.auth
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return response.send(message)
      })
    } else {
      this.usersPromoCodesListCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // user promo codes
  server.post(basePath + `promoCodesRedeem`, [
    validator.check('coupon').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],promoCodeID'),
    validator.check('amount').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],amount')
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
      this.promoCodesRedeemCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })
  // user language update
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
      this.userUpdateLanguageCtrl(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return response.send(message)
        })
      })
    }
  })

    // get Drivers
    server.post(basePath + `getDrivers`,(request, response) => {
      var token = request.headers['token'];
    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });
    else {
      const lang = request.headers.lang
      const error = validator.validation(request)
      var body = request.body
      body.token = token;
      body.auth = request.params.auth
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, (message) => {
          return response.send(message)
        })
      } else {
        this.getDriversCtrl(body, (result) => {
          this.ctrlHandler([result], result.error, lang, (message) => {
            console.log(message)
            return response.send(message)
          })
        })
      }
    }
    })

     // order Ride
     server.post(basePath + `orderRide`,(request, response) => {
      var token = request.headers['token'];
    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });
    else {
      const lang = request.headers.lang
      const error = validator.validation(request)
      var body = request.body
      body.token = token;
      body.auth = request.params.auth
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, (message) => {
          return response.send(message)
        })
      } else {
        this.orderRide(body, (result) => {
          this.ctrlHandler([result], result.error, lang, (message) => {
            return response.send(message)
          })
        })
      }
    }
    })

    
    server.get(basePath + `getVehicalCateg`, (request, response) => {
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
        this.getVehicleCategory(body, (result) => {
          this.ctrlHandler([result], result.error, lang, (message) => {
            return response.send(message)
          })
        })
      }
    }
  })
}
