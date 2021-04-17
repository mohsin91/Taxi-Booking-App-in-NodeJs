module.exports = function () {
  require('../../repository/Admin/AdminAuthRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.adminVerifyPwd = async (data, callback) => {
    var response = {}
    try {
      var admin = {}
      admin.Email = data.Email
      var adminDetailsData = await this.fetchadminDetails(admin)
      if (adminDetailsData.error === false) {
        var adminDetails = adminDetailsData.data[0]
        var compare = await this.comparePassword(data.Password, adminDetails.Password)
        if (adminDetails.Email === data.Email && compare === true) {
          var adminAuth = {}
          adminAuth.Id = adminDetails.Id
          adminAuth.Roles = 'admin'
          adminAuth.UserType = 'Admin'
          var adminList = {}
          adminList.firstName = adminDetails.FirstName
          adminList.lastName = adminDetails.LastName
          adminList.Username = adminDetails.Username
          adminList.Email = adminDetails.Email
          adminList.Roles = adminDetails.Roles
          adminList.token = await this.generateToken(adminAuth, process.env.JWT_SECRET)
          response.error = false
          response.data = adminList
          response.msg = 'VALID'
        } else {
          response.error = true
          response.msg = 'FAILED: $[1],Password'
        }
      } else {
        response.error = true
        response.msg = 'FAILED: $[1],Email Id'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.adminVerifyTokenService = async (data, callback) => {
    var response = {}
    try {
      var admin = {}
      switch (data.Roles) {
        case 'admin':
          admin.where = { Id: data.Id }
          admin.role = 'Admin'
          break
        case 'users':
          admin.where = { Id: data.Id }
          admin.role = 'Users'
          break
        case 'providers':
          admin.where = { Id: data.Id }
          admin.role = 'Provider'
          break
        default:
          console.log('Error')
          break
      }
      var adminTokenData = await this.adminVerifyJwtToken(admin)
      if (adminTokenData.error === false) {
        var adminTokenDetails = adminTokenData.data[0]
        response.error = false
        response.msg = 'VALID'
        response.data = adminTokenDetails
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
