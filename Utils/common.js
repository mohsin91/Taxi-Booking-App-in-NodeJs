module.exports = function () {
  const bcrypt = require('bcryptjs')
  const multer = require('multer')
  const uuid = require('uuid/v4')
  var jwt = require('jsonwebtoken')
  var request = require('request');
  require('dotenv').config()
  var s2 = require('s2-geometry').S2
  var moment = require('moment')
  const authy = require('authy')(process.env.TWILIO_KEY)
  const multiStringReplace = require('multi-string-replace')
  var distance = require('google-distance')
  var configuraion = {
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };

  let mysql = require('mysql2');

  this.generateOTP = function () {
    var val = Math.floor(1000 + Math.random() * 9000)
    val = 1234 // Test
    return val
  }

  this.hashPassword = function (password, saltRounds) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          err = false
          reject(err)
        } else {
          resolve(hash)
        }
      })
    })
  }

  this.comparePassword = function (password, hash) {
    return new Promise(function (resolve) {
      bcrypt.compare(password, hash, function (err, result) {
        if (err) {
          err = false
          resolve(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  this.generateToken = function (data, secret) {
    return new Promise(function (resolve) {
      jwt.sign(data, secret, (err, token) => {
        if (err) {
          resolve(err)
        } else {
          resolve(token)
        }
      })
    })
  }

  this.getPayloadFromToken = function (token, secret) {
    var data = {}
    return new Promise(function (resolve) {
      jwt.verify(token, secret, (err, payload) => {
        if (err) {
          data.error = true
          data.data = null
          resolve(data)
        } else {
          data.error = false
          data.data = payload
          resolve(data)
        }
      })
    })
  }

  this.getAdminAuthToken = function (token, secret) {
    var data = {}
    return new Promise(function (resolve) {
      jwt.verify(token, secret, (err, payload) => {
        if (err) {
          data.error = true
          data.data = null
          resolve(data)
        } else {
          data.error = false
          data.data = payload
          resolve(data)
        }
      })
    })
  }

  this.sendOtpMobile = function (mobileNumber, countryCode) {
    var response = {}
    return new Promise(function (resolve) {
      try {
        authy.phones().verification_start(mobileNumber, countryCode, { via: 'sms', locale: 'en' }, function (err, res) {
          if (res) {
            response.error = false
            response.data = res
          } else {
            response.error = true
            response.data = null
            response.msg = err.message
          }
          resolve(response)
        })
      } catch (err) {
        err.error = true
        err.msg = 'FAILED'
        resolve(err)
      }
    })
  }

  this.otpVerify = function (mobileNumber, countryCode, otp) {
    var response = {}
    return new Promise(function (resolve) {
      try {
        authy.phones().verification_check(mobileNumber, countryCode, otp, function (err, res) {
          if (err) {
            response.error = true
            response.data = null
            response.msg = err.message
          } else {
            response.error = false
            response.data = res
          }
          resolve(response)
        })
      } catch (err) {
        err.error = true
        err.msg = 'FAILED'
        resolve(err)
      }
    })
  }

  this.getCellIdFromCoordinates = function (lat, lon) {
    return new Promise(function (resolve) {
      try {
        
        var latitude = parseFloat(lat).toFixed(6)
        var longitude = parseFloat(lon).toFixed(6)
        var response = {}
        response.key = s2.latLngToKey(latitude, longitude, process.env.S2_LEVEL)
        response.id = s2.keyToId(response.key)
        if (response.key || response.id) {
            resolve(response);
        } else {
          response.error = true
          resolve(response)
        }
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getCellIdFromCoordinatesDub = function (lat, lon, Id) {
    return new Promise(function (resolve) {
      try {
        var providerId = Id;
        var latitude = parseFloat(lat).toFixed(6)
        var longitude = parseFloat(lon).toFixed(6)
        var response = {}
        response.key = s2.latLngToKey(latitude, longitude, process.env.S2_LEVEL)
        response.id = s2.keyToId(response.key)
        if (response.key || response.id) {
          //var results.providerId=providerId;
          //Distance and Time
          if (Id !== undefined) {
            let sql4 = `CALL getProviderDrive(?)`;
            let connection = mysql.createConnection(configuraion);
            connection.query(sql4, [providerId],async (error, results) => {
              if (error) {
                return console.error(error.message);
              }
              else {
                results = results[0][0];
                var dbSet = {};
                if(results==undefined){
                  response.Duration = '';
                  response.Distance='';
                  resolve(response);
                }
                else if (results.Status == 'DriverAccepted') {
                  dbSet.destination = latitude + ',' + longitude;
                  dbSet.PickUp = results.SourceLat + ',' + results.SourceLong;
                }
                else {
                  dbSet.destination = latitude + ',' + longitude;
                  dbSet.PickUp = results.DestinyLat + ',' + results.DestinyLong;

                }
                //getcost.PricePerKm=results[0][0].PricePerKm;
                if(results!=undefined){
                  let resp = await this.getDistance(0, dbSet, dbSet);
                  //console.log(response);
                  if(resp){
                    response.Duration = resp.duration;
                    response.Distance = resp.distance;
                  }
                  resolve(response);
                // var distinctSe = this.getTimeDistance(dbSet, async function (res) {
                //   if (res.status === "OK" && res.rows[0].elements[0].status === "OK") {
                //   response.Duration = res.rows[0].elements[0].duration.text;
                //   response.Distance = res.rows[0].elements[0].distance.text;
                //   }
                //   resolve(response);
                // })
              }


              }
            })
            connection.end();
          }
          else {
            resolve(response);
          }


          //
          // resolve(response)
        } else {
          response.error = true
          resolve(response)
        }
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  

 this.getTimeDistance= function (data, callback) {
    var driverData = data;
    distance.apiKey = process.env.MAP_API_KEY;;
    // var googleApi=request.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+driverData.DriverLocation+'&destinations='+driverData.PickUp+'&key=AIzaSyALUdVelXMs_UMm3cBTP4-kl_B97yrHNds')

    // console.log(googleApi);
    // callback(googleApi);
    var options = {
      url: 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + driverData.DriverLocation + '&destinations=' + driverData.PickUp + '&key=AIzaSyALUdVelXMs_UMm3cBTP4-kl_B97yrHNds'
    }

    // console.log("MOURL:" + options.url);


    request(options, callbackHttp)


    function callbackHttp(error, response, body) {
      if (response.statusCode == 200) {

        var obj = JSON.parse(body);
        // console.log("MOBJ:" + JSON.stringify(obj));
        // console.log("MOBJ res:" + JSON.stringify(response));
        // console.log("MOBJ err:" + JSON.stringify(error));
        // callback(obj.rows[0].elements);
        callback(obj);
        //res.render('test', {response: response})
      } else {
        console.log("IbtihajError" + error)
      }
    }

  }

  this.fileUpload = function (image, dir) {
    return new Promise(function (resolve) {
      try {
        var data = {}
        var uid = uuid()
        var storage = multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, process.env.IMAGE_PATH + dir)
            // cb(null, process.env.BASE_URL + req.body['user'])
          },
          filename: (req, file, cb) => {
            cb(null, uid + '.' + file.originalname.split('.')[1])
          }
        })
        var upload = multer({ storage: storage }).single('file')


        upload(image, null, function (err) {
          if (typeof image.file === 'undefined' || err) {
            data.error = true
            data.msg = err
          } else {
            data.error = false
            data.msg = process.env.HOST + ':' + process.env.PORT + '/' + image.file.path.replace('public/', '')
          }
          resolve(data)
        })
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  //upload Documents
  this.documentUploads = function (token, image, dir) {


    return new Promise(function (resolve) {
      try {

        secret = process.env.JWT_SECRET;

        jwt.verify(token, secret, (err, payload) => {
          if (err) {
            data.error = true
            data.data = null
            resolve(data)
          } else {
            // data.error = false
            var providerId = payload.Id
            // resolve(data)


            var data = {}
            var uid = uuid()

            var storage = multer.diskStorage({
              destination: function (req, file, cb) {
                cb(null, 'public/documents')
              },
              filename: function (req, image, cb) {
                cb(null, uid + '-' + image.originalname)
                data.file = 'public/documents/' + uid + '-' + image.originalname;
              }
            })

            var upload = multer({ storage: storage }).single('imagefile')


            upload(image, null, function (err) {
              if (typeof image.file === 'undefined' || err) {
                data.error = true
                data.msg = err
              } else {
                data.error = false
                data.msg = process.env.HOST + ':' + process.env.PORT + '/' + image.file.path.replace('public/documents/', '')

              }
              data.providerId = providerId;

              resolve(data)
            })
          }
        })
      } catch (err) {
        err.error = true
        resolve(err)
      }

    })
  }
  /////////////////

  this.sort_by_key = function (array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }





  this.imageUpload = function (image, res) {
    return new Promise(function (resolve) {
      try {
        var data = {}
        var uid = uuid()
        var storage = multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, process.env.IMAGE_PATH + req.body['user'].split('|')[0])
          },
          filename: (req, file, cb) => {
            if (req.body['user'].split('|')[1] !== 'Replace') {
              cb(null, uid + '.' + file.originalname.split('.').reverse()[0])
            } else {
              cb(null, req.body['user'].split('|')[2])
            }
          }
        })
        var upload = multer({ storage: storage }).single('file')
        upload(image, res, function (err) {
          if (err) {
            data.error = true
            data.msg = err
          } else {
            data.error = false
            data.msg = process.env.IMGHOST + ':' + process.env.PORT + '/' + image.file.path.replace('public/', '')
          }
          resolve(data)
        })
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.getFareEstimation = function (baseCharge, minCharge, distance) {
    var distanceToKM = parseFloat(distance / 1000)
    var fareRate = parseFloat(minCharge * distanceToKM)
    var charge = parseFloat(baseCharge) + parseFloat(fareRate)
    return Number(charge.toFixed(2))
  }

  this.weightCalculator = function (data, weight) {
    var config = {}
    weight.forEach(element => {
      config[element.key] = element.value
    })
    var key = Object.keys(config)
    var total = 0
    key.filter(element => {
      if (data[element] && config[element]) {
        total += data[element] * config[element]
      } else {
        total += 0
      }
    })
    data['total'] = total
    return data
  }

  this.timeStampFormatter = function (timestamp) {
    var dateFormat = 'YYYY-MM-DD HH:mm:ss'
    var date = moment(timestamp).format(dateFormat)
    return date
  }

  this.dateFormatter = function (timestamp) {
    var dateFormat = 'DD-MM-YYYY'
    var date = moment(timestamp).format(dateFormat)
    return date
  }

  this.timeStampHelper = function (timestamp, value, valueType) {
    var dateFormat = 'YYYY-MM-DD HH:mm:ss'
    var date = moment(timestamp).add(value, valueType).format(dateFormat)
    return date
  }

  this.timeStampCalculator = function (timeStamp1, timeStamp2) {
    var date1 = new Date(timeStamp1)
    var date2 = new Date(timeStamp2)

    var res = Math.abs(date1 - date2)
    return res % 60
  }
  this.secureChangerList = function (Email, Mobile) {
    var mobile = ''
    var email = ''
    var output = {}
    for (var i = 0; i < Mobile.length; i++) {
      if (i > (Mobile.length - 5)) {
        mobile += '*'
      } else {
        mobile += Mobile[i]
      }
    }
    var splitmail = Email.split('@')[0]
    if (splitmail.length < 2) {
      email += splitmail.replace(splitmail[0], '*')
    } else if (splitmail.length < 3) {
      email += splitmail[0].concat('*')
    } else {
      for (var ei = 0; ei < splitmail.length; ei++) {
        if ((ei < 1) || ((splitmail.length - 1) <= ei)) {
          email += splitmail[ei]
        } else {
          email += '*'
        }
      }
    }
    email = email.concat('@', Email.split('@')[1])
    output['email'] = email
    output['mobile'] = mobile
    return output
  }

  this.multipleStringReplace = function (string, replacementList) {
    return new Promise(function (resolve) {
      var mst = multiStringReplace(string, replacementList)
      resolve(mst)
    })
  }
  this.bookingTripStarCounting = function (rating) {
    return new Promise(function (resolve) {
      var ratingstring = ''
      switch (rating) {
        case '1':
          ratingstring += '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          break
        case '2':
          ratingstring += '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          break
        case '3':
          ratingstring += '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          break
        case '4':
          ratingstring += '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
          break
        case '5':
          ratingstring += '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'
          break
        default:
          ratingstring += '<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          break
      }
      resolve(ratingstring)
    })
  }

  
}
