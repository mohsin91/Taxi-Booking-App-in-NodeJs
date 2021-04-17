module.exports = function () {
  require('../services/UserService')()
  require('../services/AppConfigService')()
  require('../services/ProviderService')()
  require('../services/BookingService')()
  require('../Utils/common')()
  require('../Utils/mailer')()
  require('../thirdParty/paymentHelper')()
  require('../services/WalletService')()
  require('../services/TransactionServices')()
  require('dotenv').config()

  this.appSetting = (callback) => {
    var response = {}
    var type = 'user'
    this.appConfig(type, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.result
      }
      callback(response)
    })
  }

  this.mobileValidation = (mobile, callback) => {
    var response = {}
    this.checkUserExists(mobile, (result) => {
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

  this.twilioMobileValidation = (mobile, callback) => {
    var response = {}
    var name = 'user'
    this.checkUserExists(mobile, async (result) => {
      var authtyperesult = await this.authTypeChecking(name)
      if (result.error) {
        if (authtyperesult.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          if (authtyperesult.data['Value'] === 'OTP') {
            this.sendOtpMobile(mobile.number, mobile.ext)
            response.error = true
            response.msg = result.msg
          } else {
            this.sendOtpMobile(mobile.number, mobile.ext)
            response.error = true
            response.msg = result.msg
          }
        }
      } else {
        if (authtyperesult.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          if (authtyperesult.data['Value'] === 'OTP') {
            this.sendOtpMobile(mobile.number, mobile.ext)
            response.error = false
            response.msg = result.msg
          } else {
            response.error = false
            response.msg = result.msg
          }
        }
      }
      callback(response)
    })
  }

  this.registerUser = async (req, callback) => {
    var response = {}
    var data = req
    var stripeData = {}

    this.createUser(data, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        var userId = await this.getPayloadFromToken(result.data.token, process.env.JWT_SECRET)
        // var striperes = await this.createPaymentCustomerId(data.email)
        // var stripeCustomerId = striperes.data.id
        // stripeData.StripeCustomerID = stripeCustomerId
        // await this.updateUserStripeCustomerID(stripeData, userId.data.Id)
        var smtp = await this.getSMTPConfig()
        var template = await this.getEmailTemplateList(1)
        var FirstName = data.firstName
        var LastName = data.lastName
        var year = new Date().getFullYear()
        var temp = await this.multipleStringReplace(template.data, [
          { substr: '*username*', to: FirstName + LastName }, { substr: '*year*', to: year }])
        this.MailerNew(smtp.data, req.email, 'Welcome', temp)
        if (!userId.error) {
          this.createWalletService(userId.data.Id, 'user', 0)
        }
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.parentAppLogin = async (req, callback) => {
    var response = {}
    var data = req

    this.createUserIfNew(data, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        var userId = await this.getPayloadFromToken(result.data.token, process.env.JWT_SECRET)

        if (!userId.error) {
          this.createWalletService(userId.data.Id, 'user', 0)
        }
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.recallOTP = async (req, callback) => {
    var response = {}
    var mobile = req.mobile
    var ext = req.countryCode
    var otpResendMobile = await this.sendOtpMobile(mobile, ext)
    // var otpResendMobile = false
    if (otpResendMobile) {
      response.error = true
      response.msg = 'OTP_FAIL'
    } else {
      response.error = false
      response.msg = 'OTP_SENT'
    }
    callback(response)
  }

  this.otpValidate = async (req, callback) => {
    var response = {}
    var data = req
    var otpVerifynumber = await this.otpVerify(data.mobile, data.countryCode, data.otp)
    if (otpVerifynumber.error) {
      response.error = true
      response.msg = 'OTP_VERIFY'
      callback(response)
    } else {
      this.verifyOTP(data, (result) => {
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

  this.pwdValidate = (req, callback) => {
    var response = {}
    var data = req

    this.verifyPwd(data, (result) => {
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

  this.forgotPwdOtp = async (req, callback) => {
    var response = {}
    var data = req
    var mobile = data.mobile
    var ext = data.countryCode
    await this.sendOtpMobile(mobile, ext)
    this.generateForgotOtp(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  this.UpdatePwd = (req, callback) => {
    var response = {}
    var data = req
    this.resetPwd(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  this.getNearestProviderLocationForUser = (lat, lon, callback) => {
    var response = {}
    var data = {}
    data.lat = lat
    data.lon = lon
    this.fetchProivderLocation(data, (result) => {
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

  this.viewUserProfile = (req, callback) => {
    var data = req
    var response = {}
    this.getUserDetails(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.result
      }
      callback(response)
    })
  }

  this.userProfileUpdate = (req, callback) => {
    var response = {}
    var data = req
    this.updateUserProfile(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  this.userFileUploadCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.userFileUploadService(data, (result) => {
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

  this.userDeviceUpdateCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.userDeviceUpdateService(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }
  this.userCancelPolicyList = (req, callback) => {
    var response = {}
    this.getuserCancelPolicyList((result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.result
      }
      callback(response)
    })
  }
  this.userStaticPageList = (req, callback) => {
    var data = req
    var response = {}
    this.getUserStaticPageList(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.result
      }
      callback(response)
    })
  }

  this.getUserActiveBookingCtrl = async (req, callback) => {
    var response = {}
    var providerInfo
    try {
      var data = req
      var userId = data.auth.Id
      var user = await this.getUserRating(userId)
      var bookingInfo = await this.getUserActiveBooking(userId)
      var feedback = await this.getUserBookingFeedback(userId)
      if (!bookingInfo.error) {
        var rideId = bookingInfo.data.rideId
        delete bookingInfo.data.rideId
        if (bookingInfo.data.providerId) {
          providerInfo = await this.getProviderInfo(bookingInfo.data.providerId)
          if (providerInfo.error) {
            bookingInfo.data.providerInfo = null
          } else {
            bookingInfo.data.providerInfo = providerInfo.data
          }
        } else {
          bookingInfo.data.providerInfo = null
        }
        if (bookingInfo.data.status === 'completed') {
          var rideInfo = await this.getRideTypeDetailService(rideId)
          if (!rideInfo.error && !feedback.error) {
            bookingInfo.data.rideName = rideInfo.data.rideName
            bookingInfo.data.rideImage = rideInfo.data.rideImage
          }
          delete bookingInfo.data.providerId
          response.error = true
          response.msg = 'NO_BOOKING'
          response.data = bookingInfo.data
        } else {
          delete bookingInfo.data.providerId
          response.error = false
          response.msg = bookingInfo.msg
          response.data = bookingInfo.data
        }
      } else {
        response.error = true
        response.msg = 'NO_BOOKING'
        response.data = {}
      }
      if (!user.error) {
        response.data['rating'] = user.data.rating
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.cancelUserBooking = async (req, callback) => {
    var response = {}
    try {
      var booking = {}
      var providerId
      booking.Id = req.bookingNo
      var bookingInfo = await this.getBookingInfo(booking)
      if (bookingInfo.error) {
        providerId = null
      } else {
        providerId = bookingInfo.data[0].ProviderId
      }
      booking.CancelledFor = req.reason
      booking.CancelledBy = 'user'
      booking.Status = 'cancelled'
      booking.UserId = req.auth.Id
      booking.IsActive = 'no'
      var cancel = await this.bookingCancellation(booking)
      if (cancel.error) {
        response.error = true
        response.msg = cancel.msg
      } else {
        var content = {}
        content.title = 'Customer cancelled the booking'
        content.body = req.reason
        content.data = 'booking_cancelled'
        var deviceInfo = await this.getProviderDeviceToken(providerId)
        if (!deviceInfo.error) {
          var providerUnblock = 'active'
          this.providerLocationStatusUpdate(providerId, providerUnblock, () => {})
          this.sendPushNotificationByDeviceType(deviceInfo.data, content)
        }
        response.error = false
        response.msg = cancel.msg
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getUserLocationCellId = async (latitude, longitude, callback) => {
    var response = {}
    try {
      var cellId = await this.getCellIdFromCoordinates(latitude, longitude)
      if (cellId.error) {
        response.error = true
        response.msg = 'INVALID: $[1],latitude and longitude'
      } else {
        var data = cellId.id
        response.error = false
        response.data = data
        response.msg = 'LOCATION_ID'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }


  this.getUserLocationCellIdDub = async (latitude, longitude,Id, callback) => {
    var response = {}
    try {
      var cellId = await this.getCellIdFromCoordinatesDub(latitude, longitude,Id)
      if (cellId.error) {
        response.error = true
        response.msg = 'INVALID: $[1],latitude and longitude'
      } else {
        var data={};
        data.cellId = cellId.id;
        data.Duration=cellId.Duration;
        data.Distance=cellId.Distance;
        response.error = false
        response.data = data
        response.msg = 'LOCATION_ID'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.userBookingFeedback = async (req, callback) => {
    var response = {}
    try {
      var data = req
      var condition = {}
      const userId = req.auth.Id
      var action = req.action
      condition.UserId = userId
      condition.Id = data.bookingNo
      condition.Status = 'completed'

      var bookingInfo = await this.getBookingInfo(condition)
      if (bookingInfo.error) {
        response.error = true
        response.msg = bookingInfo.msg
        callback(response)
      } else {
        if (action === 'skipped') {
          response.error = false
          response.msg = 'VALID'
          this.updateUserBookingFeedback(data.bookingNo, userId, action)
          callback(response)
        } else {
          var booking = bookingInfo.data[0][0]
          var userRating = {}
          userRating.BookingId = booking.Id
          userRating.UserId = booking.UserId
          userRating.ProviderId = booking.ProviderId
          userRating.Rating = data.rating
          userRating.Comments = data.comments
          userRating.Tip = data.tip
          userRating.ReviewedBy = 'user'
          this.providerRating(userRating, async (result) => {
            if (result.error) {
              response.error = true
              response.msg = result.msg
            } else {
              var rating = await this.getProviderAverageRating(booking.ProviderId)
              if (!rating.error) {
                this.providerRatingUpdate(booking.ProviderId, rating.data.Rating)
              }
              response.error = false
              response.msg = result.msg
            }
            this.updateUserBookingFeedback(data.bookingNo, userId, action)
            callback(response)
          })
        }
      }
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getTripHistory = async (req, callback) => {
    var response = {}
    try {
      var userId = req.auth.Id
      var booking = await this.getUserBookingHistory(userId)
      if (booking.error) {
        response.error = true
        response.msg = booking.msg
      } else {
        response.error = false
        response.msg = booking.msg
        response.data = booking.data
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getTripDetails = async (req, callback) => {
    var response = {}
    try {
      var condition = {}
      condition.Id = req.bookingNo
      condition.UserId = req.auth.Id
      var booking = await this.getBookingInfo(condition)
      if (booking.error) {
        response.error = true
        response.msg = booking.msg
      } else {
        var bookingInfo = booking.data.map(element => {
          var data = {}
          var receipt = []
          data['createdTime'] = element.CreateAt
          data['fromLocation'] = element.FromLocation
          data['toLocation'] = element.ToLocation
          data['sourceLat'] = element.SourceLat
          data['sourceLong'] = element.SourceLong
          data['destinyLat'] = element.DestinyLat
          data['destinyLong'] = element.DestinyLong
          data['status'] = element.Status
          data['totalAmt'] = element.CurrencyType + element.TotalAmount
          data['paymentMode'] = element.PaymentMode
          data['vehilceName'] = element.VehicleName === null ? 'Test Vehicle' : element.VehicleName
          data['isActive'] = element.IsActive
          receipt.push({ fieldName: 'Tax', value: element.Tax })
          receipt.push({ fieldName: 'Fare', value: String(element.Estimation) })
          receipt.push({ fieldName: 'Sub Total', value: String(Number(element.Estimation) + Number(element.Tax)) })
          receipt.push({ fieldName: 'Total Amount', value: element.CurrencyType + ' ' + element.TotalAmount })
          data['receipt'] = receipt
          return data
        })
        var bookingDetails = bookingInfo[0]
        var provider = await this.getProviderInfo(booking.data[0].ProviderId)
        if (provider.error) {
          bookingDetails.providerInfo = null
        } else {
          var providerInfo = {}
          providerInfo['name'] = provider.data.firstName + ' ' + provider.data.lastName
          providerInfo['image'] = provider.data.image
          providerInfo['rating'] = provider.data.rating
          bookingDetails.providerInfo = providerInfo
        }
        response.error = false
        response.msg = 'VALID'
        response.data = bookingDetails
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getUserWalletInfoCtrl = async (req, callback) => {
    var response = {}
    try {
      var userId = req.auth.Id
      var type = 'user'
      var walletInfo = await this.getWalletInfoService(userId, type)
      if (walletInfo.error) {
        response.error = true
        response.msg = walletInfo.msg
      } else {
        var transact = {}
        transact.userType = 'user'
        transact.userId = userId

        var data = {}
        data.balanceTxt = 'kr ' + walletInfo.data
        data.balance = walletInfo.data

        var transaction = await this.getTransactionList(transact)
        if (transaction.error) {
          data.transaction = []
        } else {
          data.transaction = transaction.data
        }
        response.error = false
        response.data = data
        response.msg = walletInfo.msg
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.generateEphemeralKeysCtrl = async (req, callback) => {
    var response = {}
    try {
      var userId = req.auth.Id
      var email = req.auth.Email
      var ephemeralKeyInfo = await this.generateEphemeralKeysService(userId)
      if (ephemeralKeyInfo.error) {
        response.error = true
        response.msg = 'NO_DATA'
      } else {
        var stripeData = {}
        if (ephemeralKeyInfo.data.stripeCustomerId === null) {
          stripeData = {}
          var striperes = await this.createPaymentCustomerId(email)
          var stripeCustomerId = striperes.data.id
          stripeData.StripeCustomerID = stripeCustomerId
          await this.updateUserStripeCustomerID(stripeData, userId)
        }
        stripeData = {
          customerID: ephemeralKeyInfo.data.stripeCustomerId === null ? stripeCustomerId : ephemeralKeyInfo.data.stripeCustomerId,
          stripe_version: req.stripe_version
        }
        var createEphemeral = await this.createPaymentEphemerralKey(stripeData)
        response.error = false
        response.data = createEphemeral
        response.msg = 'VALID'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.customerPaymentChargeCtrl = async (req, callback) => {
    var response = {}
    try {
      var userId = req.auth.Id
      var type = 'user'
      var cardid = req.cardid
      var amount = req.amount
      var paymentcharge = await this.customerPaymentChargeService(userId, type)
      if (paymentcharge.error) {
        response.error = true
        response.msg = paymentcharge.msg
      } else {
        var customerID = paymentcharge.data.stripeCustomerId
        var email = paymentcharge.data.email
        var stripecharge = await this.stripePaymentCharge(amount, customerID, cardid, email)
        if (stripecharge.error === false) {
          response.error = false
          response.data = paymentcharge.data
          response.msg = 'STRIPE_PAYMENT_SUCCESS'
        } else {
          response.error = true
          response.msg = 'STRIPE_PAYMENT_ERROR'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.usersSocialTokenchecksCtrl = (data, callback) => {
    var response = {}
    this.usersSocialTokenchecksService(data, (result) => {
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

  this.usersUpdateWalletCtrl = async (req, callback) => {
    var response = {}
    try {
      var transact = {}
      var sendwallet = {}
      var userId = req.auth.Id
      var userType = 'user'
      var cardid = req.cardid
      var amount = req.amount
      var paymentcharge = await this.customerPaymentChargeService(userId, userType)
      if (paymentcharge.error) {
        response.error = true
        response.msg = paymentcharge.msg
      } else {
        transact.userType = userType
        transact.userId = userId
        transact.amount = amount
        transact.type = 'credit'
        transact.description = 'Wallet recharged'
        var tnx = await this.createTransaction(transact)
        var customerID = paymentcharge.data.stripeCustomerId
        var email = paymentcharge.data.email
        var stripecharge = await this.stripePaymentCharge(amount, customerID, cardid, email)
        if (stripecharge.error === false) {
          sendwallet.userId = userId
          sendwallet.userType = userType
          sendwallet.amount = amount
          var paymentwallet = await this.creditWalletService(sendwallet)
          if (paymentwallet.error === false) {
            if (!tnx.error) {
              var transactId = {}
              transactId.transactId = tnx.data
              transactId.status = 'success'
              this.editTransaction(transactId)
            }
            response.error = false
            response.data = paymentcharge.data
            response.msg = paymentwallet.msg
          } else {
            response.error = true
            response.msg = paymentwallet.msg
          }
        } else {
          response.error = true
          response.msg = 'STRIPE_PAYMENT_ERROR'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.usersStripeCreateCardsCtrl = async (req, callback) => {
    var response = {}
    var userId = req.auth.Id
    var type = 'user'
    var source = req.source
    var paymentuser = await this.customerPaymentChargeService(userId, type)
    if (paymentuser.error) {
      response.error = true
      response.msg = paymentuser.msg
    } else {
      var customerID = paymentuser.data.stripeCustomerId
      var carddetails = await this.usersStripeCreateCards(customerID, source)
      if (carddetails.error) {
        response.error = true
        response.msg = 'STRIPE_CARD_ERROR'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = carddetails.data
      }
    }
    callback(response)
  }
  this.usersStripeCardListsCtrl = async (req, callback) => {
    var response = {}
    var userId = req.auth.Id
    var email = req.auth.Email
    var type = 'user'
    var paymentCharge = await this.customerPaymentChargeService(userId, type)
    if (paymentCharge.error || paymentCharge.data.stripeCustomerId === null) {
      response.error = true
      response.msg = 'NO_CARDS_FOUND'
      if (paymentCharge.data.stripeCustomerId === null) {
        var stripeData = {}
        var striperes = await this.createPaymentCustomerId(email)
        var stripeCustomerId = striperes.data.id
        stripeData.StripeCustomerID = stripeCustomerId
        await this.updateUserStripeCustomerID(stripeData, userId)
      }
      callback(response)
    } else {
      try {
        var customerID = paymentCharge.data.stripeCustomerId
        var cardDetails = await this.getStripeCardLists(customerID)
        if (cardDetails.error) {
          response.error = true
          response.msg = 'FAILED'
        } else {
          if (cardDetails.data.data.length <= 0) {
            response.error = true
            response.msg = 'NO_CARDS_FOUND'
          } else {
            response.error = false
            response.msg = 'VALID'
            response.data = cardDetails.data.data
          }
        }
        callback(response)
      } catch (err) {
        err.error = true
        err.msg = 'FAILED'
        callback(err)
      }
    }
  }
  this.usersStripeRemoveCardCtrl = async (req, callback) => {
    var response = {}
    var userId = req.auth.Id
    var type = 'user'
    var cardid = req.source
    var paymentcharge = await this.customerPaymentChargeService(userId, type)
    if (paymentcharge.error) {
      response.error = true
      response.msg = paymentcharge.msg
    } else {
      var customerID = paymentcharge.data.stripeCustomerId
      var carddetails = await this.stripeCardRemove(customerID, cardid)
      if (carddetails.error) {
        response.error = true
        response.msg = 'NO_CARDID_FOUND'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = carddetails.data
      }
    }
    callback(response)
  }
  this.userUpdateLanguageCtrl = async (req, callback) => {
    var response = {}
    this.userUpdateLanguageService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  //Get vehicales categories

  this.getVehicleCategory  = (req, callback) => {
    var response = {}
    var data = req
    this.getVehicleCategoryServ(data, (result) => {
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
  
 
  

  this.getDriversCtrl  = (req, callback) => {
    var response = {}
    var data = req
    this.getDriverServ(data, (result) => {
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
  
  this.orderRide  = (req, callback) => {
    var response = {}
    var data = req
    this.orderRideServ(data, (result) => {
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
