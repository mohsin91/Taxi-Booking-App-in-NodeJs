module.exports = function () {
  require('../../services/Admin/DashboardService')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.admindashboardListViewCtrl = (callback) => {
    var response = {}
    this.admindashboardListViewService((result) => {
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
