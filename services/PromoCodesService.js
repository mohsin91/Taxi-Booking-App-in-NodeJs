module.exports = function () {
  require('../repository/PromoCodesRepository')()
  require('../Utils/common')()
  require('dotenv').config()
  this.usersPromoCodesListService = async (data, callback) => {
    var response = {}
    try {
      var promocodesDetails = await this.usersPromoCodesList()
      if (promocodesDetails.error) {
        response.error = true
        response.msg = 'FAILED'
      } else {
        response.error = false
        response.msg = 'VALID'
        response.data = promocodesDetails.result
      }
      callback(response)
    } catch (err) {
      err.error = true
      callback(err)
    }
  }
  this.userPromoCodesRedeemService = (data) => {
    var response = {}
    var result = {}
    return new Promise(async function (resolve) {
      try {
        var couponcode = data.coupon
        var amount = parseFloat(data.amount)
        var promoCodesDetails = await this.getPromocodesList(couponcode)
        if (promoCodesDetails.error === false) {
          if (promoCodesDetails.result.length > 0) {
            var promocodesData = promoCodesDetails.result[0]
            if (amount >= promocodesData.MinValueToRedeem) {
              var discountAmount = parseFloat(promocodesData.Discount)
              switch (promocodesData.Type) {
                case 'percent':
                  var returnAmount = amount - (amount * (discountAmount / 100))
                  var saveamnt = amount - returnAmount
                  if (returnAmount >= discountAmount) {
                    returnAmount = amount - parseFloat(promocodesData.MaxValueToRedeem)
                    saveamnt = amount - returnAmount
                  }
                  result.amount = returnAmount.toFixed(2)
                  result.amountTxt = 'kr ' + result.amount
                  result.name = promocodesData.Name
                  result.savedAmount = saveamnt.toFixed(2)
                  result.savedAmountTxt = 'kr ' + result.savedAmount
                  result.description = promocodesData.Description
                  response.error = false
                  response.msg = 'PROMOCODE_ACCEPT'
                  response.data = result
                  break
                case 'value':
                  var returnValueAmount = (amount - discountAmount)
                  result.Amount = returnValueAmount
                  response.error = false
                  response.msg = 'PROMOCODE_ACCEPT'
                  response.data = result
                  break

                default:
                  response.error = true
                  response.msg = 'FAILED'
                  break
              }
            } else {
              response.error = true
              response.msg = 'PROMOCODE_INVALIDAMOUNT'
            }
          } else {
            response.error = true
            response.msg = 'INVALID_PROMOCODE'
          }
        } else {
          response.error = true
          response.msg = 'PROMOCODE_EXPIRED'
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(response)
      }
    })
  }
  this.addPromoCodeRedeemableService = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var sendData = {
          UserId: data.userId,
          Amount: data.amount,
          DiscountAmount: data.discountAmount
        }
        var promocodeadddetails = await this.addPromoCodeRedeemable(sendData)
        if (promocodeadddetails.error) {
          response.error = true
          response.msg = 'FAILED'
        } else {
          response.error = false
          response.msg = 'VALID'
          response.result = promocodeadddetails.data
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
  this.updatePromoCodeRedeemableService = (data) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var sendData = {
          where: {
            Id: data.Id
          },
          data: {
            BookingId: data.bookingId
          }
        }
        var promocodeadddetails = await this.updatePromoCodeRedeemable(sendData)
        if (promocodeadddetails.error) {
          response.error = true
          response.msg = 'FAILED'
        } else {
          response.error = false
          response.msg = 'VALID'
          response.result = promocodeadddetails.data
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
