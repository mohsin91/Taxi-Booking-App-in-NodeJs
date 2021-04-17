module.exports = function () {
  require('../repository/RatingRepository')()

  this.userRating = async (rating, callback) => {
    var response = {}
    try {
      var userRating = await this.insertUserReview(rating)
      if (userRating.error) {
        response.error = true
        response.msg = 'UPDATE_ERROR: $[1], feedback'
      } else {
        response.error = false
        response.msg = 'FEEDBACK_SUCCESS'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.providerRating = async (rating, callback) => {
    var response = {}
    try {
      var userRating = await this.insertUserReview(rating)
      if (userRating.error) {
        response.error = true
        response.msg = 'UPDATE_ERROR: $[1], feedback'
      } else {
        response.error = false
        response.msg = 'FEEDBACK_SUCCESS'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.getUserAverageRating = (userId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var rating = await this.fetchUserAverageRating(userId)
        if (rating.error) {
          response.error = true
          response.msg = 'NO_DATA'
        } else {
          response.error = false
          response.msg = 'VALID'
          response.data = rating.result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }

  this.getProviderAverageRating = async (providerId) => {
    var response = {}
    return new Promise(async function (resolve) {
      try {
        var rating = await this.fetchProviderAverageRating(providerId)
        if (rating.error) {
          response.error = true
          response.msg = 'NO_DATA'
        } else {
          response.error = false
          response.msg = 'VALID'
          response.data = rating.result
        }
        resolve(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        resolve(err)
      }
    })
  }
  this.fetchRatingDetailsService = (rating) => {
    return new Promise(async function (resolve) {
      var response = {}
      try {
        var userRating = await this.fetchRatingDetails(rating)
        if (userRating.error) {
          response.error = true
          response.msg = 'FAILED: $[1], rating'
        } else {
          response.error = false
          response.data = userRating.result
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
