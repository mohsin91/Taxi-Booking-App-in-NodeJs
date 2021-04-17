module.exports = function () {
  require('dotenv').config()
  var admin = require('firebase-admin')

  var serviceAccount = require('../keyfile/firebase-admin/firebase-admin-sdk.json')

  if (!admin.apps.length) {
    console.log('firebase admin initialized')
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://gettaxi-user-bde6a.firebaseio.com'
    })
  }

  this.sendPushNotificationByDeviceType = (deviceInfo, content) => {
    var response = {}
    return new Promise(function (resolve) {
      try {
        var messages
        if (deviceInfo.deviceType.toLowerCase() === 'android') {
          messages = {
            'token': deviceInfo.token,
            'data': {
              'title': content.title,
              'body': content.body,
              'data': content.data
            },
            'android': {
              'priority': 'high'
            },
            'apns': {
              'headers': {
                'apns-priority': '5'
              },
              'payload': {
                'aps': {
                  'category': 'NEW_MESSAGE_CATEGORY',
                  'sound': 'default'
                }
              }
            }
          }
        } else {
          messages = {
            'token': deviceInfo.token,
            'notification': {
              'title': content.title,
              'body': content.body
            },
            'data': {
              'title': content.title,
              'body': content.body,
              'data': content.data
            },
            'android': {
              'priority': 'high'
            },
            'apns': {
              'headers': {
                'apns-priority': '5'
              },
              'payload': {
                'aps': {
                  'category': 'NEW_MESSAGE_CATEGORY',
                  'sound': 'default'
                }
              }
            }
          }
        }
        admin.messaging().send(messages)
          .then((result) => {
            response.error = false
            resolve(response)
          })
          .catch((err) => {
            err.error = true
            resolve(err)
          })
      } catch (err) {
        err.error = false
        resolve(err)
      }
    })
  }
  this.sendBulkPushNotification = (deviceInfo, content) => {
    var response = {}
    var messages = {
      'tokens': deviceInfo,
      'notification': {
        'title': content.title,
        'body': content.body
      },
      'data': {
        'title': content.title,
        'body': content.body,
        'data': content.data
      },
      'android': {
      },
      'apns': {
        'headers': {
        },
        'payload': {
          'aps': {
            'category': 'NEW_MESSAGE_CATEGORY',
            'sound': 'default'
          }
        }
      }
    }
    return new Promise(function (resolve) {
      try {
        admin.messaging().sendMulticast(messages)
          .then((result) => {
            response.error = false
            response.data = result
            console.log('Successfully sent message:', JSON.stringify(result))
            resolve(response)
          })
          .catch((err) => {
            err.error = true
            console.log('Error sending message:', err)
            resolve(err)
          })
      } catch (err) {
        err.error = false
        resolve(err)
      }
    })
  }
}
