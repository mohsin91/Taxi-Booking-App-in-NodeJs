module.exports = function () {
  const Localize = require('localize')
  const error = require('./../Utils/errorMsg')
  var paramsErrorMsg = new Localize(error.PARAM_ERROR)
  var ctrlErrorMsg = new Localize(error.ERROR)
  var ctrlSuccessMsg = new Localize(error.SUCCESS)

  this.requestHandler = (error, status, lang, callback) => {
    var message = {}
    lang = lang === 'en' ? 'default' : lang
    try {
      paramsErrorMsg.setLocale(lang)
      var errorMessage = error[0].msg
      var msg = errorMessage.split(',')
      message.error = status
      message.msg = paramsErrorMsg.translate(msg[0], msg[1], msg[2], msg[3])
    } catch (err) {
      message.error = true
      message.msg = 'Oops something went wrong'
    }
    callback(message)
  }
  this.ctrlHandler = (error, status, lang, callback) => {
    lang = lang === 'en' ? 'default' : lang
    var message = {}
    var errorMessage = error[0].msg
    var msg = errorMessage.split(',')
    if (status === true) {
      try {
        ctrlErrorMsg.setLocale(lang)
        message.error = status
        message.msg = ctrlErrorMsg.translate(msg[0], msg[1], msg[2], msg[3])
        message.data = error[0].data
      } catch (err) {
        message.error = status
        message.msg = 'Language type "' + lang + '" is not supported'
      }
    } else {
      try {
        ctrlSuccessMsg.setLocale(lang)
        message.error = status
        message.msg = ctrlSuccessMsg.translate(msg[0], msg[1], msg[2], msg[3])
        message.data = error[0].data
      } catch (err) {
        console.log(err)
        message.error = status
        message.msg = 'Oops something went wrong'
      }
    }
    callback(message)
  }
}
