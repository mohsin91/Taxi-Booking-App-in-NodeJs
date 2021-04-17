module.exports = function () {
  require('../../services/Admin/DoctypeService')()
  require('../../Utils/common')()
  require('dotenv').config()

  this.adminDocTypeInsertCtrl = (req, callback) => {
    var response = {}
    this.adminDocTypeInsertService(req, (result) => {
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
  this.adminDocTypeSelectCtrl = (callback) => {
    var response = {}
    this.adminDocTypeSelectService((result) => {
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
  this.admindocTypeViewPageCtrl = (req, callback) => {
    var response = {}
    this.admindocTypeViewPageService(req, (result) => {
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
  this.adminGetDoctypeViewCtrl = (req, callback) => {
    var response = {}
    this.adminGetDoctypeViewService(req, (result) => {
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
  this.adminDocTypeUpdateCtrl = (req, callback) => {
    var response = {}
    this.adminDocTypeUpdateService(req, (result) => {
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
