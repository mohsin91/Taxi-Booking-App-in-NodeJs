module.exports = function () {
  require('../../services/Admin/EmailTemplateService')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.emailTemplateAddCtrl = (req, callback) => {
    var response = {}
    this.emailTemplateAddService(req, (result) => {
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
  this.emailTemplateViewCtrl = (callback) => {
    var response = {}
    this.emailTemplateViewService((result) => {
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
  this.emailTemplateSelectCtrl = (req, callback) => {
    var response = {}
    this.emailTemplatePagesListViewService(req, (result) => {
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
  this.getEmailTemplatePagesViewCtrl = (req, callback) => {
    var response = {}
    this.getEmailTemplatePagesViewService(req, (result) => {
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
  this.emailTemplateEditCtrl = (req, callback) => {
    var response = {}
    this.emailTemplateEditService(req, (result) => {
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
