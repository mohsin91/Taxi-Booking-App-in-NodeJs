module.exports = function () {
  require('dotenv').config()

  var wallet = 'Wallet'
  var withdrawal = 'WithDrawal'

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

  this.insertWallet = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(wallet)
        .insert(data)
        .then(result => {
          if (result[0] > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch(err => {
          err.error = true
          resolve(err)
        })
    })
  }

  this.creditWallet = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(wallet)
        .update({ Balance: knex.raw('?? + ?', ['Balance', data.Amount]) })
        .where({ UserTypeId: data.UserTypeId, UserType: data.UserType })
        .then(result => {
          if (result[0] > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch(err => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.debitWallet = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(wallet)
        .update({ Balance: knex.raw('?? - ?', ['Balance', data.Amount]) })
        .where({ UserTypeId: data.UserTypeId, UserType: data.UserType })
        .then(result => {
          if (result[0] > 0) {
            output.result = result
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch(err => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchWalletInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(wallet)
        .where({ UserTypeId: data.UserTypeId, UserType: data.UserType })
        .then(async result => {
          if (result.length > 0) {
            output.error = false
            output.result = result[0]
          } else {
            var walletCreate = await this.insertWallet(data)
            if (walletCreate.error) {
              output.error = true
            } else {
              var walletInfo = await this.fetchWalletInfo(data)
              output.result = walletInfo.result
              output.error = false
            }
          }
          resolve(output)
        })
        .catch(err => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.insertWithdrawalRequest = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(withdrawal)
        .insert(data)
        .then((result) => {
          output.error = false
          output.result = result[0]
          resolve(output)
        })
        .catch(err => {
          output.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
}
