module.exports = function () {
  require('../../repository/Admin/AppSliderRepository')()
  require('../../Utils/common')()
  require('dotenv').config()

  this.appSliderAddService = async (data, callback) => {
    var response = {}
    try {
      var appsliderdata = {
        Title: data.Title,
        Description: data.Description,
        Image: data.Image,
        Type: data.Type
      }
      var appsliderInsertData = await this.appSliderAdd(appsliderdata)
      if (appsliderInsertData.error === false) {
        response.error = false
        response.data = appsliderInsertData.data[0]
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
  this.appSliderPageViewService = async (data, callback) => {
    var response = {}
    try {
      var appslidercount = await this.appSliderPageViewListcount()
      var appsliderPSelectSData = await this.appSliderPageView(data)
      var result = []
      if (appsliderPSelectSData.error === false && appslidercount.error === false) {
        result.push({
          data: appsliderPSelectSData.data,
          Count: appslidercount.data[0].count
        })
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
  this.getappSliderViewService = async (data, callback) => {
    var response = {}
    try {
      var appsliderData = await this.getappSliderView(data)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data[0]
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
  this.appSliderEditService = async (data, callback) => {
    var response = {}
    try {
      var resData = {
        Title: data.Title,
        Description: data.Description,
        Image: data.Image,
        Type: data.Type
      }
      var appsliderdata = {
        data: resData,
        where: { Id: data.Id }
      }
      var appsliderData = await this.appSliderEdit(appsliderdata)
      if (appsliderData.error === false) {
        response.error = false
        response.data = appsliderData.data
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
  this.appSliderDeleteService = async (data, callback) => {
    var response = {}
    try {
      var appsliderdeletedata = { Id: data.id }
      var appsliderData = await this.appSliderDelete(appsliderdeletedata)
      if (appsliderData.error === false) {
        response.error = false
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
