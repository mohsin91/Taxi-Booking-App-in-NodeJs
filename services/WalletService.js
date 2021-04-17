module.exports = function () {
  require('dotenv').config()
  require('../repository/WalletRepository')()

  this.createWalletService = async (userId, type, balance) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var data = {}
        data.UserTypeId = userId
        data.UserType = type
        data.Balance = balance
        var wallet = await this.insertWallet(data)
        if (wallet.error) {
          response.error = true
          response.msg = 'ERROR_CREATE_WALLET'
        } else {
          response.error = false
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.debitWalletService = async (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var walletUpdate = {}
        walletUpdate.UserTypeId = data.userId
        walletUpdate.UserType = data.userType
        walletUpdate.Amount = data.amount
        var walletInfo = await this.fetchWalletInfo(walletUpdate)
        if (walletInfo.error) {
          response.error = true
          response.msg = 'LOW_WALLET_BALANCE'
        } else {
          var wallet = this.debitWallet(walletUpdate)
          if (wallet.error) {
            response.error = true
            response.msg = 'ERROR_CREATE_WALLET'
          } else {
            response.error = false
            response.data = wallet.result
            response.msg = 'VALID'
          }
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(response)
      }
    })
  }

  this.creditWalletService = async (data) => {
    var response = {}
    return new Promise(function (resolve) {
      try {
        var walletUpdate = {}
        walletUpdate.UserTypeId = data.userId
        walletUpdate.UserType = data.userType
        walletUpdate.Amount = data.amount
        var wallet = this.creditWallet(walletUpdate)
        if (wallet.error) {
          response.error = true
          response.msg = 'ERROR_CREATE_WALLET'
        } else {
          response.error = false
          response.data = wallet.result
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(response)
      }
    })
  }

  this.getWalletInfoService = (userId, type) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var data = {}
        data.UserTypeId = userId
        data.UserType = type
        var wallet = await this.fetchWalletInfo(data)
        if (wallet.error) {
          response.error = true
          response.msg = 'ERROR_WALLET'
        } else {
          var balance = wallet.result.Balance
          response.error = false
          response.data = balance
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.providerWithdrawalRequestSerivce = (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var data = {}
        data.UserTypeId = providerId
        data.UserType = 'provider'
        var walletInfo = await this.fetchWalletInfo(data)
        if (walletInfo.error) {
          response.error = true
          response.msg = 'LOW_WALLET_BALANCE'
        } else {
          response.error = false
          response.msg = 'VALID'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
}
