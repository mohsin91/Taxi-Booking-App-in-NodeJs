module.exports = function () {
  require('../../repository/Admin/ProvidersRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.providersListViewService = async (data, callback) => {
    var response = {}
    try {
      var providersCount = await this.providersListCount()
      var providersListSData = await this.providersListView(data)
      if (providersListSData.error === false && providersCount.error === false) {
        providersListSData.data.forEach((j, index) => {
          var resultdata = this.secureChangerList(j.Email, j.Mobile)
          j.Mobile = resultdata['mobile']
          j.Email = resultdata['email']
        })
        var result = []
        result.push({ data: providersListSData.data }, { Count: providersCount.data[0].count })
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
  this.getProviderViewService = async (data, callback) => {
    var response = {}
    try {
      var appsliderData = await this.getProviderView(data)
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
  this.getProviderDocViewService = async (data, callback) => {
    var response = {}
    try {
      var appsliderData = await this.getProviderDocView(data)
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
  this.providerDocEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = data.updata
      result.where = data.Id
      var providerDocUData = await this.providerDocDataEdit(result)
      if (providerDocUData.error === false) {
        response.error = false
        response.data = providerDocUData.data
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
  this.providerEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = data.updata
      result.where = data.Id
      var providerEditUData = await this.providerDataEdit(result)
      if (providerEditUData.error === false) {
        response.error = false
        response.data = providerEditUData.data
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
  this.providersPushNotificationPageViewService = async (data, callback) => {
    var response = {}
    var resresult = []
    try {
      var providersCount = await this.providersListCount()
      var providersListSData = await this.providersPushNotificationListView(data)
      if (providersListSData.error === false && providersCount.error === false) {
        providersListSData.data.forEach((j, index) => {
          var resultdata = this.secureChangerList(j.Email, j.Mobile)
          j.Mobile = resultdata['mobile']
          j.Email = resultdata['email']
          resresult.push({ Id: j.Id,
            FirstName: j.FirstName,
            LastName: j.LastName,
            Image: j.Image,
            Mobile: j.Mobile,
            Latitude: j.Latitude,
            Longitude: j.Longitude,
            Bearing: j.Bearing })
        })
        var result = []
        result.push({ data: resresult }, { Count: providersCount.data[0].count })
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
  this.providerPushNotificationSearchDataViewService = async (data, callback) => {
    var response = {}
    var resresult = []
    try {
      var providersSDCount = await this.providersListCount()
      var providersSDListSData = await this.providersPushNotificationSearchDataListView(data)
      if (providersSDListSData.error === false && providersSDCount.error === false) {
        providersSDListSData.data.forEach((j, index) => {
          var resultdata = this.secureChangerList(j.Email, j.Mobile)
          j.Mobile = resultdata['mobile']
          j.Email = resultdata['email']
          resresult.push({ Id: j.Id, FirstName: j.FirstName, LastName: j.LastName, Image: j.Image, Mobile: j.Mobile })
        })
        var result = []
        result.push({ data: resresult }, { Count: providersSDCount.data[0].count })
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
  this.providersPushNotificationSendService = async (datas, callback) => {
    var response = {}
    var gcimddata = []
    try {
      var data = datas.data
      var providerpushsendData = await this.providersPushNotificationSendList(data)
      providerpushsendData.data.map(x => {
        if (x.GCMId !== '' && x.GCMId !== 'NULL' && typeof x.GCMId !== 'object') {
          gcimddata.push(x.GCMId)
        }
      })
      var sendmsgdata = await this.sendBulkPushNotification(gcimddata, datas.msg)
      if (providerpushsendData.error === false) {
        response.error = false
        response.data = sendmsgdata
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
  this.getProviderDetailsListViewService = async (data, callback) => {
    var response = {}
    try {
      var providerdetailsData = await this.getProviderView(data)
      if (providerdetailsData.error === false) {
        response.error = false
        response.data = providerdetailsData.data[0]
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
  this.getProviderVehicleListViewService = async (data, callback) => {
    var response = {}
    var ridevehiclearr = []
    var ridevehiclename = ''
    try {
      var providervehicledetailsData = await this.getProviderVehicleListView(data)
      if (providervehicledetailsData.error === false) {
        providervehicledetailsData.data.filter(async (x) => {
          var providerridevehicledetailsData = await this.getProviderRideVehicleTypeListView(x.RideVehicleTypeId)
          if (providerridevehicledetailsData.error === false) {
            providerridevehicledetailsData.data.filter((m) => {
              ridevehiclename += m.Name + ','
            })
            ridevehiclename = ridevehiclename.slice(0, -1)
            x['RideVehicleTpeName'] = ridevehiclename
            ridevehiclearr.push(x)
            ridevehiclename = ''
          }
          if (--providervehicledetailsData.data.length === 0) {
            response.error = false
            response.data = ridevehiclearr
            response.msg = 'VALID'
            callback(response)
          }
        })
      } else {
        response.error = true
        response.msg = 'FAILED'
        callback(response)
      }
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.providerVehicleEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = data.updata
      result.where = data.Id
      var providervehicleEditUData = await this.providerVehicleEdit(result)
      if (providervehicleEditUData.error === false) {
        response.error = false
        response.data = providervehicleEditUData.data
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
  this.providerVehicleDocumentsEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = data.updata
      result.where = data.Id
      var providervehicleDocEditUData = await this.providerVehicleDocumentsEdit(result)
      if (providervehicleDocEditUData.error === false) {
        response.error = false
        response.data = providervehicleDocEditUData.data
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

  this.getProviderVehicleDocumentsDetailsListViewService = async (data, callback) => {
    var response = {}
    try {
      var providervehicledocdetailsData = await this.getProviderVehicleDocumentsDetailsListView(data)
      if (providervehicledocdetailsData.error === false) {
        response.error = false
        response.data = providervehicledocdetailsData.data
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
