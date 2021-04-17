module.exports = function () {
  require('../repository/TrackingRepository')()
  require('../Utils/common')()

  this.fetchProivderLocation = async (data, callback) => {
    var response = {}
    try {
      var condition = {}
      var result = {}
      condition.S2CellId = await this.getCellIdFromCoordinates(data.lat, data.lon)
      var providerList = await this.fetchProviderLocationByS2({ S2CellId: condition.S2CellId.id, Status: 'active' })

      result.providerLocation = providerList.result

      if (providerList.error) {
        response.error = true
        response.data = result
        response.msg = 'NO_PROVIDER'
      } else {
        response.error = false
        response.data = result
        response.msg = 'PROVIDER_AVAILABLE'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.automation = async (data, callback) => {
    await this.stimulateProviderLocation()
  }

  this.getRandProviderLocation = async (data, callback) => {
    var response = {}
    try {
      var input = {}
      var result = {}
      var activeProvider = []
      input.S2CellId = 1
      var list = await this.getActiveProvider(input)
      if (list.error) {
        response.error = true
        response.msg = 'SERVICE_NOT_AVAILABLE'
      } else {
        list.result.forEach((element) => {
          activeProvider.push(element.ProviderId)
        })
        var provider = await this.getProviderLocation(input)
        result.providerLocation = provider.result
        result.active = activeProvider
        response.error = false
        response.msg = 'PROVIDER_AVAILABLE'
        response.data = result
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(response)
    }
  }
}
