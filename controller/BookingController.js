module.exports = function () {
  require('../services/BookingService')()
  require('../services/ProviderService')()
  require('../services/UserService')()
  require('../services/AppConfigService')()
  require('../services/RatingServices')()
  require('../services/WalletService')()
  require('../services/TransactionServices')()
  require('../Utils/common')()
  require('../Utils/mailer')()

  this.getAvailabeRide = (req, callback) => {
    var data = req
    var response = {}
    this.getRideTypeByCountry(data, (result) => {
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

  this.bookRideCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.bookRideService(data, (result) => {
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

  this.providerBookingStatusCtrl = (req, callback) => {
    var response = {}
    var data = req
    this.providerBookingUpdateService(data, async (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        var providerUnblock
        var providerWalletInfo
        var providerTnxStatus
        var providerTnx
        var deviceInfo = result.data[0].userDeviceId
        var content = {}
        var providerId = data.auth.Id
        var bookingId = data.bookingNo
        var userToken = await this.getUserDeviceToken(deviceInfo)

        if (data.action === 'DriverAccepted') {
          content.data = 'DriverAccepted'
          content.title = 'Provider has been assigned'
          content.body = 'You can now track the provider'
        } else if (data.action === 'Cancelled') {
          providerUnblock = 'active'
          this.providerBookingRejectUpdate(providerId, bookingId)
          this.providerLocationStatusUpdate(providerId, providerUnblock, () => {})
          content.data = 'Cancelled'
          content.title = 'The provider has rejected your booking'
          content.body = 'We will assign new ride for you.'
          userToken.error = true
        } else if (data.action === 'DriverArrived') {
          content.data = 'DriverArrived'
          content.title = 'The provider reached location'
          content.body = 'The provider is waiting at your pickup point'
        } else if (data.action === 'RideStarted') {
          content.data = 'RideStarted'
          content.title = 'Trip has started'
          content.body = 'Your trip has been started. Have a safe journey'
        } else if (data.action === 'RideEnded') {
          content.data = 'RideEnded'
          content.title = 'Payment recieved'
          content.body = 'We have recieved your payment'
          this.updateProviderTripCountService(providerId)
        } else if (data.action === 'PaymentDone') {
          providerUnblock = 'active'
          this.providerLocationStatusUpdate(providerId, providerUnblock, () => {})
          content.data = 'PaymentDone'
          content.title = 'Trip has been completed'
          content.body = 'Please let us know your feedback'
          if (result.data[0].paymentMode === 'cash') {
            providerWalletInfo = {}
            providerWalletInfo.userId = providerId
            providerWalletInfo.userType = 'provider'
            providerWalletInfo.amount = result.data[0].providerEarning
            var providerWallet = await this.debitWalletService(providerWalletInfo)

            if (!providerWallet.error) {
              providerWalletInfo.type = 'debit'
              providerWalletInfo.description = 'Credit to wallet ' + result.data[0].rideName
              providerTnx = await this.createTransaction(providerWalletInfo)
            }
          } else if (result.data[0].paymentMode === 'wallet') {
            var userWalletInfo = {}
            userWalletInfo.userId = result.data[0].userId
            userWalletInfo.userType = 'user'
            userWalletInfo.amount = result.data[0].estimation
            var userWallet = await this.debitWalletService(userWalletInfo)
            userWalletInfo.type = 'debit'
            userWalletInfo.description = 'Paid by wallet - ' + result.data[0].rideName
            var userTnx = await this.createTransaction(userWalletInfo)
            if (!userTnx.error) {
              var userTnxStatus = {}
              userTnxStatus.status = 'success'
              userTnxStatus.transactId = userTnx.data
              this.editTransaction(userTnxStatus)
            }
            if (!userWallet.error) {
              providerWalletInfo = {}
              providerWalletInfo.userId = providerId
              providerWalletInfo.userType = 'provider'
              providerWalletInfo.amount = result.data[0].providerEarning
              this.creditWalletService(providerWalletInfo)
              providerWalletInfo.type = 'credit'
              providerWalletInfo.description = 'Credit to wallet - ' + result.data[0].rideName
              providerTnx = await this.createTransaction(providerWalletInfo)
              if (!providerTnx.error) {
                providerTnxStatus = {}
                providerTnxStatus.status = 'success'
                providerTnxStatus.transactId = providerTnx.data
                this.editTransaction(providerTnxStatus)
              }
            }
          } else if (result.data[0].paymentMode === 'card') {
            var amount = result.data[0].providerEarning
            var customerId = data.auth.StripeCustomerID
            var cardId = result.data[0].CardId
            var email = data.auth.Email
            var payment = this.stripePaymentCharge(amount, customerId, cardId, email)
            if (!payment.error) {
              providerWalletInfo = {}
              providerWalletInfo.userId = providerId
              providerWalletInfo.userType = 'provider'
              providerWalletInfo.amount = result.data[0].providerEarning
              this.creditWalletService(providerWalletInfo)
              providerWalletInfo.type = 'credit'
              providerWalletInfo.description = 'null'
              providerTnx = this.createTransaction(providerWalletInfo)

              if (!providerTnx.error) {
                providerTnxStatus = {}
                providerTnxStatus.status = 'success'
                providerTnxStatus.transactId = providerTnx.Id
                this.editTransaction(providerTnx)
              }
            }
          }
        } else if (data.action === 'cancel') {
          providerUnblock = 'active'
          this.providerBookingRejectUpdate(providerId, bookingId)
          this.providerLocationStatusUpdate(providerId, providerUnblock, () => {})
          content.data = 'booking_cancelled'
          content.title = 'Your trip has been cancelled'
          content.body = 'Please try after sometime'
        }
        if (userToken.error === false) {
          this.sendPushNotificationByDeviceType(userToken.data, content)
        }
        response.error = false
        response.msg = result.msg
      }
      callback(response)
    })
  }

  this.bookingHandler = async (callback) => {
    var response = {}
    try {
      var content = {}
      const weights = [
        {
          key: 'distance',
          value: -5
        },
        {
          key: 'duration',
          value: -4
        },
        {
          key: 'review',
          value: 7
        },
        {
          key: 'tripCount',
          value: -3
        }
      ]
      var waitingList = await this.getBookingWaitlist()

      if (waitingList.error) {
        response.error = true
        response.msg = waitingList.msg
      } else {
        var bookingId = waitingList.data[0].id
        var cellId = waitingList.data[0].cellId
        var blockList = waitingList.data[0].blockList
        var rideType = waitingList.data[0].rideId
        var source = [waitingList.data[0].lat + ',' + waitingList.data[0].lng]

        const bookingProcess = 'processing'
        const bookingAssigned = 'assigned'
        const bookingCancel = 'cancelled'
        const blockProviderStatus = 'blocked'
        const activeProviderStatus = 'active'

        this.changeBookingStatus(bookingId, bookingProcess)
        var providerList = await this.getActiveProviderByCellId(source, cellId, rideType, activeProviderStatus, weights, blockList)
        if (providerList.error) {
          content.data = 'booking_cancelled'
          content.title = 'Booking Cancelled'
          content.body = 'Sorry we dont have service at your location. Please try after some time'
          var userDeviceInfo = await this.getUserDeviceToken(waitingList.data[0].userDeviceId)
          this.sendPushNotificationByDeviceType(userDeviceInfo.data, content)
          this.changeBookingStatus(bookingId, bookingCancel)
          response.error = true
          response.msg = providerList.msg
        } else {
          var providerId = providerList.data[0].ProviderId
          var providerInfo = await this.getProviderInfo(providerId)
          var providerDetails = null
          if (!providerInfo.error) {
            providerDetails = providerInfo.data
          }
          var assign = await this.updateProviderInBooking(bookingId, providerId, providerDetails)
          content.data = 'incoming_booking'
          content.title = 'Booking Alert'
          content.body = 'You have new booking request'
          var providerToken = await this.getProivderMessageToken(providerId)
          this.sendPushNotificationByDeviceType(providerToken.data, content)
          this.providerLocationStatusUpdate(providerId, blockProviderStatus)
          this.changeBookingStatus(bookingId, bookingAssigned)

          response.error = false
          response.msg = assign.msg
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.reassignBookingCtrl = async (callback) => {
    var reassignWaitingTime
    var userType = 'provider'
    var condition = ['WAITING_TIME']
    var bookingConfig = await this.getBookingAppConfig(userType, condition)
    if (bookingConfig.error) {
      reassignWaitingTime = process.env.REASSIGN_THRESHOLD
    } else {
      reassignWaitingTime = bookingConfig.data.WAITING_TIME
    }
    var booking = await this.reassignBookingService(reassignWaitingTime)
    callback(booking)
  }

  this.providerOngoingBookingCtrl = async (req, callback) => {
    var response = {}
    var data = req
    var bookingStatus = ['assigned', 'accepted', 'pickedup', 'arrived', 'dropped']
    try {
      var booking = await this.getProviderBooking(data.auth.Id, bookingStatus)
      if (booking.error) {
        response.error = true
        response.msg = booking.msg
      } else {
        var bookingInfo = booking.data
        var status = bookingInfo.status
        if (bookingStatus.indexOf(status) >= 0) {
          var userId = bookingInfo.userId
          var userInfo = await this.getUserBookingInfo(userId)
          if (userInfo.error) {
            bookingInfo.userInfo = null
          } else {
            delete bookingInfo.userId
            if (bookingInfo.paymentMode === 'wallet' || booking.data.paymentMode === 'card') {
              bookingInfo.estimation = '0.00'
            }
            bookingInfo.userInfo = userInfo.data
          }
        } else {
          bookingInfo.userInfo = null
        }
        var bookResponse = bookingInfo
        response.error = false
        response.msg = booking.msg
        response.data = bookResponse
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }




  this.providerOngoingBookingStatus = async (req, callback) => {
    var response = {}
    var data = req
    //var bookingStatus = ['assigned', 'accepted', 'pickedup', 'arrived', 'dropped']
    try {
      var booking = await this.getProviderBookingStatus(data.auth)
      if (booking.error) {
        response.error = true
        response.msg = booking.msg
      } else {
        response.error = false
        response.msg = booking.msg

        //response.error = false
        response.data=booking.data;

      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

}
