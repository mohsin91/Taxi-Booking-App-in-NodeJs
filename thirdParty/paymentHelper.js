module.exports = function () {
  require('dotenv').config()
  const Stripe = require('stripe')

  this.createPaymentCustomerId = (email) => {
    var output = {}
    return new Promise(function (resolve) {
      var stripe = new Stripe(process.env.STRIPESKKEY)
      stripe.customers.create({
        email: email,
        description: 'A customer has been created on Get Taxi For ' + email
      }, function (err, result) {
        if (err) {
          output.error = true
        } else {
          output.error = false
          output.data = result
        }
        resolve(output)
      })
    })
  }

  this.createPaymentEphemerralKey = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var stripe = new Stripe(process.env.STRIPESKKEY)
      stripe.ephemeralKeys.create({ customer: data.customerID }, {
        stripe_version: data.stripe_version }).then((key) => {
        resolve(key)
      }).catch((err) => {
        resolve('Something went wrong')
        console.log(err)
      }).catch((err) => {
        err.error = true
        resolve(output)
      })
    })
  }

  this.stripeCreateProviderAccounts = function (email) {
    var output = {}
    return new Promise(function (resolve) {
      var stripe = new Stripe(process.env.STRIPESKKEY)
      stripe.accounts.create({
        type: 'custom',
        country: 'DKK',
        requested_capabilities: ['card_payments'],
        email: email
      }, function (err, account) {
        if (err) {
          err.error = true
          err.msg = 'An trading account with this email already exists'
          resolve(err)
        } else {
          output.error = false
          output.data = account.id
          resolve(output)
        }
      })
    })
  }

  this.stripePaymentCharge = function (amount, customerid, cardId, email) {
    // console.log(amount, customerid, cardId, email)
    var output = {}
    amount = amount * 100
    return new Promise(function (resolve) {
      var stripe = new Stripe(process.env.STRIPESKKEY)
      stripe.charges.create({
        amount: amount,
        customer: customerid,
        currency: 'DKK',
        source: cardId, // obtained with Stripe.js
        description: 'Charge create by ' + email
      }, function (err, charge) {
        if (err) {
          err.error = true
          err.msg = 'OOPS'
          resolve(err)
        } else {
          output.error = false
          resolve(output)
        }
      })
    })
  }
  this.usersStripeCreateCards = function (customerid, source) {
    // console.log(amount, customerid, cardId, email)
    var output = {}
    return new Promise(function (resolve) {
      var stripe = new Stripe(process.env.STRIPESKKEY)
      stripe.customers.createSource(
        customerid,
        {
          source: source
        },
        function (err, card) {
          // asynchronously called
          if (err) {
            err.error = true
            err.msg = 'An card error'
            resolve(err)
          } else {
            output.error = false
            resolve(output)
          }
        })
    })
  }
  this.getStripeCardLists = function (customerid) {
    var output = {}
    return new Promise(function (resolve) {
      var stripe = new Stripe(process.env.STRIPESKKEY)
      stripe.customers.listSources(customerid, {
        limit: 100,
        object: 'card'
      }, function (err, cards) {
        // asynchronously called
        if (err) {
          err.error = true
          err.msg = 'An card error'
          resolve(err)
        } else {
          output.error = false
          output.data = cards
          resolve(output)
        }
      })
    })
  }
  this.stripeCardRemove = function (customerId, cardId) {
    var output = {}
    return new Promise(function (resolve) {
      var stripe = new Stripe(process.env.STRIPESKKEY)
      stripe.customers.deleteSource(customerId, cardId,
        function (err, cards) {
        // asynchronously called
          if (err) {
            err.error = true
            err.msg = 'An card error'
            resolve(err)
          } else {
            output.error = false
            output.data = cards
            resolve(output)
          }
        })
    })
  }

  this.stripeTransfer = function (customerId) {
    var output = {}
    return new Promise(function (resolve) {
      var stripe = new Stripe(process.env.STRIPESKKEY)
      stripe.transfers.create({
        amount: 7000,
        currency: 'DKK',
        destination: customerId,
        transfer_group: 'comments'
      }).then(function (transfer) {
        output.error = false
        output.data = transfer
        resolve(output)
      }).catch(function (err) {
        err.error = true
        resolve(err)
      })
    })
  }
}
