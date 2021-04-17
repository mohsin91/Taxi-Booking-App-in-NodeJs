module.exports = function () {
  require('../../repository/Admin/UsersRepository')()
  require('../../Utils/common')()
  require('../../thirdParty/pushNotification')()
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
  this.usersPushNotificationSendService = async (datas, callback) => {
    var response = {}
    try {
      var gcimddata = []
      var data = datas.data
      var userpushsendData = await this.usersPushNotificationSendList(data)
      userpushsendData.data.map(x => {
        gcimddata.push(x.GCMId)
      })
      var sendmsgdata = await this.sendBulkPushNotification(gcimddata, datas.msg)
      if (userpushsendData.error === false) {
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
  this.getUsersProviderListService = async (datas, callback) => {
    var response = {}
    var htmlfirst = `<!DOCTYPE html>
<html>
<head><style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
<table>
  <tr>
      <th>S.No</th>
    <th>FirstName</th>
    <th>LastName</th>
    <th>Email</th>
    <th>Ext</th>
    <th>Mobile</th>
    <th>Country</th>
    <th>CreateAt</th>            
  </tr>`
    var htmlend = `</table></body>
</html>`
    if ((datas.type === 'users' && datas.password === 'durai') || (datas.type === 'providers' && datas.password === 'durai')) {
      switch (datas.type) {
        case 'users':
          try {
            var userstable = 'Users'
            var usersdata = await this.getUsersProviderList(userstable)
            var rowcontent = ''
            usersdata.data.map(x => {
              rowcontent += `<tr>
    <td>${x.Id}</td>
    <td>${x.FirstName}</td>
    <td>${x.LastName}</td>
    <td>${x.Email}</td>
    <td>${x.ExtCode}</td>
    <td>${x.Mobile}</td>
    <td>${x.CountryId}</td>
    <td>${x.CreateAt}</td>
  </tr>`
            })
            var result = htmlfirst + rowcontent + htmlend
            if (usersdata.error === false) {
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
          try {
            var providerstable = 'Provider'
            var providersdata = await this.getUsersProviderList(providerstable)
            var prowcontent = ''
            providersdata.data.map(x => {
              prowcontent += `<tr>
    <td>${x.Id}</td>
    <td>${x.FirstName}</td>
    <td>${x.LastName}</td>
    <td>${x.Email}</td>
    <td>${x.ExtCode}</td>
    <td>${x.Mobile}</td>
    <td>${x.CountryId}</td>
    <td>${x.CreateAt}</td>
  </tr>`
            })
            var presult = htmlfirst + prowcontent + htmlend
            if (providersdata.error === false) {
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
        default:
          response.error = true
          response.msg = 'OOPS'
          callback(response)
          break
      }
    } else {
      response.error = true
      response.msg = 'FAILED'
      callback(response)
    }
  }
  this.getManualBookingUsersCheckListService = async (data, callback) => {
    var response = {}
    try {
      var usersBookingData = await this.getUsersManualBookingUsersCheckList(data)
      if (usersBookingData.error === false) {
        response.error = false
        response.msg = 'VALID'
        response.data = usersBookingData.data
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
