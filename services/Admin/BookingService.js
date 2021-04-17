module.exports = function () {
  require('../../repository/Admin/BookingRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.bookingAllDeleteService = async (data, callback) => {
    var response = {}
    try {
      var adminGModelData = await this.bookingAllDelete(data)
      if (adminGModelData.error === false) {
        response.error = false
        response.data = adminGModelData.data[0]
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.bookingsListSelectService = async (data, callback) => {
    var response = {}
    try {
      var bookingscount = await this.bookingsSelectViewCount()
      var bookingsData = await this.bookingsSelectView(data)
      var result = []

      if (bookingsData.error === false && bookingscount.error === false) {
        result.push({
          data: bookingsData.data,
          Count: bookingscount.data[0].count
        })
        response.error = false
        response.data = result
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.getBookingsViewService = async (data, callback) => {
    var response = {}
    try {
      var bookingsData = await this.getBookingsView(data)
      if (bookingsData.error === false) {
        response.error = false
        response.data = bookingsData.data[0]
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.getProviderLocationBookingsViewService = async (data, callback) => {
    var response = {}
    try {
      var providerbookingsData = await this.getProviderLocationBookingsView(data)
      if (providerbookingsData.error === false) {
        response.error = false
        response.data = providerbookingsData.data[0]
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}
