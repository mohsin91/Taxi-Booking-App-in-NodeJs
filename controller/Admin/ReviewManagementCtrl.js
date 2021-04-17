module.exports = function () {
  require('../../services/Admin/ReviewManagementService')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.admingetUserProviderReviewManagementCtrl = (req, callback) => {
    var response = {}
    this.admingetUserProviderReviewManagementService(req, (result) => {
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
