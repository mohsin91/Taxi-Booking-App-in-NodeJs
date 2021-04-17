module.exports = function () {
  require('../../services/Admin/peekChargesService')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.peekChargesAddCtrl = (req, callback) => {
    var response = {}
    this.peekChargesAddService(req, (result) => {
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
  this.getPeekChargesPageViewCtrl = (req, callback) => {
    var response = {}
    this.peekChargesPageViewService(req, (result) => {
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
  this.getPeekChargesEditListViewCtrl = (req, callback) => {
    var response = {}
    this.getPeekChargesEditListViewService(req, (result) => {
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
  this.peekChargesEditCtrl = (req, callback) => {
    var response = {}
    this.peekChargesEditService(req, (result) => {
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
