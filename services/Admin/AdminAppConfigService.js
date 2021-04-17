module.exports = function () {
  require('../../repository/Admin/AdminAppConfigRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.appConfigEditService = async (data, callback) => {
    var response = {}
    try {
      var appconfigdata = {
        data: {
          Value: data.Value
        },
        where: {
          Id: data.Id
        }
      }
      var appUCountryData = await this.appConfigEdit(appconfigdata)
      if (appUCountryData.error === false) {
        response.error = false
        response.data = appUCountryData.data
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
  this.appConfigViewPageService = async (callback) => {
    var response = {}
    try {
      var appconfigPSelectSData = await this.appConfigPageView()
      var result = []
      result.push({
        data: appconfigPSelectSData.data
      })
      if (appconfigPSelectSData.error === false) {
        response.error = false
        response.data = result
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
