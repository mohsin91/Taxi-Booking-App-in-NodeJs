module.exports = function () {
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
  var Knex = require('knex')
  const users = 'Users'
  const usersdevice = 'UserDevices'

  // Users List Count Select
  this.usersListCount = () => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users).count(`Id as count`)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
  // Users List Select
  this.usersListView = (data) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users).select().limit(limit).offset(offset)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
  // Users push notification List Select
  this.usersPushNotificationListView = (data) => {
    var output = {}
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users).select().limit(limit).offset(offset)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
  // Users push notification search data List Select
  this.usersPushNotificationSearchDataListView = (data) => {
    var output = {}
    var name = data.name
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users).select(knex.raw(`${users}.*,CONCAT(FirstName,LastName) as fullname`))
        .having('fullname', 'like', `%${name}%`)
        .orHaving('Mobile', 'like', `%${name}%`)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
  // Users push notification Send Select Data
  this.usersPushNotificationSendList = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(usersdevice).select('GCMId')
        .whereIn('UserId', data)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
  // get Users and provider lists
  this.getUsersProviderList = (tablename) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(tablename)
        .then((result) => {
          if (result.length) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
  // Users manual booking search data List
  this.getUsersManualBookingUsersCheckList = (mobile) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users).select(knex.raw(`${users}.*,CONCAT(ExtCode,Mobile) as mobile`))
        .having('mobile', '=', `${mobile}`)
        .then((result) => {
          if (result) {
            output.error = false
            output.data = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.data = null
          resolve(err)
        }).finally(() => {
          knex.destroy()
        })
    })
  }
}
