module.exports = function () {
  require('../../services/Admin/BookingService')()
  require('../../Utils/common')()
  require('dotenv').config()

  this.bookingAllDeleteCtrl = (req, callback) => {
    var response = {}
    this.bookingAllDeleteService(req, (result) => {
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
  this.bookingsListSelectCtrl = (req, callback) => {
    var response = {}
    this.bookingsListSelectService(req, (result) => {
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
  this.getBookingsViewCtrl = (req, callback) => {
    var response = {}
    this.getBookingsViewService(req, (result) => {
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
  this.getProviderLocationBookingsViewCtrl = (req, callback) => {
    var response = {}
    this.getProviderLocationBookingsViewService(req, (result) => {
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
