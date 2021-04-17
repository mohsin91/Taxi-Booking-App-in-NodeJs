module.exports = function (app, validator) {
  const basePath = '/api/admin'
  require('../Utils/error')()
  require('../Utils/common')()
  require('dotenv').config()
  require('../controller/Admin/AdminAppConfigCtrl')()
  require('../controller/Admin/AdminAuthController')()
  require('../controller/Admin/LocalizationController')()
  require('../controller/Admin/DoctypeController')()
  require('../controller/Admin/EmailTemplateController')()
  require('../controller/Admin/ProvidersController')()
  require('../controller/Admin/ServiceTypeController')()
  require('../controller/Admin/UsersController')()
  require('../controller/Admin/VehicleController')()
  require('../controller/Admin/AppSliderController')()
  require('../controller/Admin/FileUploadCtrl')()
  require('../controller/Admin/BookingController')()
  require('../controller/Admin/SearchController')()
  require('../controller/Admin/DashboardController')()
  require('../controller/Admin/PromoCodesCtrl')()
  require('../controller/Admin/ReviewManagementCtrl')()
  require('../controller/Admin/BannerAdsCtrl')()
  require('../controller/Admin/peekChargesCtrl')()
  require('../controller/Admin/WalletController')()

  // admin login route
  app.post(`${basePath}/login`, [
    validator.check('Email').isEmail()
      .withMessage('INVALID: $[1],Email Id'),
    validator.check('Password').isLength({ min: 8, max: 15 })
      .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
  ], (req, res) => {
    const error = validator.validation(req)
    const lang = req.headers.lang
    var body = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminPassValidate(body, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Insert Country
  app.post(`${basePath}/countryAdd`, [
    validator.check('CountryName').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CountryName'),
    validator.check('ShortCode').isAlpha().isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],ShortCode'),
    validator.check('CurrenyName').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrenyName'),
    validator.check('CurrencyShortCode').isAlpha().isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrencyShortCode'),
    validator.check('CurrencySymbol').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrencySymbol'),
    validator.check('CurrenyValue').isNumeric().isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrenyValue'),
    validator.check('CountryFlagImage'),
    validator.check('IsActive').isLength({ min: 1, max: 255 })
      .withMessage('INVALID:$[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCountryInsertCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Insert State
  app.post(`${basePath}/stateAdd`, [
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('INVALID:$[1],CountryId'),
    validator.check('ShortCode').isLength({ min: 2, max: 255 }).trim()
      .withMessage('INVALID:$[1],ShortCode'),
    validator.check('StateName').isLength({ min: 2, max: 255 }).trim()
      .withMessage('INVALID:$[1],StateName'),
    validator.check('IsActive').isAlpha().isLength({ min: 1, max: 3 })
      .withMessage('INVALID:$[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminStateInsertCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Insert City
  app.post(`${basePath}/cityAdd`, [
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('INVALID:$[1],CountryId'),
    validator.check('StateId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('INVALID:$[1],StateId'),
    validator.check('CityName').isAlpha().isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CityName')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCityInsertCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin page Select Country
  app.get(`${basePath}/countryPageView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCountrySelectCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Dashboard List View
  app.get(`${basePath}/dashboardListView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.admindashboardListViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select Country
  app.get(`${basePath}/countryView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCountryViewSelectCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select Country
  app.get(`${basePath}/getCountryView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminGetCountryViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select State
  app.get(`${basePath}/stateView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminStateSelectCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select cityview list
  app.get(`${basePath}/cityViewlist`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCitySelectCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin List Select State
  app.get(`${basePath}/stateListView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminStateListCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select State
  app.get(`${basePath}/stateView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminStatePageSelectCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select State
  app.get(`${basePath}/getStateView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminGetStateViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select City
  app.get(`${basePath}/cityView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCitySelectCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select City
  app.get(`${basePath}/cityView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCityViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select State
  app.get(`${basePath}/getCityView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminGetCityViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Update Country
  app.post(`${basePath}/countryEdit`, [
    validator.check('CountryName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],CountryName'),
    validator.check('ShortCode').isAlpha().isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],ShortCode'),
    validator.check('CurrenyName').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrenyName'),
    validator.check('CurrencyShortCode').isAlpha().isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],CurrencyShortCode'),
    validator.check('CurrencySymbol').isString()
      .withMessage('INVALID: $[1],CurrencySymbol')
      .isLength({ min: 1, max: 255 }).withMessage('INVALID: $[1],CurrencySymbol')
      .trim().withMessage('INVALID: $[1],CurrencySymbol'),
    validator.check('CurrenyValue').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC:$[1],CurrenyValue'),
    validator.check('CountryFlagImage')
      .withMessage('INVALID:$[1],CountryFlagImage'),
    validator.check('IsDefault').withMessage('INVALID:$[1],IsDefault'),
    validator.check('IsActive').isLength({ min: 1, max: 3 })
      .withMessage('INVALID:$[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCountryUpdateCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Update State
  app.post(`${basePath}/stateEdit`, [
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC:$[1],CountryId'),
    validator.check('ShortCode').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],ShortCode'),
    validator.check('StateName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],StateName'),
    validator.check('IsActive').isAlpha().isLength({ min: 1, max: 3 })
      .withMessage('INVALID:$[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminStateUpdateCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Update City
  app.post(`${basePath}/cityEdit`, [
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC:$[1],CountryId'),
    validator.check('StateId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC:$[1],StateId'),
    validator.check('CityName').isAlpha().isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],CityName'),
    validator.check('IsActive').isLength({ min: 1, max: 3 })
      .withMessage('INVALID:$[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCityUpdateCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Delete Country
  app.post(`${basePath}/countryDelete`, [
    validator.check('Id').isNumeric()
      .withMessage('NUMERIC:$[1],Id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCountryDeleteCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Delete State
  app.post(`${basePath}/stateDelete`, [
    validator.check('Id').isNumeric()
      .withMessage('NUMERIC:$[1],Id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminStateDeleteCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Delete City
  app.post(`${basePath}/cityDelete`, [
    validator.check('Id').isNumeric()
      .withMessage('NUMERIC:$[1],Id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminCityDeleteCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin AppConfig UpDate
  app.post(`${basePath}/appConfigEdit`, [
    validator.check('Id').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC:$[1],Id'),
    validator.check('Value').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],Value')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.appConfigEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // App Config Page Select
  app.get(`${basePath}/appConfigListView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.appConfigViewPageCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Document Type Insert
  app.post(`${basePath}/docTypeAdd`, [
    validator.check('Name').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],Name'),
    validator.check('Type').isIn(['FILE', 'TEXT']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID:$[1],Type'),
    validator.check('FieldName').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],FieldName'),
    validator.check('ApplicableTo').isLength({ min: 1, max: 50 }).isIn(['provider', 'bank', 'vehicle'])
      .withMessage('INVALID:$[1],ApplicableTo'),
    validator.check('IsRequired').isNumeric().isLength({ min: 1, max: 1 })
      .withMessage('NUMERIC:$[1],IsRequired'),
    validator.check('DocType').isLength({ min: 1, max: 50 }).isIn(['card', 'text', 'photo', 'doc'])
      .withMessage('INVALID:$[1],DocType')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.adminDocTypeInsertCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Document Type Select
  app.get(`${basePath}/docTypeView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminDocTypeSelectCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Document Type Page Select
  app.get(`${basePath}/docTypeView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.admindocTypeViewPageCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select State
  app.get(`${basePath}/getDoctypeView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminGetDoctypeViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Document Type Update
  app.post(`${basePath}/docTypeEdit`, [
    validator.check('Name').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],Name'),
    validator.check('Type').isIn(['FILE', 'TEXT']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID:$[1],Type'),
    validator.check('FieldName').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID:$[1],FieldName'),
    validator.check('ApplicableTo').isLength({ min: 1, max: 45 }).isIn(['provider', 'bank', 'vehicle'])
      .withMessage('INVALID:$[1],ApplicableTo'),
    validator.check('IsRequired').isNumeric().isLength({ min: 1, max: 1 })
      .withMessage('NUMERIC:$[1],IsRequired'),
    validator.check('DocType').isAlpha().isLength({ min: 1, max: 50 }).isIn(['card', 'text', 'photo', 'doc'])
      .withMessage('INVALID:$[1],DocType')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.adminDocTypeUpdateCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Document Type Delete
  app.post(`${basePath}/docTypeDelete`, [
    validator.check('Id').isNumeric()
      .isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC:$[1],Id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.adminDocTypeDeleteCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Brand Insert
  app.post(`${basePath}/vehicleBrandAdd`, [
    validator.check('BrandName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],BrandName'),
    validator.check('CountryId').trim()
      .withMessage('INVALID:$[1],CountryId')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.vehicleBrandAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Brand View
  app.get(`${basePath}/vehicleBrandView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.vehicleBrandViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  //vehicle Categories
  app.get(`${basePath}/vehicleCategories`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.vehicleCategoriesCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Brand page View
  app.get(`${basePath}/vehicleBrandView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.vehicleBrandPageViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin vehiclebrand Select State
  app.get(`${basePath}/getVehicleBrandView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getVehicleBrandViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Brand Update
  app.post(`${basePath}/vehicleBrandEdit`, app.adminauth, [
    validator.check('BrandName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID:$[1],BrandName'),
    validator.check('CountryId').trim()
      .withMessage('INVALID:$[1],CountryId')
  ], (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.vehicleBrandEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Model Insert
  app.post(`${basePath}/vehicleModelAdd`, [
    validator.check('VehicleBrandId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],VehicleBrandId'),
    validator.check('ModelName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],ModelName'),
    validator.check('VehicleType').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],VehicleType'),
    validator.check('PowerBy').isAlpha().isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],PowerBy')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.vehicleModelAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Model View
  app.get(`${basePath}/vehicleModelView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.vehicleModelViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Vehicle Model page View
  app.get(`${basePath}/vehicleModelView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.vehicleModelPageViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin vehiclemodel Select State
  app.get(`${basePath}/getVehicleModelView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getVehicleModelViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
    // Admin vehicleBrandmodel Select State
    app.get(`${basePath}/getVehicleBrandModel/:id`, app.adminauth, (req, res) => {
      const lang = req.headers.lang
      const error = validator.validation(req)
      const id = req.params.id
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, (message) => {
          return res.send(message)
        })
      } else {
        this.getVehicleBrandModelCtrl(id, (result) => {
          this.ctrlHandler([result], result.error, lang, (message) => {
            return res.send(message)
          })
        })
      }
    })
    //
    
     // Admin RideType Select State
     app.get(`${basePath}/getRideVehicleType`, app.adminauth, (req, res) => {
      const lang = req.headers.lang
      const error = validator.validation(req)
      const id = req.params.id
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, (message) => {
          return res.send(message)
        })
      } else {
        this.getRideTypeCtrl((result) => {
          this.ctrlHandler([result], result.error, lang, (message) => {
            return res.send(message)
          })
        })
      }
    })
  // Admin Vehicle Model Update
  app.post(`${basePath}/vehicleModelEdit`, [
    validator.check('VehicleBrandId').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],VehicleBrandId'),
    validator.check('ModelName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],ModelName'),
    validator.check('VehicleType').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],VehicleType'),
    validator.check('PowerBy').isAlpha().isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],PowerBy')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.vehicleModelEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Language
  // Admin Language View
  app.get(`${basePath}/languageView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.langViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Ride Type Insert
  app.post(`${basePath}/rideTypeAdd`, [
    validator.check('Name').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('Description').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],Description'),
    validator.check('CountryId').withMessage('INVALID: $[1],CountryId')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.rideTypeAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Ride Type View
  app.get(`${basePath}/rideTypeView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.rideTypeViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Ride Type Edit
  app.post(`${basePath}/rideTypeEdit`, [
    validator.check('Name').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('Description').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],Description'),
    validator.check('CountryId').withMessage('INVALID: $[1],CountryId')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.rideTypeEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Ride Type Language Insert
  app.post(`${basePath}/rideTypeLanguageAdd`, [
    validator.check('Name').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('RideTypeId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],RideTypeId'),
    validator.check('LanguageId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],LanguageId')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if ((Array.isArray(data.Name) === true) && (Array.isArray(data.LanguageId) === true)) {
      if (error.array().length) {
        this.requestHandler(error.array(), true, lang, (message) => {
          message.data = error.array()
          return res.send(message)
        })
      } else {
        this.rideTypeLanguageAddCtrl(data, (result) => {
          this.ctrlHandler([result], result.error, lang, (message) => {
            return res.send(message)
          })
        })
      }
    } else {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    }
  })
  // Admin Ride Type Language View
  app.get(`${basePath}/rideTypeLanguageView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.rideTypeLanguageViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Ride Type Language Edit
  app.post(`${basePath}/rideTypeLanguageEdit`, [
    validator.check('Name').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('RideTypeId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],RideTypeId'),
    validator.check('LanguageId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],LanguageId')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.rideTypeLanguageEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin RideVehicle Type Insert
  app.post(`${basePath}/rideVehicleTypeAdd`, [
    validator.check('Name').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('IconPassive').isLength({ min: 1 })
      .withMessage('INVALID: $[1],IconPassive'),
    validator.check('IconActive').isLength({ min: 1 })
      .withMessage('INVALID: $[1],IconActive'),
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],CountryId'),
    validator.check('StateIds')
      .withMessage('INVALID: $[1],StateIds'),
    validator.check('CityIds')
      .withMessage('INVALID: $[1],CityIds'),
    validator.check('BaseCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],BaseCharge'),
    validator.check('MinCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],MinCharge'),
    validator.check('CurrencyType').isLength({ min: 1, max: 11 }).trim()
      .withMessage('INVALID: $[1],CurrencyType'),
    validator.check('CommissionPercentage').isNumeric().isLength({ min: 1 }).trim()
      .withMessage('NUMERIC: $[1],CommissionPercentage'),
    validator.check('WaitingCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],WaitingCharge'),
    validator.check('Capacity').isNumeric().isLength({ min: 1, max: 1 }).trim()
      .withMessage('NUMERIC: $[1],Capacity'),
    validator.check('ShortDesc').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1],ShortDesc'),
    validator.check('LongDesc').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],LongDesc'),
    validator.check('IsActive').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.rideVehicleTypeAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin RideVehicle Type View
  app.get(`${basePath}/rideVehicleTypeView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.rideVehicleTypeViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin RideVehicle Type Update
  app.post(`${basePath}/rideVehicleTypeEdit`, [
    validator.check('Id').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('INVALID: $[1],Id'),
    validator.check('Name').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Name'),
    validator.check('IconPassive').isLength({ min: 1, max: 1000 })
      .withMessage('INVALID: $[1],IconPassive'),
    validator.check('IconActive').isLength({ min: 1, max: 1000 })
      .withMessage('INVALID: $[1],IconActive'),
    validator.check('CountryId').isNumeric().isLength({ min: 1, max: 11 })
      .withMessage('NUMERIC: $[1],CountryId'),
    validator.check('StateIds')
      .withMessage('INVALID: $[1],StateIds'),
    validator.check('CityIds')
      .withMessage('INVALID: $[1],CityIds'),
    validator.check('BaseCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],BaseCharge'),
    validator.check('MinCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],MinCharge'),
    validator.check('CurrencyType').isLength({ min: 1, max: 11 }).trim()
      .withMessage('INVALID: $[1],CurrencyType'),
    validator.check('CommissionPercentage').isNumeric().isLength({ min: 1 }).trim()
      .withMessage('NUMERIC: $[1],CommissionPercentage'),
    validator.check('WaitingCharge').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('NUMERIC: $[1],WaitingCharge'),
    validator.check('Capacity').isNumeric().isLength({ min: 1, max: 1 }).trim()
      .withMessage('NUMERIC: $[1],Capacity'),
    validator.check('ShortDesc').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1],ShortDesc'),
    validator.check('LongDesc').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],LongDesc'),
    validator.check('IsActive').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.rideVehicleTypeEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin RideVehicleType Status Update
  app.post(`${basePath}/rideVehicleTypeStatusEdit`, [
    validator.check('Id').isNumeric().isLength({ min: 1, max: 11 }).trim()
      .withMessage('INVALID: $[1],Id'),
    validator.check('IsActive').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],IsActive')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.rideVehicleTypeStatusEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select ridevehicletype pages
  app.get(`${basePath}/getRideVehicleTypepagesView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getRideVehicleTypePagesViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Email Template Add
  app.post(`${basePath}/emailTemplateAdd`, [
    validator.check('KeyWord').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1],KeyWord'),
    validator.check('Type').isIn(['user', 'provider']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('Template').trim().withMessage('INVALID: $[1],Template')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.emailTemplateAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Email Template View
  app.get(`${basePath}/emailTemplateView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.emailTemplateViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select EmailTemplate
  app.get(`${basePath}/emailTemplatePagesListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.emailTemplateSelectCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select emailtemplate pages
  app.get(`${basePath}/getEmailTemplatepagesView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getEmailTemplatePagesViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Email Template Update
  app.post(`${basePath}/emailTemplateEdit`, [
    validator.check('KeyWord').isLength({ min: 1, max: 50 }).trim()
      .withMessage('INVALID: $[1],KeyWord'),
    validator.check('Type').isIn(['user', 'provider']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('Template').trim().withMessage('INVALID: $[1],Template')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.emailTemplateEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Users View
  app.get(`${basePath}/usersListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.parentAppUsersListViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
      // this.usersListViewCtrl(page, (result) => {
      //   this.ctrlHandler([result], result.error, lang, (message) => {
      //     return res.send(message)
      //   })
      // })
    }
  })
  // Admin User Details
  app.get(`${basePath}/userDetailView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.parentAppUserDetailsViewCtrl(req.params, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      });
    }
  })
  // Admin Users View
  app.get(`${basePath}/providerListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.providerListViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select CancellationPolicyView
  app.post(`${basePath}/providerEdit`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var id = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.providerEditCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select CancellationPolicyView
  app.post(`${basePath}/providerDocEdit`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var id = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.providerDocEditCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Providers View
  app.get(`${basePath}/providerListView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.providerListViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select provider list view
  app.get(`${basePath}/getProviderView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getProviderCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select provider list view
  app.get(`${basePath}/getProviderDocView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getProviderDocCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin static Pages Add
  app.post(`${basePath}/staticPagesAdd`, [
    validator.check('PageName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],PageName'),
    validator.check('Url').isLength({ min: 1, max: 255 }).trim()
      .withMessage('INVALID: $[1],Url'),
    validator.check('HtmlContent').trim().withMessage('INVALID: $[1],HtmlContent')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.staticPagesAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Static Pages View
  app.get(`${basePath}/staticPagesListView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.staticPagesListViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select staticpages
  app.get(`${basePath}/staticPagesListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.staticPagesSelectCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select staticpages
  app.get(`${basePath}/getStaticpagesView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getStaticPagesViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin static Pages Update
  app.post(`${basePath}/staticPagesEdit`, [
    validator.check('PageName').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],PageName'),
    validator.check('Url').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Url'),
    validator.check('HtmlContent').trim().withMessage('INVALID: $[1],HtmlContent')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.staticPagesEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // cancellation Policy Add
  app.post(`${basePath}/cancellationPolicyAdd`, [
    validator.check('Description').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Description'),
    validator.check('UserType').isIn(['user', 'provider']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],UserType')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.cancellationPolicyAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // cancellation policy View
  app.get(`${basePath}/cancellationPolicyView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.cancellationPolicyViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // cancellationPolicy Page View
  app.post(`${basePath}/cancellationPolicyView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit, type: req.body.type }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.cancellationPolicyPageViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select CancellationPolicyView
  app.get(`${basePath}/getCancellationPolicyView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getCancellationPolicyViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // cancellation Policy Update
  app.post(`${basePath}/cancellationPolicyEdit`, [
    validator.check('Description').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Description'),
    validator.check('UserType').isIn(['user', 'provider']).isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],UserType')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.cancellationPolicyEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // app Slider Add
  app.post(`${basePath}/appSliderAdd`, [
    validator.check('Title').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Title'),
    validator.check('Description').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('Image').isLength({ min: 1, max: 255 }).optional()
      .withMessage('INVALID: $[1],Image'),
    validator.check('Type').isIn(['user', 'provider']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.appSliderAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select Bookings
  app.get(`${basePath}/bookingsListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.bookingsListSelectCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select bookings list view
  app.get(`${basePath}/getBookingsView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getBookingsViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select provider update location list view
  app.get(`${basePath}/getProviderLocationBookingsView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getProviderLocationBookingsViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // appSlider Page View
  app.get(`${basePath}/appSliderView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.appSliderPageViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select appSlider
  app.get(`${basePath}/getappSliderView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getappSliderViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // appSlider Update
  app.post(`${basePath}/appSliderEdit`, [
    validator.check('Title').trim().isLength({ min: 1, max: 45 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('Description').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('Image').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],file'),
    validator.check('Type').isIn(['user', 'provider']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.appSliderEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // users push notification view Page View
  app.get(`${basePath}/usersPushNotificationView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.usersPushNotificationPageViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // users push notification search data view View
  app.get(`${basePath}/usersPushNotificationSearchView/:name`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var name = { name: req.params.name, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.usersPushNotificationSearchDataViewCtrl(name, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // providers push notification Page View
  app.get(`${basePath}/providersPushNotificationView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.providersPushNotificationPageViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // provider push notification search data view View
  app.get(`${basePath}/providerPushNotificationSearchView/:name`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var name = { name: req.params.name, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.providerPushNotificationSearchDataViewCtrl(name, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // user PushNotification Send
  app.post(`${basePath}/userPushNotificationSend`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.usersPushNotificationSendCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // provider PushNotification Send
  app.post(`${basePath}/providerPushNotificationSend`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.providersPushNotificationSendCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // app Slider Add
  app.post(`${basePath}/fileUpload`, async function (req, res) {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = { req: req, res: res }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.fileUploadCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Booking Clear Api
  app.post(`${basePath}/bookingAllDelete`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.bookingAllDeleteCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // common search Page View
  app.get(`${basePath}/commonSearchViewPage/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var data = JSON.parse(req.params.page)
    var page = { typename: data.typename, search: data.search, page: data.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.commonSearchViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // parent user search Page View
  app.get(`${basePath}/parentUserSearchViewPage/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var data = JSON.parse(req.params.page)
    var page = { typename: data.typename, search: data.search, page: data.page, limit: limit ,sort:data.sort,order:data.order}
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.parentUserSearchViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // get users and providers list in html content
  app.get(`${basePath}/getUsersProviderList`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.query
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getUsersProviderListCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message.data)
        })
      })
    }
  })
  // Admin panel get provider list provider vehicle
  app.get(`${basePath}/getProviderDetailsListView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getProviderDetailsListViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin panel get provider list provider vehicle documents
  app.get(`${basePath}/getProviderVehicleDocumentsDetailsListView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getProviderVehicleDocumentsDetailsListViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // get providers vehicle list
  app.get(`${basePath}/getProviderVehicleListView/:id`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getProviderVehicleListViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message.data)
        })
      })
    }
  })
  // Admin Select provider vehicle edit
  app.post(`${basePath}/providerVehicleEdit`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.providerVehicleEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // Admin Select provider vehicle documents edit
  app.post(`${basePath}/providerVehicleDocumentsEdit`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.providerVehicleDocumentsEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

  // stripe user creation
  app.post(`${basePath}/stripeUserCreate`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.stripeUserCreateCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // provider Account creation
  app.post(`${basePath}/providerAccountCreation`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.providerAccountCreationCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin app slider delete
  app.post(`${basePath}/appSliderDelete`, [
    validator.check('id').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],id')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.appSliderDeleteCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // admin promocodes add
  app.post(`${basePath}/promoCodesAdd`, [
    validator.check('Name').trim().isLength({ min: 1, max: 250 })
      .withMessage('INVALID: $[1],Name'),
    validator.check('Coupon').trim().isLength({ min: 1, max: 30 })
      .withMessage('INVALID: $[1],Coupon'),
    validator.check('Discount').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],Discount'),
    validator.check('Description').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('MinValueToRedeem').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],MinValueToRedeem'),
    validator.check('MaxValueToRedeem').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],MaxValueToRedeem'),
    validator.check('Threshold').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Threshold'),
    validator.check('Type').isIn(['percent', 'value']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('RedeemableType').isIn(['once', 'multiple']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],RedeemableType'),
    validator.check('ValidFrom').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],ValidFrom'),
    validator.check('ValidTo').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],ValidTo'),
    validator.check('Status').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.promoCodesAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // get providers vehicle list
  app.get(`${basePath}/getPromoCodesListView`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getPromoCodesListViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // get providers vehicle list
  app.get(`${basePath}/getPromoCodesEditListView/:id`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getPromoCodesEditListViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select provider vehicle edit
  app.post(`${basePath}/promoCodesEdit`, [
    validator.check('Id').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],Id'),
    validator.check('Name').trim().isLength({ min: 1, max: 250 })
      .withMessage('INVALID: $[1],Name'),
    validator.check('Coupon').trim().isLength({ min: 1, max: 20 })
      .withMessage('INVALID: $[1],Coupon'),
    validator.check('Discount').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],Discount'),
    validator.check('Description').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('MinValueToRedeem').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],MinValueToRedeem'),
    validator.check('MaxValueToRedeem').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],MaxValueToRedeem'),
    validator.check('Threshold').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Threshold'),
    validator.check('Type').isIn(['percent', 'value']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('RedeemableType').isIn(['once', 'multiple']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],RedeemableType'),
    validator.check('ValidFrom').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],ValidFrom'),
    validator.check('ValidTo').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],ValidTo'),
    validator.check('Status').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.promoCodesEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin promo
  app.post(`${basePath}/promocodesStatusUpdate`, [
    validator.check('Id').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],id'),
    validator.check('Status').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.promoCodesStatusUpdateCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin page Select review management
  app.post(`${basePath}/getUserProviderReviewManagement/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    var body = req.body
    page.type = body.type
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.admingetUserProviderReviewManagementCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // banner ads Add
  app.post(`${basePath}/bannerAdsAdd`, [
    validator.check('Title').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Title'),
    validator.check('Description').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('Image_path').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Image_path').optional().withMessage('INVALID: $[1],Image_path'),
    validator.check('Url').isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Url'),
    validator.check('Status').isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.bannerAdsAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // banner ads Page View
  app.get(`${basePath}/bannerAdsView`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.bannerAdsPageViewCtrl((result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select banner ads
  app.get(`${basePath}/getbannerAdsView/:id`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getbannerAdsViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // banner ads Update
  app.post(`${basePath}/bannerAdsEdit`, [
    validator.check('Title').isLength({ min: 1, max: 45 }).trim()
      .withMessage('INVALID: $[1],Title'),
    validator.check('Description').trim().isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Description'),
    validator.check('Image_path').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Image_path').optional().withMessage('INVALID: $[1],Image_path'),
    validator.check('Url').isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Url'),
    validator.check('Status').isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.bannerAdsEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin banner ads status update
  app.post(`${basePath}/bannerAdsStatusUpdate`, [
    validator.check('Id').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],id'),
    validator.check('Status').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.bannerAdsStatusUpdateCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select peek charges
  app.get(`${basePath}/getPeekChargesListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getPeekChargesPageViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // admin promocodes add
  app.post(`${basePath}/peekChargesAdd`, [
    validator.check('type').isIn(['day', 'week']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('name').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Name'),
    validator.check('daydata').optional()
      .withMessage('INVALID: $[1],daydata'),
    validator.check('weekdata').optional()
      .withMessage('INVALID: $[1],weekdata'),
    validator.check('starttime').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],starttime'),
    validator.check('endtime').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],endtime'),
    validator.check('fare').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],fare'),
    validator.check('minamount').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Min Amount'),
    validator.check('maxamount').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Max Amount')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        message.data = error.array()
        return res.send(message)
      })
    } else {
      this.peekChargesAddCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // get peek charges list
  app.get(`${basePath}/getPeekChargesEditListView/:id`, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    const id = req.params.id
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getPeekChargesEditListViewCtrl(id, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select peek charges edit
  app.post(`${basePath}/peekChargesEdit`, [
    validator.check('Id').trim().isLength({ min: 1, max: 11 })
      .withMessage('INVALID: $[1],Id'),
    validator.check('type').isIn(['day', 'week']).isLength({ min: 1, max: 10 })
      .withMessage('INVALID: $[1],Type'),
    validator.check('name').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Name'),
    validator.check('daydata').optional()
      .withMessage('INVALID: $[1],daydata'),
    validator.check('weekdata').optional()
      .withMessage('INVALID: $[1],weekdata'),
    validator.check('starttime').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],starttime'),
    validator.check('endtime').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],endtime'),
    validator.check('fare').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],fare'),
    validator.check('minamount').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Min Amount'),
    validator.check('maxamount').isLength({ min: 1, max: 255 })
      .withMessage('INVALID: $[1],Max Amount')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.peekChargesEditCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin Select withdrawl requests
  app.get(`${basePath}/getWithdrawlListView/:page`, app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var limit = 10
    var page = { page: req.params.page, limit: limit }
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.getWithdrawlListViewCtrl(page, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })
  // Admin with drawl request status update
  app.post(`${basePath}/withDrawlRequestStatusUpdate`, [
    validator.check('Id').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],Id'),
    validator.check('Status').trim().isLength({ min: 1 })
      .withMessage('INVALID: $[1],Status')
  ], app.adminauth, (req, res) => {
    const lang = req.headers.lang
    const error = validator.validation(req)
    var data = req.body
    if (error.array().length) {
      this.requestHandler(error.array(), true, lang, (message) => {
        return res.send(message)
      })
    } else {
      this.withDrawlRequestStatusUpdateCtrl(data, (result) => {
        this.ctrlHandler([result], result.error, lang, (message) => {
          return res.send(message)
        })
      })
    }
  })

 // Admin Vehicle Model Update
 app.post(`${basePath}/saveProviderVehicle`,[
  validator.check('Id').trim().isLength({ min: 1})
    .withMessage('INVALID: $[1],Id'),
  validator.check('Brand').trim().isLength({ min: 1 })
    .withMessage('INVALID: $[1],Brand'),
  validator.check('Model').isLength({ min: 1 })
    .withMessage('INVALID: $[1],Model'),
  validator.check('Seats').isLength({ min: 1 })
    .withMessage('INVALID: $[1],No of Seats'),
    validator.check('year').isLength({ min: 1 })
    .withMessage('INVALID: $[1],Year'),
    validator.check('Color').isLength({ min: 1})
    .withMessage('INVALID: $[1],Color'),
    validator.check('Car_Number').isLength({ min: 1})
    .withMessage('INVALID: $[1],Car Number'),
    validator.check('Service_Type').isLength({ min: 1 })
    .withMessage('INVALID: $[1],Service'),
    validator.check('CategoryId').isLength({ min: 1 })
    .withMessage('INVALID: $[1],Vehicle Category')
], app.adminauth, (req, res) => {
  const lang = req.headers.lang
  const error = validator.validation(req)
  var data = req.body
  if (error.array().length) {
    this.requestHandler(error.array(), true, lang, (message) => {
      message.data = error.array()
      return res.send(message)
    })
  } else {
    this.saveProviderVehicle(data, (result) => {
      this.ctrlHandler([result], result.error, lang, (message) => {
        return res.send(message)
      })
    })
  }
})






  // Get vehicales categories 

  // app.get(`${basePath}/getVehicalCateg`,(req, res) => {


  //   const lang = req.headers.lang
  //   const error = validator.validation(req)
  //   if (error.array().length) {
  //     this.requestHandler(error.array(), true, lang, (message) => {
  //       return res.send(message)
  //     })
  //   } else {
  //     this.gettest((result) => {
  //       this.ctrlHandler([result], result.error, lang, (message) => {
  //         return res.send(message)
  //       })
  //     })
  //   }

  // })







}
