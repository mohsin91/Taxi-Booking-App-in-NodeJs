module.exports = function () {
  require('../../services/Admin/PromoCodesService')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.promoCodesAddCtrl = (req, callback) => {
    var response = {}
    this.promoCodesAddService(req, (result) => {
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
  this.getPromoCodesListViewCtrl = (callback) => {
    var response = {}
    this.getPromoCodesListViewService((result) => {
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
  this.getPromoCodesEditListViewCtrl = (req, callback) => {
    var response = {}
    this.getPromoCodesEditListViewService(req, (result) => {
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
  this.promoCodesEditCtrl = (req, callback) => {
    var response = {}
    this.promoCodesEditService(req, (result) => {
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
  this.promoCodesStatusUpdateCtrl = (req, callback) => {
    var response = {}
    this.promoCodesStatusUpdateService(req, (result) => {
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
