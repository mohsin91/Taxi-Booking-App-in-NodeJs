
module.exports = function () {
  require('dotenv').config()
  var FB = require('fb').default
  FB.extend({ appId: process.env.FACEBOOK_APP_ID, appSecret: process.env.FACEBOOK_SECRET })

  this.getFacebookUserDetail = (accessToken) => {
    var response = {}
    return new Promise(function (resolve) {
      FB.setAccessToken(accessToken)
      FB.api('/me', { fields: 'id,first_name,last_name,email' }, function (res) {
        try {
          if (!res || res.error) {
            response.error = true
          } else {
            response.error = false
            response.data = res
          }
          resolve(response)
        } catch (err) {
          err.error = true
          resolve(err)
        }
      })
    })
  }
}
