module.exports = function () {
  require('../../services/Admin/FileUploadService')()
  require('../../Utils/common')()
  require('dotenv').config()

  this.fileUploadCtrl = (req, callback) => {
    var response = {}
    this.fileUploadService(req, (result) => {
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

  this.documentUploadCtrl = (token, req, callback) => {
    var response = {}
    this.documentUploadService(token, req, (result) => {
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
