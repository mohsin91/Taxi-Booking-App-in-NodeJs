module.exports = function () {
  require('../../repository/Admin/EmailTemplateRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.emailTemplateAddService = async (data, callback) => {
    var response = {}
    try {
      var emaildata = {
        KeyWord: data.KeyWord,
        Type: data.Type,
        Template: data.Template
      }
      var emailTemplateIData = await this.emailTemplateAdd(emaildata)
      if (emailTemplateIData.error === false) {
        response.error = false
        response.data = emailTemplateIData.data[0]
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
  this.emailTemplateViewService = async (callback) => {
    var response = {}
    try {
      var emailTemplateSData = await this.emailTemplateView()
      if (emailTemplateSData.error === false) {
        response.error = false
        response.data = emailTemplateSData.data
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
  this.emailTemplatePagesListViewService = async (data, callback) => {
    var response = {}
    try {
      var cancelcount = await this.emailTemplateSelectViewCount()
      var cancelData = await this.emailTemplateSelectView(data)
      var result = []
      if (cancelData.error === false && cancelcount.error === false) {
        result.push({
          data: cancelData.data,
          Count: cancelcount.data[0].count
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
  this.getEmailTemplatePagesViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGCancelData = await this.getEmailTemplatePageView(data)
      if (adminGCancelData.error === false) {
        response.error = false
        response.data = adminGCancelData.data[0]
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
  this.emailTemplateEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        KeyWord: data.KeyWord,
        Type: data.Type,
        Template: data.Template
      }
      result.where = { Id: data.Id }
      var emailTemplateUData = await this.emailTemplateEdit(result)
      if (emailTemplateUData.error === false) {
        response.error = false
        response.data = emailTemplateUData.data
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
