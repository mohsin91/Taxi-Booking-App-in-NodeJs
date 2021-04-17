module.exports = function () {
  require('../../repository/Admin/SearchRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.usersListViewService = async (data, callback) => {
    var response = {}
    try {
      var usersCount = await this.usersListCount()
      var usersListSData = await this.usersListView(data)
      if (usersListSData.error === false && usersCount.error === false) {
        usersListSData.data.forEach((j, index) => {
          var resultdata = this.secureChangerList(j.Email, j.Mobile)
          j.Mobile = resultdata['mobile']
          j.Email = resultdata['email']
        })
        var result = []
        result.push({ data: usersListSData.data }, { Count: usersCount.data[0].count })
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
  this.usersPushNotificationPageViewService = async (data, callback) => {
    var response = {}
    var resresult = []
    try {
      var usersCount = await this.usersListCount()
      var usersListSData = await this.usersPushNotificationListView(data)
      if (usersListSData.error === false && usersCount.error === false) {
        usersListSData.data.forEach((j, index) => {
          var resultdata = this.secureChangerList(j.Email, j.Mobile)
          j.Mobile = resultdata['mobile']
          j.Email = resultdata['email']
          resresult.push({ Id: j.Id, FirstName: j.FirstName, LastName: j.LastName, Image: j.Image, Mobile: j.Mobile })
        })
        var result = []
        result.push({ data: resresult }, { Count: usersCount.data[0].count })
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
  this.usersPushNotificationSearchDataViewService = async (data, callback) => {
    var response = {}
    var resresult = []
    try {
      var usersSDCount = await this.usersListCount()
      var usersSDListSData = await this.usersPushNotificationSearchDataListView(data)
      if (usersSDListSData.error === false && usersSDCount.error === false) {
        usersSDListSData.data.forEach((j, index) => {
          var resultdata = this.secureChangerList(j.Email, j.Mobile)
          j.Mobile = resultdata['mobile']
          j.Email = resultdata['email']
          resresult.push({ Id: j.Id, FirstName: j.FirstName, LastName: j.LastName, Image: j.Image, Mobile: j.Mobile })
        })
        var result = []
        result.push({ data: resresult }, { Count: usersSDCount.data[0].count })
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
  this.commonSearchViewService = async (datas, callback) => {
    var response = {}
    var typename = datas.typename
    switch (typename) {
      case 'users':
        var udata = { table_name: 'Users', search: datas.search, limit: datas.limit, page: datas.page }
        var resresult = []
        try {
          var usersSDCount = await this.usersSearchDataListCount(udata)
          var usersSDListSData = await this.usersSearchDataListView(udata)
          if (usersSDListSData.error === false && usersSDCount.error === false) {
            usersSDListSData.data.forEach((j, index) => {
              var resultdata = this.secureChangerList(j.Email, j.Mobile)
              j.Mobile = resultdata['mobile']
              j.Email = resultdata['email']
              resresult.push({ Id: j.Id, FirstName: j.FirstName, LastName: j.LastName, Image: j.Image, Mobile: j.Mobile, Email: j.Email, ExtCode: j.ExtCode })
            })
            var result = []
            result.push({ data: resresult }, { Count: usersSDCount.data.length })
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
        break
      case 'providers':
        var pdata = { table_name: 'Provider', search: datas.search, limit: datas.limit, page: datas.page }
        var presresult = []
        try {
          var providersSDCount = await this.usersSearchDataListCount(pdata)
          var providersSDListSData = await this.usersSearchDataListView(pdata)
          if (providersSDListSData.error === false && providersSDCount.error === false) {
            providersSDListSData.data.forEach((j, index) => {
              var resultdata = this.secureChangerList(j.Email, j.Mobile)
              j.Mobile = resultdata['mobile']
              j.Email = resultdata['email']
              presresult.push({ Id: j.Id, FirstName: j.FirstName, LastName: j.LastName, Image: j.Image, Mobile: j.Mobile, Status: j.Status, Email: j.Email, ExtCode: j.ExtCode, Latitude: j.Latitude, Longitude: j.Longitude, Bearing: j.Bearing })
            })
            var presult = []
            presult.push({ data: presresult }, { Count: providersSDCount.data.length })
            response.error = false
            response.data = presult
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
        break
      case 'country':
        try {
          var data = {}
          var countrycount = await this.commonSearchDataListCount(data)
          var adminSCountryData = await this.commonSearchDataListView(data)
          var cresult = []
          if (adminSCountryData.error === false && countrycount.error === false) {
            cresult.push({
              data: adminSCountryData.data,
              Count: countrycount.data[0].count
            })
            response.error = false
            response.data = cresult
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
        break
      case 'bookings':
        try {
          var bdata = { table_name: 'Booking', search: datas.search, limit: datas.limit, page: datas.page }
          var bookingcount = await this.bookingSearchDataListView(bdata)
          var bookingData = await this.bookingSearchDataListView(bdata)
          var bresult = []
          if (bookingData.error === false && bookingcount.error === false) {
            bresult.push({
              data: bookingData.data,
              Count: bookingcount.data.length
            })
            response.error = false
            response.data = bresult
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
        break

      default:
        response.error = true
        response.msg = 'FAILED'
        callback(response)
        break
    }
  }
}
