module.exports = function (server) {
  require('../Utils/error')()
  require('../controller/InvoiceController')()

  // setInterval(() => {
  //   this.invoiceMailerCtrl((result) => {
  //     this.ctrlHandler([result], result.error, 'default', (message) => {
  //      console.log('Reassign Booking', message)
  //     })
  //   })
  // }, 300000)
}
