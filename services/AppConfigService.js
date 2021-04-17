module.exports = function () {
  const async = require('async')
  require('../repository/AppConfigRepository')()

  this.appConfig = (type, callback) => {
    var condition = {}
    condition.Type = type
    async.parallel({
      authConfig: function (done) {
        var configType = ['AUTH_TYPE', 'OTP_TIMER', 'MAP_API_KEY', 'WAITING_TIME', 'MAX_RANGE', 'SOS_NUMBER']
        this.authType(condition, configType, (result) => {
          if (result.error) {
            done(true, null)
          } else {
            var config = {}
            result.result.forEach(value => {
              config[value.FieldName.toLowerCase()] = value.Value
            })
            done(null, config)
          }
        })
      },
      slider: function (done) {
        this.fetchSlider(condition, (result) => {
          if (result.error) {
            done(true, null)
          } else {
            done(null, result.result)
          }
        })
      }
    }, function (err, result) {
      var response = {}
      if (err) {
        response.error = true
        response.result = null
        response.msg = 'OOPS'
      } else {
        response.error = false
        response.result = result
        response.msg = 'VALID'
      }
      callback(response)
    })
  }

  this.authTypeChecking = async (name) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var senddata = {
          type: {
            Type: name
          },
          fieldname: {
            FieldName: 'AUTH_TYPE'
          }
        }
        var autypecheckres = await this.authTypeCheck(senddata)
        if (autypecheckres.error) {
          response.error = true
        } else {
          response.error = false
          response.data = autypecheckres.result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getSMTPConfig = () => {
    var smtp = ['SMTP_SERVER', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASSWORD']
    var condition = {}
    var response = {}

    return new Promise(function (resolve) {
      try {
        condition.Type = 'admin'
        this.authType(condition, smtp, (result) => {
          if (result.error) {
            response.error = true
          } else {
            var config = {}
            result.result.map(value => {
              config[value.FieldName] = value.Value
            })
            response.error = false
            response.data = config
          }
          resolve(response)
        })
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getBookingAppConfig = (userType, data) => {
    var response = {}
    var condition = {}
    return new Promise(function (resolve) {
      try {
        condition.Type = userType
        this.authType(condition, data, (result) => {
          if (result.error) {
            response.error = true
          } else {
            var config = {}
            result.result.map(value => {
              config[value.FieldName] = value.Value
            })
            response.error = false
            response.data = config
          }
          resolve(response)
        })
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getEmailTemplate = async (keyWord) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var template = await this.fetchEmailTemplate(keyWord)
        if (template.error) {
          response.error = true
          response.msg = 'NO_EMAIL_TEMPLATE'
        } else {
          response.error = false
          response.msg = 'OOPS'
          response.data = template.data
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
  this.getEmailTemplateList = (id) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var emailtemplate = await this.fetchEmailTemplate(id)
        if (emailtemplate.error === false) {
          var result = emailtemplate.result[0].Template
          response.error = false
          response.data = result
          response.msg = 'VALID'
        } else {
          response.error = true
          response.msg = 'FAILED'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
}
