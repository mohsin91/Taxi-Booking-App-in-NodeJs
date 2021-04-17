module.exports = function () {
  require('../services/UserService')()
  require('../services/ProviderService')()
  this.apiServicesAuthCtrl = (request) => {
    return new Promise(function (resolve) {
      try {
        var headers = request.headers
        var role = headers.role
        var Id = request.params.auth.Id
        if (role === 'user') {
          this.userAuthService(Id, (result) => {
            var response = {}
            if (result.error) {
              response.error = true
              response.msg = result.msg
            } else {
              response.error = false
              response.msg = result.msg
              response.data = result.data
            }
            resolve(response)
          })
        } else if (role === 'provider') {
          this.providerAuthService(Id, (result) => {
            var response = {}
            if (result.error) {
              response.error = true
              response.msg = result.msg
            } else {
              response.error = false
              response.msg = result.msg
              response.data = result.data
            }
            resolve(response)
          })
        } else {
          var response = {}
          response.error = true
          response.msg = 'UNAUTHORIZED'
          resolve(response)
        }
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
}
