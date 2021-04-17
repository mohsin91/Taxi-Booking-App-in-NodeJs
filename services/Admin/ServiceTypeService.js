module.exports = function () {
  require('../../repository/Admin/ServiceTypeRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.rideTypeAddService = async (data, callback) => {
    var response = {}
    try {
      var ridedata = {
        Name: data.Name,
        CountryId: data.CountryId,
        Description: data.Description
      }
      var rideTypeIData = await this.rideTypeAdd(ridedata)
      if (rideTypeIData.error === false) {
        response.error = false
        response.data = rideTypeIData.data[0]
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
  this.rideTypeViewService = async (callback) => {
    var response = {}
    try {
      var data = []
      var rideTypeSData = await this.rideTypeView()
      if (rideTypeSData.error === false) {
        rideTypeSData.data.forEach((i, iindex) => {
          var d = []
          rideTypeSData.data[iindex].CountryId.forEach((j, jindex) => {
            d.push(j.CountryName)
          })
          data.push({
            Id: i.Id,
            Name: i.Name,
            Description: i.Description,
            CountryName: d
          })
        })
        response.error = false
        response.data = data
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
  this.rideTypeEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Name: data.Name,
        CountryId: data.CountryId,
        Description: data.Description
      }
      result.where = { Id: data.Id }
      var rideTypeUData = await this.rideTypeEdit(result)
      if (rideTypeUData.error === false) {
        response.error = false
        response.data = rideTypeUData.data
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
  this.rideTypeLanguageAddService = async (data, callback) => {
    var response = {}
    try {
      var ridedata = {
        LanguageId: data.LanguageId,
        Name: data.Name,
        RideTypeId: data.RideTypeId
      }
      var result = []
      if (ridedata.LanguageId.length === ridedata.Name.length) {
        ridedata.LanguageId.forEach((i, index) => {
          result.push({
            LanguageId: i,
            Name: ridedata.Name[index],
            RideTypeId: ridedata.RideTypeId
          })
        })
        var rideTypeLanguageIData = await this.rideTypeLanguageAdd(result)
        if (rideTypeLanguageIData.error === false) {
          response.error = false
          response.data = rideTypeLanguageIData.data[0]
          response.msg = 'VALID'
        } else {
          response.error = true
          response.msg = 'FAILED'
        }
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
  this.rideTypeLanguageViewService = async (callback) => {
    var response = {}
    try {
      var rideTypeLanguageSData = await this.rideTypeLanguageView()
      if (rideTypeLanguageSData.error === false) {
        response.error = false
        response.data = rideTypeLanguageSData.data[0]
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
  this.rideTypeLanguageEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Name: data.Name,
        LanguageId: data.LanguageId,
        RideTypeId: data.RideTypeId
      }
      result.where = { Id: data.Id }
      var rideTypeLanguageUData = await this.rideTypeLanguageEdit(result)
      if (rideTypeLanguageUData.error === false) {
        response.error = false
        response.data = rideTypeLanguageUData.data
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
  this.rideVehicleTypeAddService = async (data, callback) => {
    var response = {}
    try {
      var ridedata = {
        Name: data.Name,
        IconPassive: data.IconActive,
        IconActive: data.IconActive,
        CountryId: data.CountryId,
        StateIds: data.StateIds,
        CityIds: data.CityIds,
        BaseCharge: data.BaseCharge,
        MinCharge: data.MinCharge,
        CurrencyType: data.CurrencyType,
        CommissionPercentage: data.CommissionPercentage,
        WaitingCharge: data.WaitingCharge,
        Capacity: data.Capacity,
        ShortDesc: data.ShortDesc,
        LongDesc: data.LongDesc,
        IsActive: data.IsActive
      }
      var rideVehicleTypeIData = await this.rideVehicleTypeAdd(ridedata)
      if (rideVehicleTypeIData.error === false) {
        response.error = false
        response.data = rideVehicleTypeIData.data[0]
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
  this.citySelectViewService = async (data, callback) => {
    var response = {}
    try {
      var CitySelectSData = await this.citySelectView(data)
      if (CitySelectSData.error === false) {
        response.error = false
        response.data = CitySelectSData.data[0]
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
  this.stateSelectViewService = async (data, callback) => {
    var response = {}
    try {
      var stateSelectSData = await this.stateSelectView(data)
      if (stateSelectSData.error === false) {
        response.error = false
        response.data = stateSelectSData.data[0]
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
  this.rideVehicleTypeViewService = async (req, callback) => {
    var response = {}
    try {
      var output = {}
      var result = []
      var ridevehiclecount = await this.rideVehicleViewCount()
      var rideVehicleTypeSData = await this.rideVehicleTypeView(req)
      rideVehicleTypeSData.data.forEach((i, index) => {
        var s = i.StateIds.toString()
        var d = i.CityIds.toString()
        this.stateSelectViewService(s, (state) => {
          if (state.error) {
            output.error = true
          } else {
            var statename = []
            state['data'].forEach((ss) => {
              statename.push(ss.StateName)
            })
            this.citySelectViewService(d, (city) => {
              if (city.error) {
                output.error = true
              } else {
                var Citynames = []
                city['data'].forEach((j) => {
                  Citynames.push(j.CityName)
                })
                result.push({
                  Id: i.Id,
                  CountryId: i.CountryId,
                  CountryName: i.CountryName,
                  RideTypeId: i.RideTypeId,
                  Name: i.Name,
                  IconPassive: i.IconPassive,
                  IconActive: i.IconActive,
                  BaseCharge: i.BaseCharge,
                  MinCharge: i.MinCharge,
                  CurrencyType: i.CurrencyType,
                  CommissionPercentage: i.CommissionPercentage,
                  WaitingCharge: i.WaitingCharge,
                  Capacity: i.Capacity,
                  ShortDesc: i.ShortDesc,
                  IsActive: i.IsActive,
                  LongDesc: i.LongDesc,
                  StateName: statename,
                  CityName: Citynames
                })
              }
              if (--rideVehicleTypeSData.data.length === 0) {
                output.data = result
                output.Count = ridevehiclecount.data[0].count
                if (result.length) {
                  response.error = false
                  response.data = output
                  response.msg = 'VALID'
                } else {
                  response.error = true
                  response.msg = 'FAILED'
                }
                callback(response)
              }
            })
          }
        })
      })
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.rideVehicleTypeEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        RideTypeId: data.RideTypeId,
        Name: data.Name,
        IconPassive: data.IconPassive,
        IconActive: data.IconActive,
        CountryId: data.CountryId,
        StateIds: data.StateIds,
        CityIds: data.CityIds,
        BaseCharge: data.BaseCharge,
        MinCharge: data.MinCharge,
        CurrencyType: data.CurrencyType,
        CommissionPercentage: data.CommissionPercentage,
        WaitingCharge: data.WaitingCharge,
        Capacity: data.Capacity,
        ShortDesc: data.ShortDesc,
        LongDesc: data.LongDesc,
        IsActive: data.IsActive
      }
      result.where = { Id: data.Id }
      var rideVehicleTypeUData = await this.rideVehicleTypeEdit(result)
      if (rideVehicleTypeUData.error === false) {
        response.error = false
        response.data = rideVehicleTypeUData.data
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
  this.rideVehicleTypeStatusEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        IsActive: data.IsActive
      }
      result.where = { Id: data.Id }
      var rideVehicleTypeStatusUData = await this.rideVehicleTypeStatusEdit(result)
      if (rideVehicleTypeStatusUData.error === false) {
        response.error = false
        response.data = rideVehicleTypeStatusUData.data
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
  this.getRideVehicleTypePagesViewService = async (req, callback) => {
    var response = {}
    try {
      var rideVehicleTypeSData = await this.getrideVehicleTypeView(req)
      if (rideVehicleTypeSData.error === false) {
        response.error = false
        response.data = rideVehicleTypeSData.data[0]
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
  this.staticPagesAddService = async (data, callback) => {
    var response = {}
    try {
      var staticdata = {
        PageName: data.PageName,
        Url: data.Url,
        HtmlContent: data.HtmlContent
      }
      var staticPagesIData = await this.staticPagesAdd(staticdata)
      if (staticPagesIData.error === false) {
        response.error = false
        response.data = staticPagesIData.data[0]
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
  this.staticPagesListViewService = async (callback) => {
    var response = {}
    try {
      var staticPagesSData = await this.staticPagesListView()
      if (staticPagesSData.error === false) {
        response.error = false
        response.data = staticPagesSData.data
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
  this.staticPagesSelectService = async (data, callback) => {
    var response = {}
    try {
      var staticcount = await this.staticPagesSelectViewCount()
      var staticData = await this.staticPagesSelectView(data)
      var result = []

      if (staticData.error === false && staticcount.error === false) {
        result.push({
          data: staticData.data,
          Count: staticcount.data[0].count
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
  this.getStaticPagesViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGCancelData = await this.getStaticPagesView(data)
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
  this.staticPagesEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        PageName: data.PageName,
        Url: data.Url,
        HtmlContent: data.HtmlContent
      }
      result.where = { Id: data.Id }
      var staticPagesUData = await this.staticPagesEdit(result)
      if (staticPagesUData.error === false) {
        response.error = false
        response.data = staticPagesUData.data
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
  this.cancellationPolicyAddService = async (data, callback) => {
    var response = {}
    try {
      var cdata = {
        Description: data.Description,
        UserType: data.UserType
      }
      var cancellationPolicyIData = await this.cancellationPolicyAdd(cdata)
      if (cancellationPolicyIData.error === false) {
        response.error = false
        response.data = cancellationPolicyIData.data[0]
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
  this.cancellationPolicyViewService = async (callback) => {
    var response = {}
    try {
      var cancellationPolicySData = await this.cancellationPolicyView()
      if (cancellationPolicySData.error === false) {
        response.error = false
        response.data = cancellationPolicySData.data
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
  this.cancellationPolicyPageViewService = async (data, callback) => {
    var response = {}
    try {
      var cancelcount = await this.cancellationPolicyPageViewCount()
      var cancelData = await this.cancellationPolicyPageView(data)
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
  this.getCancellationPolicyViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGCancelData = await this.getCancellationPolicyView(data)
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
  this.cancellationPolicyEditService = async (data, callback) => {
    var response = {}
    try {
      const result = {}
      result.data = {
        Description: data.Description,
        UserType: data.UserType
      }
      result.where = { Id: data.Id }
      var cancellationPolicyUData = await this.cancellationPolicyEdit(result)
      if (cancellationPolicyUData.error === false) {
        response.error = false
        response.data = cancellationPolicyUData.data
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
  this.rideManualBookingVehicleTypeViewService = async (callback) => {
    var response = {}
    try {
      var rideBookingVehicleTypeSData = await this.rideManualBookingVehicleTypeView()
      if (rideBookingVehicleTypeSData.error === false) {
        response.error = false
        response.data = rideBookingVehicleTypeSData.data
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
