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

  // commonsearch List Count Select
  this.commonSearchDataListCount = (data) => {
    var output = {}
    var tablename = data.table_name
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(tablename).count(`Id as count`)
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
  // common search data List Select
  this.commonSearchDataListView = (data) => {
    var output = {}
    var name = data.name
    var tablename = data.table_name
    var search = data.search
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(tablename).select('*')
        .having(name, 'like', `%${search}%`)
        // .orHaving('Mobile', 'like', `%${name}%`)
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
  // users List Count Select
  this.usersSearchDataListCount = (data) => {
    var output = {}
    var tablename = data.table_name
    var search = data.search
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(tablename).select(knex.raw(`${tablename}.*,CONCAT(FirstName,LastName) as fullname`))
        .having('fullname', 'like', `%${search}%`)
        .orHaving('Mobile', 'like', `%${search}%`)
        .orHaving('Email', 'like', `%${search}%`)
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
  // booking List Count Select
  this.bookingSearchDataListView = (data) => {
    var output = {}
    var tablename = data.table_name
    var search = data.search
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(tablename).select('*')
        .having('Id', 'like', `%${search}%`)
        .orHaving('Status', 'like', `%${search}%`)
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
  // users search data List Select
  this.usersSearchDataListView = (data) => {
    var output = {}
    var tablename = data.table_name
    var search = data.search
    var limit = data.limit
    var page = data.page
    var offset = (page - 1) * limit
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(tablename).select(knex.raw(`${tablename}.*,CONCAT(FirstName,LastName) as fullname`))
        .having('fullname', 'like', `%${search}%`)
        .orHaving('Mobile', 'like', `%${search}%`)
        .orHaving('Email', 'like', `%${search}%`)
        .limit(limit).offset(offset)
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
}
