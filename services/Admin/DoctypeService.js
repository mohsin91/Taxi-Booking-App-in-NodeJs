module.exports = function () {
  require('../../repository/Admin/DoctypeRepository')()
  require('../../Utils/common')()
  require('dotenv').config()

  this.adminDocTypeInsertService = async (data, callback) => {
    var response = {}
    try {
      var doctypedata = {
        Name: data.Name,
        Type: data.Type,
        FieldName: data.FieldName,
        ApplicableTo: data.ApplicableTo,
        IsRequired: data.IsRequired,
        DocType: data.DocType
      }
      var adminDocTypeInsertData = await this.adminDocTypeInsert(doctypedata)
      if (adminDocTypeInsertData.error === false) {
        response.error = false
        response.data = adminDocTypeInsertData.data[0]
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
  this.adminDocTypeSelectService = async (callback) => {
    var response = {}
    try {
      var adminDocTypeSData = await this.adminDocTypeSelect()
      if (adminDocTypeSData.error === false) {
        response.error = false
        response.data = adminDocTypeSData.data
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
  this.admindocTypeViewPageService = async (data, callback) => {
    var response = {}
    try {
      var doctypecount = await this.admindocTypeViewPageListcount()
      var doctypePSelectSData = await this.admindocTypePageView(data)
      var result = []
      if (doctypePSelectSData.error === false && doctypecount.error === false) {
        result.push({
          data: doctypePSelectSData.data,
          Count: doctypecount.data[0].count
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
  this.adminGetDoctypeViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGCountryData = await this.adminGetDoctypeView(data)
      if (adminGCountryData.error === false) {
        response.error = false
        response.data = adminGCountryData.data[0]
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
  this.adminDocTypeUpdateService = async (data, callback) => {
    var response = {}
    try {
      var resData = {
        Name: data.Name,
        Type: data.Type,
        FieldName: data.FieldName,
        ApplicableTo: data.ApplicableTo,
        IsRequired: data.IsRequired,
        DocType: data.DocType
      }
      var doctypedata = {
        data: resData,
        where: { Id: data.Id }
      }
      var adminDocTypeUpdateData = await this.adminDocTypeUpdate(doctypedata)
      if (adminDocTypeUpdateData.error === false) {
        response.error = false
        response.data = adminDocTypeUpdateData.data
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
