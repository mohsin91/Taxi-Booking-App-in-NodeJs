module.exports = function () {
  require('../services/InvoiceService')()
  require('../repository/BookingRepository')()
  require('../services/AppConfigService')()
  require('../services/RatingServices')()
  require('../Utils/common')()
  require('../Utils/mailer')()
  this.invoiceMailerCtrl = (callback) => {
    this.getUsersBookingDetails(async (result) => {
      try {
        var usersInfo = result
        if (usersInfo.error) {

        } else {
          var smtp = await this.getSMTPConfig()
          var template = await this.getEmailTemplateList(2)
          usersInfo.data.map(async (userDetails) => {
            var FirstName = userDetails.FirstName
            var LastName = userDetails.LastName
            var Image = userDetails.Image
            var Email = userDetails.Email
            var year = new Date().getFullYear()
            var rating = {
              TypeId: {
                BookingId: userDetails.Id
              },
              Type: {
                ReviewedBy: 'user'
              }
            }
            if (userDetails.IsUserReviewed === 'no') {
              var curtype = userDetails.currencyType
              var temp = await this.multipleStringReplace(template.data, [
                { substr: '*username*', to: FirstName + LastName },
                { substr: '*name*', to: FirstName + LastName },
                { substr: '*year*', to: year },
                { substr: '*userimage*', to: Image },
                { substr: '*basefare*', to: curtype + userDetails.estimation },
                { substr: '*ridedate*', to: userDetails.createAt },
                { substr: '*source*', to: userDetails.fromLocation },
                { substr: '*destination*', to: userDetails.toLocation },
                { substr: '*ridename*', to: userDetails.rideName },
                { substr: '*distance*', to: ((userDetails.distance) / 1000) },
                { substr: '*triptime*', to: userDetails.waitingCharges },
                { substr: '*time*', to: curtype + userDetails.waitingCharges },
                { substr: '*tax*', to: curtype + userDetails.tax },
                { substr: '*total*', to: curtype + userDetails.totalAmount },
                { substr: '*subtotal*', to: curtype + userDetails.totalAmount },
                { substr: '*paymentcharge*', to: curtype + userDetails.totalAmount },
                { substr: '*paymentmode*', to: userDetails.paymentMode }
              ])
              this.MailerNew(smtp.data, Email, 'Booking Invoice', temp)
              await this.updateEmailInvoiceStatusService(userDetails.Id)
            } else {
              var fetchrating = await this.fetchRatingDetailsService(rating)
              var triprating = await this.bookingTripStarCounting(fetchrating.data.Rating)
              var curtype1 = userDetails.currencyType
              var temp1 = await this.multipleStringReplace(template.data, [
                { substr: '*username*', to: FirstName + LastName },
                { substr: '*name*', to: FirstName + LastName },
                { substr: '*year*', to: year },
                { substr: '*userimage*', to: Image },
                { substr: '*basefare*', to: curtype1 + userDetails.estimation },
                { substr: '*ridedate*', to: userDetails.createAt },
                { substr: '*source*', to: userDetails.fromLocation },
                { substr: '*destination*', to: userDetails.toLocation },
                { substr: '*ridename*', to: userDetails.rideName },
                { substr: '*distance*', to: ((userDetails.distance) / 1000) },
                { substr: '*triptime*', to: userDetails.waitingCharges },
                { substr: '*time*', to: curtype1 + userDetails.waitingCharges },
                { substr: '*tax*', to: curtype1 + userDetails.tax },
                { substr: '*total*', to: curtype1 + userDetails.totalAmount },
                { substr: '*subtotal*', to: curtype1 + userDetails.totalAmount },
                { substr: '*paymentcharge*', to: curtype1 + userDetails.totalAmount },
                { substr: '*paymentmode*', to: userDetails.paymentMode },
                { substr: '*triprating*', to: triprating }
              ])
              this.MailerNew(smtp.data, Email, 'Booking Invoice', temp1)
              await this.updateEmailInvoiceStatusService(userDetails.Id)
            }
          })
        }
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
      }
    })
  }
}
