module.exports = function () {
  require('../../repository/Admin/DashboardRepository')()
  require('../../Utils/common')()
  require('dotenv').config()
  this.admindashboardListViewService = async (callback) => {
    var response = {}
    var dashboard = []
    const users = 'Users'
    const providers = 'Provider'
    const booking = 'Booking'
    const ridevehicletype = 'RideVehicleType'
    var day = 'day'
    var month = 'month'
    var year = 'year'
    var week = 'week'
    try {
      var userscount = await this.dashboardListView(users)
      var providerscount = await this.dashboardListView(providers)
      var bookingscount = await this.dashboardListView(booking)
      var ridevehicletypecount = await this.dashboardListView(ridevehicletype)
      var dayearning = await this.dashboardBookingEarningsView(day)
      var monthearning = await this.dashboardBookingEarningsView(month)
      var weekearning = await this.dashboardBookingEarningsView(week)
      var yearearning = await this.dashboardBookingEarningsView(year)
      dashboard.push({
        userscount: userscount.data['count'],
        providerscount: providerscount.data['count'],
        bookingscount: bookingscount.data['count'],
        ridevehicletypecount: ridevehicletypecount.data['count'],
        dayearning: dayearning.data['Total'],
        monthearning: monthearning.data['Total'],
        weekearning: weekearning.data['Total'],
        yearearning: yearearning.data['Total']
      })
      if (userscount.error === false && providerscount.error === false && bookingscount.error === false && ridevehicletypecount.error === false &&
            dayearning.error === false && monthearning.error === false && weekearning.error === false && yearearning.error === false) {
        response.error = false
        response.data = dashboard
        response.msg = 'VALID'
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }
}
