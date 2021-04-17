module.exports = function () {
  require('../../services/Admin/SearchService')()
  require('../../Utils/common')()
  var db = require('../../services/adaptor/mongodbAdaptor')
    , CONFIG = require('../../config/config');
  require('dotenv').config()
  this.commonSearchViewCtrl = (req, callback) => {
    var response = {}
    this.commonSearchViewService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }

  this.parentUserSearchViewCtrl = (req, callback) => {
    var response = {}
    req.page = 1;
    req.limit = 10;
    var conditionSortNPaginate =
      [
        {
          $facet: {
            data: [
              {
                $match:
                {
                  
                  // email: { $regex: req.search }
                  $or: [ { email: {  $regex: req.search } }, {"phone.number":{  $regex: req.search } },{"phone.code":{  $regex: req.search } },{"name.first_name":{  $regex: req.search } },{"name.last_name":{  $regex: req.search } } ] 
                }
              },
              { $sort: { [req.sort]: req.order } },
              { $skip: ((req.page * req.limit) - req.limit) },
              { $limit: req.limit }
            ],
            total: [{ $count: 'total' }]
          }
        }
      ];

    try {
      db.GetAggregation('users', conditionSortNPaginate, (err, data) => {
        if (err) {
          response.error = true
          response.msg = err.msg
        } else {
          response.error = false
          response.msg = "VALID"
          response.data = {
            data: data[0].data, Count: data[0].total
          }
        }
        callback(response);
      });
    } catch (e) {
      console.log(e);
    }
  }

  this.usersListViewCtrl = (req, callback) => {
    var response = {}
    this.usersListViewService(req, (result) => {
      if (result.error) {
        response.error = true
        response.msg = result.msg
      } else {
        response.error = false
        response.msg = result.msg
        response.data = result.data
      }
      callback(response)
    })
  }
}
