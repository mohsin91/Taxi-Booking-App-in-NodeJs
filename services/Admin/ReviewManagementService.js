module.exports = function () {
  require('../../repository/Admin/ReviewManagementRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.admingetUserProviderReviewManagementService = async (data, callback) => {
    var response = {}
    switch (data.type) {
      case 'user':
        try {
          var usercountsenddata = { ReviewedBy: 'user' }
          var usersenddata = {
            type:
              'Review.UserId',
            where: {
              ReviewedBy: 'user'
            }
          }
          usersenddata.page = data.page
          usersenddata.limit = data.limit
          var usertablename = 'Users'
          var usercount = await this.reviewManagementViewCount(usercountsenddata)
          var userdata = await this.getUserProviderReviewManagementData(usertablename, usersenddata)
          var uresult = []
          if (userdata.error === false && usercount.error === false) {
            userdata.data.map((x) => {
              var resultdata = this.secureChangerList(x.Email, x.Mobile)
              x.Mobile = resultdata['mobile']
              x.Email = resultdata['email']
            })
            uresult.push({
              data: userdata.data,
              Count: usercount.data[0].count
            })
            response.error = false
            response.data = uresult
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
      case 'provider':
        try {
          var providercountsenddata = { ReviewedBy: 'provider' }
          var providersenddata = {
            type:
                    'Review.ProviderId',
            where: {
              ReviewedBy: 'provider'
            }
          }
          providersenddata.page = data.page
          providersenddata.limit = data.limit
          var providertablename = 'Provider'
          var providercount = await this.reviewManagementViewCount(providercountsenddata)
          var providerdata = await this.getUserProviderReviewManagementData(providertablename, providersenddata)
          providerdata.data.map((x) => {
            var resultdata = this.secureChangerList(x.Email, x.Mobile)
            x.Mobile = resultdata['mobile']
            x.Email = resultdata['email']
          })
          var presult = []
          if (providerdata.error === false && providercount.error === false) {
            presult.push({
              data: providerdata.data,
              Count: providercount.data[0].count
            })
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
        break
    }
  }
}
