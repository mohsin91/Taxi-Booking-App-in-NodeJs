module.exports = function () {
  require('../services/TrackingService')()
  require('../services/AppConfigService')()
  require('../services/ProviderService')()
  require('../services/RatingServices')()
  require('../services/BookingService')()
  require('../services/WalletService')()
  require('../services/TransactionServices')()

  this.providerAppSetting = (callback) => {
    var response = {}
    var type = 'provider'
    this.appConfig(type, (result) => {
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

  this.getNearestProviderLocation = (lat, lon, callback) => {
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

  this.providerMobileValidation = (req, callback) => {
    var response = {}
    var name = 'provider'
    this.checkProviderExsist(req, async (result) => {
      var authtyperesult = await this.authTypeChecking(name)
      if (result.error) {
        if (authtyperesult.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          if (authtyperesult.data['Value'] === 'OTP') {
            this.sendOtpMobile(req.number, req.ext)
            response.error = true
            response.msg = result.msg
          } else {
            this.sendOtpMobile(req.number, req.ext)
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
            this.sendOtpMobile(req.number, req.ext)
            response.error = false
            response.msg = result.msg
            response.data = result.data
          } else {
            response.error = false
            response.msg = result.msg
            response.data = result.data
          }
        }
      }
      callback(response)
    })
  }

  this.providerOtpValidation = async (req, callback) => {
    var response = {}
    var data = req
    var otpVerifynumber = await this.otpVerify(data.mobile, data.countryCode, data.otp)
    if (otpVerifynumber.error) {
      response.error = true
      response.msg = 'OTP_VERIFY'
      callback(response)
    } else {
      this.providerOtpVerify(data, (result) => {
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

  this.providerOtpRecall = async (req, callback) => {
    var response = {}
    var data = req
    var otpResendMobile = await this.sendOtpMobile(data.mobile, data.countryCode)
    if (otpResendMobile.error) {
      response.error = true
      response.msg = 'OTP_FAIL'
    } else {
      response.error = false
      response.msg = 'OTP_SENT'
    }
    callback(response)
  }

  this.registerProvider = async (req, callback) => {
    var response = {}
    var data = req
    this.createProvider(data, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        var providerId = await this.getPayloadFromToken(result.data.token, process.env.JWT_SECRET)
        if (!providerId.error) {
          this.createWalletService(providerId.data.Id, 'provider', 0)
        }
        // var striperes = await this.stripeCreateProviderAccounts(req.email)
        // var stripeaccountid = striperes.data
        // await this.updateProviderStripeAccountID(stripeaccountid, providerId.data.Id)
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.providerPwdValidator = (req, callback) => {
    var response = {}
    var data = req

    this.providerPwdVerify(data, (result) => {
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

  this.providerForgotPwdOtp = async (req, callback) => {
    var response = {}
    var data = req
    var mobile = data.mobile
    var ext = data.countryCode
    await this.sendOtpMobile(mobile, ext)
    this.providerForgotOtp(data, (result) => {
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

  this.updateProviderPwd = (req, callback) => {
    var response = {}
    var data = req
    this.resetProviderPwd(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = 'OTP_VERIFY'
      } else {
        response.error = false
        response.msg = 'UPDATE'
      }
      callback(response)
    })
  }

  this.updateProviderLocationCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.providerLocationUpdateService(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = 'NOTEXIST: $[1],Provider Id'
      } else {
        response.error = false
        response.msg = 'UPDATE'
      }
      callback(response)
    })
  }
  //ibtihaj
  this.updateProviderLocationDub = (req, callback) => {
    var response = {}
    var data = req
    this.providerLocationUpdateServDub(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = 'NOTEXIST: $[1],Provider Id'
      } else {
        response.error = false;
        response.data=result;
        response.msg = 'UPDATE';
      }
      callback(response)
    })
  }
  //

  this.getSimulatedProviderLocation = (lat, lon, callback) => {
    var response = {}
    var data = {}
    data.lat = lat
    data.lon = lon
    this.getRandProviderLocation(data, (result) => {
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

  this.providerDeviceUpdateCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.providerDeviceUpdateService(data, (result) => {
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

  this.viewProviderProfile = (req, callback) => {
    var data = req
    var response = {}
    this.getProviderDetails(data, (result) => {
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

  this.providerProfileUpdate = (req, callback) => {
    var response = {}
    var data = req
    this.updateProviderProfile(data, (result) => {
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

  this.providerFileUploadCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.providerFileUploadService(data, (result) => {
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

  this.addPricePerKmCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.addPricePerKmCtrlService(data, (result) => {
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


  this.providerStatusToggle = (req, callback) => {
    var response = {}
    var data = req
    this.providerStatusUpdate(data, (result) => {
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

  this.providerDashboardCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.providerDashboardService(data, async (result) => {
      try {
        var providerId = data.auth.Id
        if (result.error) {
          response.error = true
          response.msg = result.msg
        } else {
          var earning = {}
          earning = result.data
          var activeVehicle = await this.getProivderActiveVehicleDetails(providerId)
          if (activeVehicle.error) {
            earning.activeVehicle = null
          } else {
            earning.activeVehicle = activeVehicle.data
          }
          var statistic = await this.getProviderBookingStatics(providerId)
          var totalEarnings = await this.getWalletInfoService(providerId, 'provider')
          earning.totalEarnings = totalEarnings.error === true ? 0 : 'kr ' + totalEarnings.data
          if (statistic.error) {
            earning.earnings = result.data.earnings
          } else {
            earning.earnings = statistic.data
          }
          response.error = false
          response.msg = result.msg
          response.data = earning
        }
        callback(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
      }
    })
  }

  this.providerEarning = async (req, callback) => {
    var response = {}
    var providerId = req.auth.Id
    var duration = req.duration
    this.getProviderEarnings(providerId, duration, (result) => {
      if (result.error) {
        response.error = true
        response.msg = 'NO_EARNING'
        response.data = result.data
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = result.data
      }
      callback(response)
    })
  }

  this.providerDocumentListingCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.providerDocumentListingService(data, (result) => {
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

  this.updateProivderLocationSimulation = (req, callback) => {
    this.automation(() => { })
  }

  this.providerCancelPolicyList = (req, callback) => {
    var data = req
    var response = {}
    this.getproviderCancelPolicyList(data, (result) => {
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

  this.cancelProviderBooking = async (req, callback) => {
    var response = {}
    try {
      var booking = {}
      var deviceId
      booking.Id = req.bookingNo
      var bookingInfo = await this.getBookingInfo(booking)
      if (bookingInfo.error) {
        deviceId = null
      } else {
        deviceId = bookingInfo.data[0].UserDeviceId
      }
      booking.CancelledFor = req.reason
      booking.CancelledBy = 'provider'
      booking.Status = 'cancelled'
      booking.ProviderId = req.auth.Id
      var cancel = await this.bookingCancellation(booking)
      if (cancel.error) {
        response.error = true
        response.msg = cancel.msg
      } else {
        var content = {}
        content.title = 'Booking Cancelled by provider'
        content.body = req.reason
        content.data = 'booking_cancelled'
        var userInfo = await this.getUserDeviceToken(deviceId)
        if (!userInfo.error) {
          this.sendPushNotificationByDeviceType(userInfo.data, content)
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

  this.providerStaticPageList = (req, callback) => {
    var data = req
    var response = {}
    this.getProviderStaticPageList(data, (result) => {
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

  this.providerBookingFeedback = async (req, callback) => {
    var data = req
    var response = {}
    var condition = {}
    try {
      const providerId = req.auth.Id
      condition.ProviderId = providerId
      condition.Id = data.bookingNo
      condition.Status = 'completed'

      var bookingInfo = await this.getBookingInfo(condition)
      if (bookingInfo.error) {
        response.error = true
        response.msg = bookingInfo.msg
        callback(response)
      } else {
        var booking = bookingInfo.data[0]
        var userRating = {}
        userRating.BookingId = booking.Id
        userRating.UserId = booking.UserId
        userRating.ProviderId = booking.ProviderId
        userRating.Rating = data.rating
        userRating.Comments = data.comments
        userRating.Tip = data.tip
        userRating.ReviewedBy = 'provider'
        this.userRating(userRating, async (result) => {
          if (result.error) {
            response.error = true
            response.msg = result.msg
          } else {
            var rating = await this.getUserAverageRating(booking.UserId)
            if (!rating.error) {
              this.userRatingUpdate(booking.UserId, rating.data.Rating)
            }
            response.error = false
            response.msg = result.msg
          }
          callback(response)
        })
      }
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderSerivceTypeCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.getProviderSerivceTypeService(data, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = result.data
      }
      callback(response)
    })
  }

  this.addProviderVehicleCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.addProviderVechicleService(data, (result) => {
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

  this.getProviderVehicleListCtrl = (req, callback) => {
    var response = {}
    var providerId = req.auth.Id
    this.getProviderVehicleListService(providerId, (result) => {
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

  this.getProviderVehicleDetailsCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.getProviderVehicleDetailsService(data, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        var details = result.data
        var vehicleList = await this.getProviderSelectedServiceList(details.RideVehicleTypeId)
        if (!vehicleList.error) {
          delete details.RideVehicleTypeId
          details['serviceType'] = vehicleList.data
        } else {
          delete details.RideVehicleTypeId
          details['serviceType'] = []
        }
        response.error = false
        response.msg = result.msg
        response.data = details
      }
      callback(response)
    })
  }

  this.editProviderVehicleCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.editProviderVehicleSerivce(data, (result) => {
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

  this.providerDocumentUpdateCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.providerDocumentUpdateService(data, (result) => {
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

  this.getProviderWalletInfoCtrl = async (req, callback) => {
    var response = {}
    try {
      var providerId = req.auth.Id
      var type = 'provider'
      var walletInfo = await this.getWalletInfoService(providerId, type)
      if (walletInfo.error) {
        response.error = true
        response.msg = walletInfo.msg
      } else {
        var transact = {}
        transact.userType = 'provider'
        transact.userId = providerId

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
  this.providersSocialTokenchecksCtrl = (data, callback) => {
    var response = {}
    this.providersSocialTokenchecksService(data, (result) => {
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
  this.stipeProviderAccountCtrl = async (req, callback) => {
    var response = {}
    var data = req
    var stripeaccount = await this.stripeCreateProviderAccounts(data.email)
    if (stripeaccount.error) {
      response.error = true
      response.msg = 'STRIPE_AC_ERROR'
    } else {
      response.error = false
      response.msg = 'STRIPE_AC'
      response.data = {
        stripeaccountid: stripeaccount.data
      }
    }
    callback(response)
  }
  this.providerPaymentChargeCtrl = async (req, callback) => {
    var response = {}
    try {
      var providerId = req.auth.Id
      var cardid = req.cardid
      var amount = req.amount
      var paymentcharge = await this.getProivderPaymentCharge(providerId)
      if (paymentcharge.error) {
        response.error = true
        response.msg = paymentcharge.msg
      } else {
        var stripeAccountID = paymentcharge.data.StripeAccountID
        var email = paymentcharge.data.Email
        this.stripePaymentCharge(amount, stripeAccountID, cardid, email)
        response.error = false
        response.data = paymentcharge.data
        response.msg = paymentcharge.msg
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.providerUpdateLanguageCtrl = async (req, callback) => {
    var response = {}
    this.providerUpdateLanguageService(req, (result) => {
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

  this.providerWithdrawalRequest = async (req, callback) => {
    var response = {}
    this.createWithDrawalRequest(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        var data = {}
        data.userType = 'provider'
        data.userId = req.auth.Id
        data.description = 'Withdrawal Request'
        data.type = 'debit'
        data.amount = req.amount
        data.status = 'pending'
        data.withdrawalId = result.data
        this.createTransaction(data)
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.getProviderBookingStacksCtrl = async (req, callback) => {
    var response = {}
    var data = req
    this.getProviderBookingStacksService(data, (result) => {
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
