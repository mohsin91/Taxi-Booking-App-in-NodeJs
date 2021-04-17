module.exports = function () {
  require('../../Utils/common')()
  require('dotenv').config()

  this.fileUploadService = async (data, callback) => {
    var response = {}
    try {
      var imgupload = await this.imageUpload(data.req, data.res)
      if (imgupload.error === false) {
        response.error = false
        response.data = imgupload.msg
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

  //Document upload
  
  this.documentUploadService = async (token,data, callback) => {
    var response = {}
    try {
      var imgupload = await this.documentUploads(token,data.req, data.res)
      if (imgupload.error === false) {
        response.error = false
        response.data = imgupload.file
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
