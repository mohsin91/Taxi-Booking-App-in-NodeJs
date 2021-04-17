module.exports = function () {
  require('../../services/Admin/ServiceTypeService')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.rideTypeAddCtrl = (req, callback) => {
    var response = {}
    this.rideTypeAddService(req, (result) => {
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
  this.rideTypeViewCtrl = (callback) => {
    var response = {}
    this.rideTypeViewService((result) => {
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
  this.rideTypeEditCtrl = (req, callback) => {
    var response = {}
    this.rideTypeEditService(req, (result) => {
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
  this.rideTypeLanguageAddCtrl = (req, callback) => {
    var response = {}
    this.rideTypeLanguageAddService(req, (result) => {
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
  this.rideTypeLanguageViewCtrl = (callback) => {
    var response = {}
    this.rideTypeLanguageViewService((result) => {
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
  this.rideTypeLanguageEditCtrl = (req, callback) => {
    var response = {}
    this.rideTypeLanguageEditService(req, (result) => {
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
  this.rideVehicleTypeAddCtrl = (req, callback) => {
    var response = {}
    this.rideVehicleTypeAddService(req, (result) => {
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
  this.rideVehicleTypeViewCtrl = (req, callback) => {
    var response = {}
    this.rideVehicleTypeViewService(req, (result) => {
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
  this.rideVehicleTypeEditCtrl = (req, callback) => {
    var response = {}
    this.rideVehicleTypeEditService(req, (result) => {
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
  this.rideVehicleTypeStatusEditCtrl = (req, callback) => {
    var response = {}
    this.rideVehicleTypeStatusEditService(req, (result) => {
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
  this.getRideVehicleTypePagesViewCtrl = (req, callback) => {
    var response = {}
    this.getRideVehicleTypePagesViewService(req, (result) => {
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
  this.staticPagesAddCtrl = (req, callback) => {
    var response = {}
    this.staticPagesAddService(req, (result) => {
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
  this.staticPagesListViewCtrl = (callback) => {
    var response = {}
    this.staticPagesListViewService((result) => {
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
  this.staticPagesSelectCtrl = (req, callback) => {
    var response = {}
    this.staticPagesSelectService(req, (result) => {
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
  this.getStaticPagesViewCtrl = (req, callback) => {
    var response = {}
    this.getStaticPagesViewService(req, (result) => {
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
  this.staticPagesEditCtrl = (req, callback) => {
    var response = {}
    this.staticPagesEditService(req, (result) => {
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
  this.cancellationPolicyAddCtrl = (req, callback) => {
    var response = {}
    this.cancellationPolicyAddService(req, (result) => {
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
  this.cancellationPolicyViewCtrl = (callback) => {
    var response = {}
    this.cancellationPolicyViewService((result) => {
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
  this.cancellationPolicyPageViewCtrl = (req, callback) => {
    var response = {}
    this.cancellationPolicyPageViewService(req, (result) => {
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
  this.getCancellationPolicyViewCtrl = (req, callback) => {
    var response = {}
    this.getCancellationPolicyViewService(req, (result) => {
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
  this.cancellationPolicyEditCtrl = (req, callback) => {
    var response = {}
    this.cancellationPolicyEditService(req, (result) => {
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
  this.rideManualBookingVehicleTypeViewCtrl = (callback) => {
    var response = {}
    this.rideManualBookingVehicleTypeViewService((result) => {
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
