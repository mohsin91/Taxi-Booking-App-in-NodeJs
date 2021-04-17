module.exports = function () {
  require('../../repository/Admin/peekChargesRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.peekChargesAddService = async (data, callback) => {
    var response = {}
    try {
      var peekchargesdata = {
        Type: data.type,
        Name: data.name,
        Day: data.daydata,
        Week: data.weekdata,
        StartTime: data.starttime,
        EndTime: data.endtime,
        Fare: data.fare,
        MinAmount: data.minamount,
        MaxAmount: data.maxamount
      }
      var peekchargesIData = await this.peekChargesAdd(peekchargesdata)
      if (peekchargesIData.error === false) {
        response.error = false
        response.data = peekchargesIData.data[0]
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
  this.peekChargesPageViewService = async (data, callback) => {
    var response = {}
    try {
      var peekchargescount = await this.peekChargesPageViewCount()
      var peekchargesData = await this.peekChargesPageView(data)
      var result = []
      if (peekchargesData.error === false && peekchargescount.error === false) {
        result.push({
          data: peekchargesData.data,
          Count: peekchargescount.data[0].count
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
  this.getPeekChargesEditListViewService = async (data, callback) => {
    var response = {}
    try {
      var peekchargeseditListData = await this.getPeekChargesEditListView(data)
      if (peekchargeseditListData.error === false) {
        response.error = false
        response.data = peekchargeseditListData.data[0]
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
  this.peekChargesEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Type: data.type,
        Name: data.name,
        Day: data.daydata,
        Week: data.weekdata,
        StartTime: data.starttime,
        EndTime: data.endtime,
        Fare: data.fare,
        MinAmount: data.minamount,
        MaxAmount: data.maxamount
      }
      result.where = { Id: data.Id }
      var peekchargesUData = await this.peekChargesEdit(result)
      if (peekchargesUData.error === false) {
        response.error = false
        response.data = peekchargesUData.data
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
  // this.promoCodesStatusUpdateService = async (data, callback) => {
  //   var response = {}
  //   try {
  //     const result = {}
  //     result.data = {
  //       Status: data.Status
  //     }
  //     result.where = { Id: data.Id }
  //     var promocodesUData = await this.promoCodesEdit(result)
  //     if (promocodesUData.error === false) {
  //       response.error = false
  //       response.data = promocodesUData.data
  //       response.msg = 'VALID'
  //     } else {
  //       response.error = true
  //       response.msg = 'FAILED'
  //     }
  //     callback(response)
  //   } catch (err) {
  //     err.error = true
  //     err.msg = 'OOPS'
  //     callback(err)
  //   }
  // }
}
