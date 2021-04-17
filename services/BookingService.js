module.exports = function () {
  require('../repository/BookingRepository')()
  require('../thirdParty/geoHelper')()

  this.getRideTypeByCountry = async (data, callback) => {
    var response = {}
    try {
      var origin = [data.pickUpLatitude + ',' + data.pickUpLongitude]
      var destiny = [data.destinyLatitude + ',' + data.destinyLongitude]

      var ride = {}
      var availableRides = []
      // ride.CountryId = 1

      var geoDistance = await this.getDistanceInKM(origin, destiny)

      var rides = await this.getRideVechileType(ride)
      if (rides.error) {
        response.error = true
        response.msg = 'SERVICE_NOT_AVAILABLE'
      } else {
        rides.result.forEach(element => {
          var rideType = {}
          rideType.id = element.Id
          rideType.name = element.Name
          rideType.iconPassive = element.IconPassive
          rideType.iconActive = element.IconActive
          rideType.priceValue = this.getFareEstimation(element.BaseCharge, element.MinCharge, geoDistance.result.distance)
          rideType.priceText = element.CurrencyType + ' ' + rideType.priceValue
          rideType.waitingCharge = element.WaitingCharge
          rideType.capacity = element.Capacity
          rideType.shortDesc = element.ShortDesc
          rideType.longDesc = element.LongDesc
          availableRides.push(rideType)
        })
        response.error = false
        response.msg = 'VALID'
        response.data = availableRides
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.bookRideService = async (data, callback) => {
    var response = {}
    try {
      var origin = [data.pickUpLatitude + ',' + data.pickUpLongitude]
      var destiny = [data.destinyLatitude + ',' + data.destinyLongitude]

      var rideDetails = await this.fetchRideVechileTypeUsingId(data.rideType)

      if (rideDetails.error) {
        response.error = true
        response.msg = 'INVALID_RIDE'
      } else {
        var getDistance = await this.getDistanceInKM(origin, destiny)
        var booking = {}
        booking.UserId = data.auth.Id
        booking.UserDeviceId = data.auth.Device
        booking.FromLocation = data.pickUpLocation
        booking.ToLocation = data.dropLocation
        booking.SourceLat = data.pickUpLatitude
        booking.SourceLong = data.pickUpLongitude
        booking.DestinyLat = data.destinyLatitude
        booking.DestinyLong = data.destinyLongitude
        booking.RideTypeId = data.rideType
        booking.Distance = getDistance.result.distance
        booking.PaymentMode = data.paymentMode
        booking.BookingType = data.bookingType
        booking.SeatCount = data.seats
        if (data.bookingType === 'later') {
          booking.BookingTimestamp = data.bookingTimestamp
          booking.CreateAt = data.bookingTimestamp
        }
        if (data.isCouponApplied === 'yes') {
          booking.isCouponApplied = 'yes'
          booking.RedeemedId = data.redeemedId
          booking.DiscountAmount = data.discountAmount
        }
        var cellId = await this.getCellIdFromCoordinates(data.pickUpLatitude, data.pickUpLongitude)
        booking.S2CellId = cellId.id
        booking.Estimation = this.getFareEstimation(rideDetails.result.BaseCharge, rideDetails.result.MinCharge, booking.Distance)
        booking.TotalEarning = booking.Estimation * data
        booking.CurrencyType = rideDetails.result.CurrencyType
        booking.TotalAmount = booking.Estimation
        booking.ProviderRejectedIds = '[]'
        booking.TotalEarning = (booking.Estimation * rideDetails.result.CommissionPercentage) / 100
        booking.ProviderEarning = booking.Estimation - booking.TotalEarning
        booking.RideName = rideDetails.result.Name
        booking.Status = 'waiting'

        var bookingDetails = await this.createBooking(booking)

        if (bookingDetails.error) {
          response.error = true
          response.msg = 'BOOKING_UNAVAILABLE'
        } else {
          response.error = false
          response.msg = 'BOOKING_ADDED'
          response.data = { bookingNo: bookingDetails.result }
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }

  this.getBookingWaitlist = () => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        var status = ['waiting']
        condition.ProviderId = null
        var limit = 1
        var waitingList = await this.fetchBookingUsingState(condition, status, limit)
        if (waitingList.error) {
          response.error = true
          response.msg = 'NO_NEW_BOOKING'
        } else {
          var result = waitingList.result.map((element) => {
            var data = {}
            data['id'] = element.Id
            data['userDeviceId'] = element.UserDeviceId
            data['lat'] = element.SourceLat
            data['lng'] = element.SourceLong
            data['cellId'] = element.S2CellId
            data['rideId'] = element.RideTypeId
            data['blockList'] = element.ProviderRejectedIds
            return data
          })
          response.error = false
          response.msg = 'VALID'
          response.data = result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.updateProviderInBooking = async (bookingId, providerId, providerDetails) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        var data = {}
        condition.Id = bookingId
        data.ProviderId = providerId
        data.VehicleName = providerDetails.vechileName + '(' + providerDetails.vechileModel + ')'
        var provider = await this.updateBookingProviderId(condition, data)
        if (provider.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],Provider Id'
        } else {
          response.error = false
          response.msg = 'NEW_BOOKING'
        }
        resolve(response)
      } catch (err) {
        response.error = true
      }
    })
  }

  this.providerBookingUpdateService = async (data, callback) => {
    var response = {}
    try {
      var update = {}
      var condition = {}
      condition.Id = data.bookingNo
      var status = data.action
      var message

      if (status === 'DriverAccepted') {
        update.Status = 'DriverAccepted'
        message = 'BOOKING_ACCEPT'
      } else if (status === 'DriverArrived') {
        update.Status = 'DriverArrived'
        message = 'PROVIDER_ARRIVED'
      } else if (status === 'RideStarted') {
        update.Status = 'RideStarted'
        message = 'PROVIDER_PICKUP'
      } else if (status === 'RideEnded') {
        update.Status = 'RideEnded'
        message = 'PROVIDER_DROP'
      } else if (status === 'Cancelled') {
        update.CancelledBy = 'provider'
        update.Status = 'Cancelled'
        message = 'BOOKING_CANCEL'
      } else if (status === 'PaymentDone') {
        update.Status = 'PaymentDone'
        update.IsActive = 'no'
        message = 'BOOKING_COMPLETE'
      } else if (status === 'reject') {
        update.CancelledBy = 'provider'
        update.Status = 'waiting'
        update.IsActive = 'yes'
        update.ProviderId = null
        message = 'BOOKING_REJECT'
      }
      var booking = await this.updateBookingState(condition, update)
      if (booking.error) {
        response.error = true
        response.msg = 'UPDATE_ERROR: $[1],booking status'
      } else {
        var bookingDetails = await this.fetchBookingInfo(condition)

        var bookingInfo = bookingDetails.result.map(element => {
          var booking = {}
          booking['bookingNo'] = element.Id
          booking['userId'] = element.UserId
          booking['userDeviceId'] = element.UserDeviceId
          booking['fromLocation'] = element.FromLocation
          booking['toLocation'] = element.ToLocation
          booking['paymentMode'] = element.PaymentMode
          booking['distance'] = element.Distance
          booking['currencyType'] = element.CurrencyType
          booking['tax'] = element.Tax
          booking['waitingCharges'] = element.WaitingCharges
          booking['totalAmount'] = element.TotalAmount
          booking['vehicleName'] = element.VehicleName
          booking['rideName'] = element.RideName
          booking['estimation'] = element.Estimation
          booking['sourceLat'] = element.SourceLat
          booking['sourceLong'] = element.SourceLong
          booking['destinyLat'] = element.DestinyLat
          booking['destinyLong'] = element.DestinyLong
          booking['createAt'] = element.CreateAt
          booking['status'] = element.Status
          booking['providerEarning'] = element.ProviderEarning
          return booking
        })

        response.error = false
        response.msg = message
        response.data = bookingInfo
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.changeBookingStatus = async (bookingId, status) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        condition.Id = bookingId
        var data = {}
        data.Status = status
        var booking = await this.updateBookingState(condition, data)
        if (booking.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],booking'
        } else {
          response.error = false
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.bookingCancellation = async (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        condition.Id = data.Id
        var booking = await this.updateBookingState(condition, data)
        if (booking.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],booking'
        } else {
          response.error = false
          response.msg = 'BOOKING_CANCEL'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getProviderBooking = async (providerId, status) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var limit = 1
        var condition = {}
        condition.ProviderId = providerId
        var bookingDetails = await this.fetchBookingUsingState(condition, status, limit)
        if (bookingDetails.error) {
          response.error = true
          response.msg = 'NO_BOOKING'
        } else {
          var booking = bookingDetails.result.map(element => {
            var data = {}
            data['bookingId'] = element.Id
            data['fromLocation'] = element.FromLocation
            data['toLocation'] = element.ToLocation
            data['sourceLat'] = element.SourceLat
            data['sourceLong'] = element.SourceLong
            data['destinyLat'] = element.DestinyLat
            data['destinyLong'] = element.DestinyLong
            data['status'] = element.Status
            data['startTime'] = this.timeStampFormatter(element.UpdateAt)
            data['currentTime'] = this.timeStampFormatter(new Date())
            if (status.indexOf(element.Status)) {
              data['paymentMode'] = element.PaymentMode
              data['estimation'] = element.CurrencyType + element.Estimation
              data['userId'] = element.UserId
            }
            data['rideType'] = element.RideName
            return data
          })
          response.error = false
          response.msg = 'NEW_BOOKING'
          response.data = booking[0]
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getBookingInfo = async (data, status) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var bookingDetails = await this.fetchBookingInfo(data)
        if (bookingDetails.error) {
          response.error = true
          response.msg = 'INVALID_BOOKING'
        } else {
          response.error = false
          response.msg = 'VALID'
          response.data = bookingDetails.result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.reassignBookingService = (timer) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var status = ['assigned']
        var data = {}
        data.ProviderId = null
        data.Status = 'waiting'
        data.IsActive = 'no'
        var booking = await this.updatenWaitingBookingList(data, status, timer)
        if (booking.error) {
          response.error = true
          response.msg = 'NO_BOOKING_REASSIGNED'
        } else {
          response.error = false
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getUserActiveBooking = (userId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var status = ['accepted', 'processing', 'waiting', 'pickedup', 'arrived', 'dropped', 'assigned', 'completed']
        var data = {}
        data.UserId = userId
        data.IsUserReviewed = 'no'
        var limit = 1
        var bookingInfo = await this.fetchBookingUsingState(data, status, limit)
        if (bookingInfo.error) {
          response.error = true
          response.msg = 'NO_BOOKING'
        } else {
          var bookingDetails = bookingInfo.result.map(element => {
            var booking = {}
            booking['id'] = element.Id
            booking['providerId'] = element.ProviderId
            booking['fromLocation'] = element.FromLocation
            booking['toLocation'] = element.ToLocation
            booking['status'] = element.Status
            booking['estimation'] = element.Estimation
            booking['currency'] = element.CurrencyType
            booking['sourceLat'] = element.SourceLat
            booking['sourceLong'] = element.SourceLong
            booking['destinyLat'] = element.DestinyLat
            booking['destinyLong'] = element.DestinyLong
            booking['totalAmt'] = element.CurrencyType + ' ' + element.TotalAmount
            booking['rideId'] = element.RideTypeId
            return booking
          })
          response.error = false
          response.msg = 'ACTIVE_BOOKING'
          response.data = bookingDetails[0]
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getUserBookingHistory = (userId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var user = {}
        user.UserId = userId
        var booking = await this.fetchBookingInfo(user)
        if (booking.error) {
          response.error = true
          response.msg = 'NO_BOOKING'
        } else {
          var bookingInfo = booking.result.map(element => {
            var data = {}
            data['bookingNo'] = element.Id
            data['sourceLat'] = element.SourceLat
            data['soruceLong'] = element.SourceLong
            data['destinyLat'] = element.DestinyLat
            data['destinyLong'] = element.DestinyLong
            data['estimation'] = element.Estimation
            data['total'] = element.CurrencyType + element.TotalAmount
            data['isActive'] = element.IsActive
            data['status'] = element.Status
            data['vehicleName'] = element.VehicleName === null ? 'Test Vehicle' : element.VehicleName
            data['paymentMode'] = element.PaymentMode
            data['createdTime'] = element.CreateAt
            return data
          })

          response.error = false
          response.msg = 'VALID'
          response.data = bookingInfo
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getProviderBookingStatics = (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var data = []
        var today = await this.fetchProviderBookingStatistics(providerId, 'day')

        var todayEarning = {}
        todayEarning.title = 'Today'
        todayEarning.sub_title_1 = 'Trips'
        todayEarning.sub_title_2 = 'Earnings'
        todayEarning.value_1 = String(today.result.TripCount)
        todayEarning.value_2 = today.result.TripCount > 0 ? today.result.CurrencyType + ' ' + today.result.ProviderEarning : '0'
        todayEarning.key = 'day'
        data.push(todayEarning)

        var week = await this.fetchProviderBookingStatistics(providerId, 'week')

        var weekEarning = {}
        weekEarning.title = 'This week'
        weekEarning.sub_title_1 = 'Trips'
        weekEarning.sub_title_2 = 'Earnings'
        weekEarning.value_1 = String(week.result.TripCount)
        weekEarning.value_2 = week.result.TripCount > 0 ? week.result.CurrencyType + ' ' + week.result.ProviderEarning : '0'
        weekEarning.key = 'week'
        data.push(weekEarning)

        var month = await this.fetchProviderBookingStatistics(providerId, 'month')

        var monthEarning = {}
        monthEarning.title = 'This month'
        monthEarning.sub_title_1 = 'Trips'
        monthEarning.sub_title_2 = 'Earnings'
        monthEarning.value_1 = String(month.result.TripCount)
        monthEarning.value_2 = month.result.TripCount > 0 ? month.result.CurrencyType + ' ' + month.result.ProviderEarning : '0'
        monthEarning.key = 'month'
        data.push(monthEarning)

        var year = await this.fetchProviderBookingStatistics(providerId, 'year')

        var yearEarning = {}
        yearEarning.title = 'This Year'
        yearEarning.sub_title_1 = 'Trips'
        yearEarning.sub_title_2 = 'Earnings'
        yearEarning.value_1 = String(year.result.TripCount)
        yearEarning.value_2 = year.result.TripCount > 0 ? year.result.CurrencyType + ' ' + year.result.ProviderEarning : '0'
        yearEarning.key = 'year'
        data.push(yearEarning)

        response.error = false
        response.data = data
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getProviderEarnings = async (providerId, duration, callback) => {
    var response = {}
    try {
      var earning = await this.fetchProviderBookingEarnings(providerId, duration)
      if (earning.error) {
        response.error = true
        response.data = []
      } else {
        var earningList = earning.result.map(element => {
          var data = {}
          data['earnings'] = element.CurrencyType + ' ' + element.ProviderEarning
          data['rideName'] = element.RideName
          data['distance'] = String(element.Distance)
          data['paymentMode'] = element.PaymentMode
          data['date'] = this.dateFormatter(element.CreateAt)
          data['createdAt'] = element.CreateAt
          return data
        })
        response.error = false
        response.data = earningList
      }
      callback(response)
    } catch (err) {
      err.error = true
      callback(err)
    }
  }

  this.providerBookingRejectUpdate = (providerId, bookingId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var booking = await this.updateRejectProvider(providerId, bookingId)
        if (booking.error) {
          response.error = true
        } else {
          response.error = false
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getUserBookingFeedback = (userId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var feedback = await this.fetchUserBookingPendingFeedback(userId)
        if (feedback.error) {
          response.error = true
        } else {
          response.error = false
          response.data = feedback.result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.updateUserBookingFeedback = (bookingNo, userId, action) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var condition = {}
        condition.Id = bookingNo
        condition.UserId = userId
        var data = {}
        data.IsUserReviewed = action
        var booking = await this.updateBookingState(condition, data)
        if (booking.error) {
          response.error = true
        } else {
          response.error = false
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getProviderSerivceTypeService = async (data, callback) => {
    var response = {}
    try {
      var ride = {}
      ride.CountryId = 1
      var rides = await this.getRideVechileType(ride)
      if (rides.error) {
        response.error = true
        response.msg = 'SERVICE_NOT_AVAILABLE'
      } else {
        var rideList = rides.result.map(elements => {
          var rideInfo = {}
          rideInfo['id'] = elements.Id
          rideInfo['name'] = elements.Name
          return rideInfo
        })
        response.error = false
        response.msg = 'VALID'
        response.data = rideList
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getProviderSelectedServiceList = (serivesIds) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var rideList = await this.getServiceTypeUsingIds(serivesIds)
        if (rideList.error) {
          response.error = true
          response.msg = 'SERVICE_NOT_AVAILABLE'
        } else {
          response.error = false
          response.data = rideList.result
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getRideTypeDetailService = (rideTypeId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var rideList = await this.fetchRideVechileTypeUsingId(rideTypeId)
        if (rideList.error) {
          response.error = true
          response.msg = 'OOPS'
        } else {
          var result = rideList.result
          var data = {}
          data.rideName = result.Name
          data.rideImage = result.IconActive
          response.error = false
          response.msg = 'VALID'
          response.data = data
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }


  this.getProviderBookingStatus = async (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        
        var bookingDetails = await this.fetchBookingStatus(data)
        if (bookingDetails.error) {
          response.error = true
          response.msg = 'NO_BOOKING'
        } else {
          
          response.error = false
          response.msg = 'VALID'
          response.data = bookingDetails
        //   bookingDetails.error=false;
        //   response.error=false;
        //  response=bookingDetails;
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }
}
