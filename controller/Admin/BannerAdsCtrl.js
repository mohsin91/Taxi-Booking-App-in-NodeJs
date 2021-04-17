module.exports = function () {
  require('../../services/Admin/BannerAdsService')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.bannerAdsAddCtrl = (req, callback) => {
    var response = {}
    this.bannerAdsAddService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }
  this.bannerAdsPageViewCtrl = (callback) => {
    var response = {}
    this.bannerAdsPageViewService((result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }
  this.getbannerAdsViewCtrl = (req, callback) => {
    var response = {}
    this.getbannerAdsViewService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }
  this.bannerAdsEditCtrl = (req, callback) => {
    var response = {}
    this.bannerAdsEditService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }
  this.bannerAdsStatusUpdateCtrl = (req, callback) => {
    var response = {}
    this.bannerAdsStatusUpdateService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }
}
