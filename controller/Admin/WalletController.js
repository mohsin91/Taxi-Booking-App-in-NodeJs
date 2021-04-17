module.exports = function () {
  require('../../services/Admin/WalletService')()
  require('../../Utils/common')()
  require('dotenv').config()

  this.getWithdrawlListViewCtrl = (req, callback) => {
    var response = {}
    this.getWithdrawlListViewService(req, (result) => {
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
  this.withDrawlRequestStatusUpdateCtrl = (req, callback) => {
    var response = {}
    this.withDrawlRequestStatusUpdateService(req, (result) => {
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
