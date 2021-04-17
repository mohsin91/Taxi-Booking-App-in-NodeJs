module.exports = function () {
  require('../../services/Admin/AppSliderService')()
  require('../../Utils/common')()
  require('dotenv').config()

  this.appSliderAddCtrl = (req, callback) => {
    var response = {}
    this.appSliderAddService(req, (result) => {
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
  this.appSliderPageViewCtrl = (req, callback) => {
    var response = {}
    this.appSliderPageViewService(req, (result) => {
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
  this.getappSliderViewCtrl = (req, callback) => {
    var response = {}
    this.getappSliderViewService(req, (result) => {
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
  this.appSliderEditCtrl = (req, callback) => {
    var response = {}
    this.appSliderEditService(req, (result) => {
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
  this.appSliderDeleteCtrl = (req, callback) => {
    var response = {}
    this.appSliderDeleteService(req, (result) => {
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
}
