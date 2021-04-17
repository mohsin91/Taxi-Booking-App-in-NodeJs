module.exports = function () {
  require('../../repository/Admin/LocalizationRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  const DUPLICATEERRCODE = 1062
  this.adminCountryInsertService = async (data, callback) => {
    var response = {}
    try {
      var country = {
        CountryName: data.CountryName,
        ShortCode: data.ShortCode,
        CurrenyName: data.CurrenyName,
        CurrencyShortCode: data.CurrencyShortCode,
        CurrencySymbol: data.CurrencySymbol,
        CurrenyValue: data.CurrenyValue,
        CountryFlagImage: data.CountryFlagImage,
        IsActive: data.IsActive
      }
      var adminICountryData = await this.adminCountryInsert(country)
      if (adminICountryData.error === false) {
        response.error = false
        response.data = adminICountryData.data[0]
        response.msg = 'VALID'
      } else if (adminICountryData.errno === DUPLICATEERRCODE) {
        response.error = true
        response.msg = 'EXIST: $[1],Country Name'
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
  this.adminStateInsertService = async (data, callback) => {
    var response = {}
    try {
      var statedata = {
        CountryId: data.CountryId,
        ShortCode: data.ShortCode,
        StateName: data.StateName,
        IsActive: data.IsActive
      }
      var adminIStateData = await this.adminStateInsert(statedata)
      if (adminIStateData.error === false) {
        response.error = false
        response.data = adminIStateData.data[0]
        response.msg = 'VALID'
      } else if (adminIStateData.errno === DUPLICATEERRCODE) {
        response.error = true
        response.msg = 'EXIST: $[1],State Name'
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
  this.adminCityInsertService = async (data, callback) => {
    var response = {}
    try {
      var citydata = {
        CountryId: data.CountryId,
        StateId: data.StateId,
        CityName: data.CityName,
        IsActive: data.IsActive
      }
      var fetchCdata = await this.fetchadminCitiesList(citydata)
      if (fetchCdata.error === false) {
        response.error = true
        response.msg = 'EXIST: $[1],City Name'
      } else {
        var adminICityData = await this.adminCitiesInsert(citydata)
        if (adminICityData.error === false) {
          response.error = false
          response.data = adminICityData.data[0]
          response.msg = 'VALID'
        } else {
          response.error = true
          response.msg = 'FAILED'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.adminCountrySelectService = async (data, callback) => {
    var response = {}
    try {
      var countrycount = await this.countryListCount()
      var adminSCountryData = await this.countryPageView(data)
      var result = []
      if (adminSCountryData.error === false && countrycount.error === false) {
        result.push({
          data: adminSCountryData.data,
          Count: countrycount.data[0].count
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
  this.adminCountryViewSelectService = async (callback) => {
    var response = {}
    try {
      var adminSCountryData = await this.adminCountrySelect()
      if (adminSCountryData.error === false) {
        response.error = false
        response.data = adminSCountryData.data
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
  this.adminGetCountryViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGCountryData = await this.adminGetCountryView(data)
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
  this.adminStateSelectService = async (callback) => {
    var response = {}
    try {
      var adminSStateData = await this.adminStateSelect()
      if (adminSStateData.error === false) {
        response.error = false
        response.data = adminSStateData.data
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
  this.adminCitySelectService = async (callback) => {
    var response = {}
    try {
      var adminSStateData = await this.adminCitySelect()
      if (adminSStateData.error === false) {
        response.error = false
        response.data = adminSStateData.data[0]
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
  this.adminStateListService = async (data, callback) => {
    var response = {}
    try {
      var adminSStateData = await this.adminStateList(data)
      if (adminSStateData.error === false) {
        response.error = false
        response.data = adminSStateData.data
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
  this.adminGetStateViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGCountryData = await this.adminGetStateView(data)
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
  this.adminCityViewService = async (data, callback) => {
    var response = {}
    try {
      var citycount = await this.cityListCount()
      var adminVCityData = await this.adminCitiesView(data)
      var result = []
      if (adminVCityData.error === false && citycount.error === false) {
        result.push({
          data: adminVCityData.data[0],
          Count: citycount.data[0].count
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
  this.adminCitySelectService = async (callback) => {
    var response = {}
    try {
      var adminSCityData = await this.adminCitiesSelect()
      if (adminSCityData.error === false) {
        response.error = false
        response.data = adminSCityData.data[0]
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
  this.adminGetCityViewService = async (data, callback) => {
    var response = {}
    try {
      var adminGCountryData = await this.adminGetCityView(data)
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
  this.adminCountryUpdateService = async (data, callback) => {
    var response = {}
    try {
      var countrydata = { data: {
        CountryName: data.CountryName,
        ShortCode: data.ShortCode,
        CurrenyName: data.CurrenyName,
        CurrencyShortCode: data.CurrencyShortCode,
        CurrencySymbol: data.CurrencySymbol,
        CurrenyValue: data.CurrenyValue,
        CountryFlagImage: data.CountryFlagImage,
        IsDefault: data.IsDefault,
        IsActive: data.IsActive
      },
      where: {
        Id: data.Id
      }
      }
      var adminUCountryData = await this.adminCountryUpdate(countrydata)
      if (adminUCountryData.error === false) {
        response.error = false
        response.data = adminUCountryData.data
        response.msg = 'VALID'
      } else if (adminUCountryData.errno === DUPLICATEERRCODE) {
        response.error = true
        response.msg = 'EXIST: $[1],Country Name'
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
  this.adminStateUpdateService = async (data, callback) => {
    var response = {}
    try {
      var statedata = { data: {
        CountryId: data.CountryId,
        ShortCode: data.ShortCode,
        StateName: data.StateName
      },
      where: {
        Id: data.Id
      }
      }
      var adminUStateData = await this.adminStateUpdate(statedata)
      if (adminUStateData.error === false) {
        response.error = false
        response.data = adminUStateData.data
        response.msg = 'VALID'
      } else if (adminUStateData.errno === DUPLICATEERRCODE) {
        response.error = true
        response.msg = 'EXIST: $[1],State Name'
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
  this.adminCityUpdateService = async (data, callback) => {
    var response = {}
    try {
      var citydata = { data: {
        CountryId: data.CountryId,
        StateId: data.StateId,
        CityName: data.CityName
      },
      where: {
        Id: data.Id
      }
      }
      var fetchCdata = await this.fetchadminCitiesList(citydata.data)
      if (fetchCdata.error === false) {
        if ((fetchCdata.data[0]['Id'] === parseInt(citydata.where['Id'])) &&
          (citydata.data['CityName'] === fetchCdata.data[0]['CityName'])) {
          var adminUCityData = await this.adminCitiesUpdate(citydata)
          if (adminUCityData.error === false) {
            response.error = false
            response.data = adminUCityData.data
            response.msg = 'VALID'
          } else {
            response.error = true
            response.msg = 'FAILED'
          }
        } else {
          response.error = true
          response.msg = 'EXIST: $[1],City Name'
        }
      } else {
        var adminUNCityData = await this.adminCitiesUpdate(citydata)
        if (adminUNCityData.error === false) {
          response.error = false
          response.data = adminUNCityData.data
          response.msg = 'VALID'
        } else {
          response.error = true
          response.msg = 'FAILED'
        }
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
  this.adminCountryDeleteService = async (data, callback) => {
    var response = {}
    try {
      var countrydata = { data: {
        IsActive: 'No'
      },
      where: {
        Id: data.Id
      }
      }
      var adminDCountryData = await this.adminCountryDelete(countrydata)
      if (adminDCountryData.error === false) {
        response.error = false
        response.data = adminDCountryData.data
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
  this.adminStateDeleteService = async (data, callback) => {
    var response = {}
    try {
      var statedata = { data: {
        IsActive: 'No'
      },
      where: {
        Id: data.Id
      }
      }
      var adminDStateData = await this.adminStateDelete(statedata)
      if (adminDStateData.error === false) {
        response.error = false
        response.data = adminDStateData.data
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
  this.adminCityDeleteService = async (data, callback) => {
    var response = {}
    try {
      var citydata = { data: {
        IsActive: 'No'
      },
      where: {
        Id: data.Id
      }
      }
      var adminDCityData = await this.adminCitiesDelete(citydata)
      if (adminDCityData.error === false) {
        response.error = false
        response.data = adminDCityData.data
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

  this.langViewService = async (callback) => {
    var response = {}
    try {
      var langSData = await this.langView()
      if (langSData.error === false) {
        response.error = false
        response.data = langSData.data
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

  this.statePageSelectViewService = async (data, callback) => {
    var response = {}
    try {
      var statecount = await this.stateListCount()
      var StatePSelectSData = await this.statePageSelect(data)
      var result = []
      if (StatePSelectSData.error === false && statecount.error === false) {
        result.push({
          data: StatePSelectSData.data[0],
          Count: statecount.data[0].count
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
  this.citySelectViewService = async (data, callback) => {
    var response = {}
    try {
      var CitySelectSData = await this.citySelectView(data)
      if (CitySelectSData.error === false) {
        response.error = false
        response.data = CitySelectSData.data
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
