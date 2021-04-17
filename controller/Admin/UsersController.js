module.exports = function () {
  require('../../services/Admin/UsersService')()
  require('../../Utils/common')()
  require('../../Utils/enums');
  var db = require('../../services/adaptor/mongodbAdaptor')
    , CONFIG = require('../../config/config');
  require('dotenv').config()
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

  this.parentAppUsersListViewCtrl = (req, callback) => {
    var response = {}
    var conditionSortNPaginate =
      [
        {
          $facet: {
            data: [
              { $match: { status: { $gt: 0 } } },
              { $sort: { createdAt: -1 } },
              { $skip: ((req.page * req.limit) - req.limit) },
              { $limit: req.limit }
            ],
            total: [{ $count: 'total' }]
          }
        }
      ];
    // var conditionSortNPaginate = {
    //   sort: { createdAt: -1 },
    //   skip: ((req.page * req.limit) - req.limit),
    //   limit: req.limit
    // };

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
        for(let i=0;i<response.data.data.length;i++){
          const temp = this.userStatusEnum.filter(word => word.value == response.data.data[i].status);
          response.data.data[i].status=temp[0].key;
        }
      }
      callback(response);
    });
    // db.GetDocument('users', { status: { $gt: 0 } }, {}, conditionSortNPaginate, (err, users) => {
    //   if (err) {
    //     response.error = true
    //     response.msg = err.msg
    //   } else {
    //     response.error = false
    //     response.msg = "VALID"
    //     response.data = users
    //   }
    //   callback(response)
    // });

    // this.usersListViewService(req, (result) => {
    //   if (result.error) {
    //     response.error = true
    //     response.msg = result.msg
    //   } else {
    //     response.error = false
    //     response.msg = result.msg
    //     response.data = result.data
    //   }
    // callback(response)
    // })
  }

  this.parentAppUserDetailsViewCtrl = (req, callback) => {
    var response = {};
    db.GetOneDocument("users", { _id: req.id }, {}, {}, (err, parentUser) => {
      if (err) {
        response.error = true
        response.msg = err.msg
        callback(response)
      } else {
        response.error = false
        response.msg = "VALID"
        response.data = [{ data: parentUser, key: 'parent_user', display_name: 'Parent' }]
        var account_ids = typeof parentUser.account_ids == typeof {} ? Object.entries(parentUser.account_ids) : []
        var promiseArray = []
        account_ids.forEach(accountArray => {
          switch (accountArray[0]) {
            case "chat_id":
              promiseArray.push(new Promise((success) => {
                db.GetOneDocument("user", { _id: accountArray[1] }, {}, {}, (err, chat_user) => {
                  if (!err && chat_user) response.data.push({data: chat_user, key: 'chat_user', display_name: 'Chat' });
                  success()
                })
              }))
              break;
          }
        });
        if (promiseArray.length > 0) {
          Promise.all(promiseArray).then(() => {
            callback(response);
          })
        }
        else {
          callback(response);
        }
      }
    })
  };

  this.usersPushNotificationPageViewCtrl = (req, callback) => {
    var response = {}
    this.usersPushNotificationPageViewService(req, (result) => {
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
  this.usersPushNotificationSearchDataViewCtrl = (req, callback) => {
    var response = {}
    this.usersPushNotificationSearchDataViewService(req, (result) => {
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
  this.usersPushNotificationSendCtrl = (req, callback) => {
    var response = {}
    this.usersPushNotificationSendService(req, (result) => {
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
  this.getUsersProviderListCtrl = (req, callback) => {
    var response = {}
    this.getUsersProviderListService(req, (result) => {
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
  this.getManualBookingUsersCheckListCtrl = (req, callback) => {
    var response = {}
    this.getManualBookingUsersCheckListService(req, (result) => {
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
