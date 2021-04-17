module.exports = function () {
  require('../../services/Admin/AdminAppConfigService')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.appConfigEditCtrl = (req, callback) => {
    var response = {}
    this.appConfigEditService(req, (result) => {
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
  this.appConfigViewPageCtrl = (callback) => {
    var response = {}
    this.appConfigViewPageService((result) => {
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
