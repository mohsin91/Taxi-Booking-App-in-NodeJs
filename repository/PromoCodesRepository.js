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
  const promocodes = 'CouponCode'
  const promocoderedeem = 'CouponRedeemed'
  this.usersPromoCodesList = (knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(promocodes)
        .select('Id', 'Discount', 'Type', 'Threshold', 'MinValueToRedeem', 'RedeemableType', 'ValidFrom', 'ValidTo', 'Status')
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
  this.getPromocodesList = (coupon) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.raw(`select Id,Name,Discount,Description,Type,Status,Threshold,MinValueToRedeem,MaxValueToRedeem,RedeemableType,ValidFrom,ValidTo
      from ${promocodes} where Status = 'Active' and date(now()) <= ValidTo and Coupon = ?`, [coupon])
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result[0]
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
  // users update promo codes
  this.usersPromoCodesUpdate = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(promocodes)
        .where(data.where)
        .update(data.data)
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
  // users add promo code redeemable
  this.addPromoCodeRedeemable = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(promocoderedeem)
        .insert(data)
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
  // users update promo code redeemable
  this.updatePromoCodeRedeemable = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(promocoderedeem)
        .where(data.where)
        .update(data.data)
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
