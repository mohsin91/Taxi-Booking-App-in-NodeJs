module.exports = function () {
  const appConfig = 'AppConfig'
  const slider = 'AppSlider'
  const emailTemplate = 'EmailTemplate'

  require('dotenv').config()
  const config = {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    pool: {
      min: Number(process.env.DB_POOL_MIN),
      max: Number(process.env.DB_POOL_MAX)
    },
    acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
  }
  const Knex = require('knex')

  this.authType = (data, type, callback) => {
    var response = {}
    var knex = new Knex(config)
    knex(appConfig)
      .select('Value', 'FieldName')
      .whereIn('FieldName', type)
      .where(data)
      .then((result) => {
        if (result.length > 0) {
          response.error = false
          response.result = result
        } else {
          response.error = true
          response.result = null
        }
        callback(response)
      })
      .catch((err) => {
        err.error = true
        err.result = []
        callback(response)
      })
      .finally(() => {
        knex.destroy()
      })
  }

  this.authTypeCheck = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(appConfig)
        .select('Value', 'FieldName')
        .where(data.type)
        .where(data.fieldname)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result[0]
          } else {
            response.error = true
            response.result = null
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          err.result = null
          resolve(response)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchSlider = (data, callback) => {
    var response = {}
    var knex = new Knex(config)
    knex(slider)
      .select('Id as id', 'Title as title', 'Description as description', 'Image as image')
      .where(data)
      .then((result) => {
        if (result.length > 0) {
          response.error = false
          response.result = result
        } else {
          response.error = true
        }
        callback(response)
      })
      .catch((err) => {
        err.error = false
        callback(err)
      })
      .finally(() => {
        knex.destroy()
      })
  }

  this.fetchEmailTemplate = (id, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(emailTemplate)
        .where('id', id)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
}
