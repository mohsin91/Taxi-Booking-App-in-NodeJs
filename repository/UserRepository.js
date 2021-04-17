module.exports = function () {
  require('dotenv').config()
  require('../Utils/common')()
  var fs = require('fs');
  var request = require('request');
  const users = 'Users'
  const userDevice = 'UserDevices'
  const userOtp = 'UserOtp'
  const cancelpolicy = 'CancellationPolicy'
  const staticpage = 'StaticPages'
  require('../Utils/enums');
  // var enums=require('../Utils/enums')
  require('../Utils/googleApi')()

  var distance = require('google-distance')
  var configuraion = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };

  let mysql = require('mysql2');


  var config = {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    pool: {
      min: Number(process.env.DB_POOL_MIN),
      max: Number(process.env.DB_POOL_MAX)
    },
    acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
  }
  var Knex = require('knex')
  this.addUser = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            response.error = false
            response.result = result[0]
          } else {
            response.error = true
            response.result = null
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.checkIfUserExistsByPhoneNumber = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .select('Id')
        .where('Mobile', data.Mobile)
        .where('ExtCode', data.ExtCode)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = { userExists: true, userId: result[0].Id }
          } else {
            response.error = true
            response.result = { userExists: false }
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.validateUser = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .select('Mobile', 'ExtCode', 'Language')
        .where('Mobile', data.number)
        .where('ExtCode', data.ext)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.addOtp = (data) => {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
        .catch((err) => {
          err = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.delOtp = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp)
        .where(data)
        .delete()
        .then((result) => {
          response.error = false
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchOtp = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp).select('OTP')
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.validateOtp = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result[0]
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateOtpStatus = (data, status) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp)
        .update({ Status: status })
        .where(data)
        .then((result) => {
          if (result) {
            response.error = false
            resolve(response)
          } else {
            response.error = true
            resolve(response)
          }
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateOTP = (data, knex) => {
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userOtp)
        .update({ Status: 'verified' })
        .where(data)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          err = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.fetchUserDetails = (mobile, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .select('Id', 'FirstName', 'LastName', 'Image', 'Email', 'Mobile', 'Password', 'Rating', 'StripeCustomerID')
        .where(mobile)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.addUserDevice = (data, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .insert(data)
        .then((result) => {
          if (result[0] > 0) {
            response.error = false
            response.result = result[0]
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  ////insert documents
  this.addDocuments = (data, knex) => {
    var response = {}
    var dbData = {}
    dbData.ProviderId = data.providerId;
    dbData.Document = data.documentType;
    dbData.ProviderVehicleId = 10;
    dbData.File = data.file;
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex('ProviderVehicleDocument')
        .insert(dbData)
        .then((result) => {
          if (result[0] > 0) {
            response.error = false
            response.result = result[0]
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  /////



  this.updateUserDevice = (data, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .update(data)
        .where({ DeviceId: data.DeviceId })
        .then((result) => {
          if (result > 0) {
            response.error = false
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchUserDevice = (deviceId, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .select('Id')
        .where('DeviceId', deviceId)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.deleteUserDevice = (data, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .where(data)
        .delete()
        .then((result) => {
          response.error = false
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateUserDetails = (data, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .update(data)
        .where({ Mobile: data.Mobile, ExtCode: data.ExtCode })
        .then((result) => {
          if (result) {
            response.error = false
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchUserDetailsById = (userId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .where({ Id: userId })
        .select()
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateUserProfileUsingId = (data, userId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .update(data)
        .where({ Id: userId })
        .then((result) => {
          if (result > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateUserFCMToken = (data, userDeviceInfo) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .update(data)
        .where(userDeviceInfo)
        .then((result) => {
          if (result === 1) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.fetchUserCancelPolicyList = (type) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(cancelpolicy)
        .select()
        .where(type)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.fetchUserStaticPageList = () => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpage)
        .select()
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.fetchUserStaticPageView = (id) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(staticpage)
        .select()
        .where(id)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.fetchUserDeviceInfoUsingId = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(userDevice)
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updateUserRating = (userId, rating, knex) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .update('Rating', rating)
        .where('Id', userId)
        .then((result) => {
          output.error = false
          resolve(output)
        })
        .catch((err) => {
          err.error = false
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.usersSocialTokenchecks = (data, knex) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .select('Id', 'FirstName', 'LastName', 'Image', 'Email', 'Mobile', 'Password', 'Rating')
        .where(data)
        .then((result) => {
          if (result.length > 0) {
            response.error = false
            response.result = result
          } else {
            response.error = true
          }
          resolve(response)
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }
  this.updateLang = (data, knex) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(users)
        .update(data.update)
        .where(data.where)
        .then((result) => {
          output.error = false
          resolve(output)
        })
        .catch((err) => {
          err.error = false
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }


  this.fetchVehicleCategoryMultiple = (data) => {
    var output = {}
    var dbData = {}



    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.select('vehiclecategories.Id', 'vehiclecategories.CategName', 'vehiclecategories.Image').from('vehiclecategories')
        .then(function (vehiclecategories) {
          knex.select('Id', 'SortOption')
            .from('sortingoptions')
            .then(async function (sortingoptions) {
              output.error = false,
                output.result = {
                  'vehiclecateg': vehiclecategories,
                  'sortingoptions': sortingoptions,
                };
              var prom = new Promise((resolve, reject) => {

                output.result.vehiclecateg.forEach(async (category, index, array) => {
                  var distinctSeats = await getDistinctVehSeatsPerCat(array[index].Id);
                  array[index].NoOfSeats = await distinctSeats.map(e => e.VehicleSeats);


                  if (index === array.length - 1)
                    resolve(array);
                })

              });

              prom.then((data) => {
                resolve(output);
              });

              // resolve(output)
            })
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }


  async function getDistinctVehSeatsPerCat(CatId) {
    var knex = new Knex(config)
    try {
      return await knex.select('VehicleSeats')
        .from('ProviderVehicle').where('CategoryId', CatId)
    } catch (err) {
      console.log(err);
    }
    finally {
      knex.destroy();
    }

  }



  ///////
  this.fetchVehicleCategory = (data) => {
    var output = {}
    var dbData = {}



    return new Promise(function (resolve) {

      var knex = new Knex(config)
      knex.select('Id', 'CategName', 'Image')
        .from('vehiclecategories')
        .then(function (vehiclecategories) {
          knex.select('Id', 'SortOption')
            .from('sortingoptions')
            .then(function (sortingoptions) {
              output.error = false,
                output.result = {
                  'vehiclecateg': vehiclecategories,
                  'sortingoptions': sortingoptions,
                };
              resolve(output)
            })
        })
        .catch((err) => {
          err.error = true
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  //Get vehicales categories 
  this.fetchVehicleCategories = (knex) => {
    var response = {}
    var knex = new Knex(config)
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.select('Id', 'CategName', 'Image')
        .from('vehiclecategories')
        .then(function (vehiclecategories) {
          knex.select('Id', 'SortOption')
            .from('sortingoptions')
            .then(function (sortingoptions) {
              response.error = false,
                response.result = {
                  'vehiclecateg': vehiclecategories,
                  'sortingoptions': sortingoptions,
                };
              resolve(response)
            })
        }).catch(function (error) {
          resolve(error);
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }




  this.fetchDrivers = (data) => {
    var response = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      var Id = data.Id;
      var Status = 'verified';
      var VehicleSeat = data.VehicleSeat;
      var latitude = data.latitude;
      var longitude = data.longitude;
      var isLuxury = 0;
      var pageSize = data.pageSize;
      var pageNo = data.pageNo;
      var destLat = data.destLatitude;
      var desLong = data.destLongitude
      n = parseInt(data.sort);
      switch (n) {
        case 1://Price Down
          let Spconnection = mysql.createConnection(configuraion);
          let sorting = 'PricePerKm';
          isLuxury = 0;
          let sql1 = `CALL getDriverListSort(?,?,?,?,?,?,?,?)`;
          Spconnection.query(sql1, [Id, VehicleSeat, latitude, longitude, sorting, isLuxury, destLat, desLong],async (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
            else {
              //let timeDistance= this.getTimeDistance(results[0]);
              results.pop();
              results = results[0];
              if (results.length > 0) {
                let count = 0;
                for (let counter = 0; counter < results.length; counter++) {
                  let response = await this.getDistance(0, results[counter], results[counter]);
                  //console.log(response);
                  if(response){
                  results[counter].Duration = response.duration;
                  results[counter].Distance = response.distance;
                  results[counter].EstimatePrice = (parseInt(response.distance.split(' ')[0]) * (results[count].PricePerKm)) + '-' + ((parseInt(response.distance.split(' ')[0]) * (results[count].PricePerKm)) + 100);
                  // if (counter == results.length) 
                  //   resolve(res);
                  }
                }
                resolve(results);
                // count=0
                // const bookmarks1 =  Promise.all(
                //   results.map((result) => {
                //   var distinctS= getPriceDistance(result,function(res){
                //     results[count].EstimatePrice= (parseFloat(res.distance.split(' ')[0])*(results[count].PricePerKm))+'-'+((parseFloat(res.distance.split(' ')[0])*(results[count].PricePerKm))+100);
                //     count++;
                //     if (count === results.length)
                //       resolve(results)

                //   })

                //   })
                // );
              }
              else {
                resolve(results);
              }


            }
            // resolve(results[0]);
          });

          Spconnection.end();
          break;
        case 2://Distance  
          let Spconn = mysql.createConnection(configuraion);
          let sql = `CALL getDriverList(?,?,?,?)`;
          Spconn.query(sql, [Id, VehicleSeat, latitude, longitude],async (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
            else {
              //let timeDistance= this.getTimeDistance(results[0]);
              results.pop();
              results = results[0];
              // if (results.length > 0) {
              //   results.forEach( (dbData, index, array) => {
              //     var distinctSeats = this.getTimeDistance(array[index], function (res) {
              //       array[index].Duration = res.duration;
              //       array[index].Distance = res.distance;
              //       array[index].EstimatePrice = (parseFloat(res.distance.split(' ')[0]) * (array[index].PricePerKm)) + '-' + ((parseFloat(res.distance.split(' ')[0]) * (array[index].PricePerKm)) + 100);
              //       if (index === array.length - 1)
              //         resolve(array);
              //     })
              //   });
              // }
              // else {
              //   resolve(results);
              // }



              if (results.length > 0) {

                for (let counter = 0; counter < results.length; counter++) {
                  let response = await this.getDistance(0, results[counter], results[counter]);
                  //console.log(response);
                  if(response){
                  results[counter].Duration = response.duration;
                  results[counter].Distance = response.distance;
                  results[counter].EstimatePrice = (parseInt(response.distance.split(' ')[0]) * (results[count].PricePerKm)) + '-' + ((parseInt(response.distance.split(' ')[0]) * (results[count].PricePerKm)) + 100);
                  // if (counter == results.length) 
                  //   resolve(res);
                  }
                }
                resolve(results);
                // results.forEach(async (dbData, index, array) => {
                //   var distinctSeats = await getTimeDistance(array[index],async function(res){
                //     array[index].Duration= res.duration;
                //     array[index].Distance= res.distance;
                //     array[index].EstimatePrice= (parseFloat(res.distance.split(' ')[0])*(array[index].PricePerKm))+'-'+((parseFloat(res.distance.split(' ')[0])*(array[index].PricePerKm))+100);
                //     if (index === array.length - 1)
                //     setTimeout(() => resolve(array), 200);

                // })
                //   });
              }
              else {
                resolve(results);
              }


              // array[index].NoOfSeats = await distinctSeats.map(e=>e.VehicleSeats);



            }
            // resolve(results[0]);
          });

          Spconn.end();
          break;
        case 3://Rating
          let sortng = 'Rating';
          isLuxury = 0;
          let Spconnect = mysql.createConnection(configuraion);
          let sql3 = `CALL getDriverListSort(?,?,?,?,?,?,?,?)`;
          Spconnect.query(sql3, [Id, VehicleSeat, latitude, longitude, sortng, isLuxury, destLat, desLong],async (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
            else {
              //let timeDistance= this.getTimeDistance(results[0]);
              results.pop();
              results = results[0];
              if (results.length > 0) {
                let count = 0;
                let counter = 0;
                for (let counter = 0; counter < results.length; counter++) {
                  let response = await this.getDistance(0, results[counter], results[counter]);
                  //console.log(response);
                  if(response){
                  results[counter].Duration = response.duration;
                  results[counter].Distance = response.distance;
                  results[counter].EstimatePrice = (parseInt(response.distance.split(' ')[0]) * (results[count].PricePerKm)) + '-' + ((parseInt(response.distance.split(' ')[0]) * (results[count].PricePerKm)) + 100);
                  // if (counter == results.length) 
                  }
                  //   resolve(res);
                }

                resolve(results);
                // results.forEach(async (dbData, index, array) => {
                //   var distinctSeats = await getTimeDistance(array[index],function(res){
                //     array[index].Duration=res.duration;
                //     array[index].Distance=res.distance;
                //     array[index].EstimatePrice=(parseFloat(res.distance.split(' ')[0])*(array[index].PricePerKm))+'-'+((parseFloat(res.distance.split(' ')[0])*(array[index].PricePerKm))+100);
                //     if (index === array.length - 1)
                //     resolve(array);
                // })
                //   });
              }
              else {
                resolve(results);
              }
              // array[index].NoOfSeats = await distinctSeats.map(e=>e.VehicleSeats);



            }
            // resolve(results[0]);
          });

          Spconnect.end();
          break;
        case 6:
          isLuxury = 1;
          let sortig = 'Rating';
          let sql4 = `CALL getDriverListSort(?,?,?,?,?,?,?,?)`;
          let connection = mysql.createConnection(configuraion);
          connection.query(sql4, [Id, VehicleSeat, latitude, longitude, sortig, isLuxury, destLat, desLong], async (error, results, fields) => {
            if (error) {
              return console.error(error.message);
              
            }
            else {

              results.pop();
              results = results[0];
              if (results.length > 0) {
                //console.log("MoCount:" + results.length);
                let count = 0;
                // api2.getDistance(results,function (res) {

                //   console.log(res);
                // })

                for (let counter = 0; counter < results.length; counter++) {
                  let response = await this.getDistance(0, results[counter], results[counter]);
                  //console.log(response);
                  if(response){
                  results[counter].Duration = response.duration;
                  results[counter].Distance = response.distance;
                  results[counter].EstimatePrice = (parseInt(response.distance.split(' ')[0]) * (results[count].PricePerKm)) + '-' + ((parseInt(response.distance.split(' ')[0]) * (results[count].PricePerKm)) + 100);
                  }
                  // if (counter == results.length) 
                  //   resolve(res);
                }

                resolve(results);
              }
              else {
                resolve(results);
              }
              // array[index].NoOfSeats = await distinctSeats.map(e=>e.VehicleSeats);



            }
            // resolve(results[0]);
          });
          connection.end();
          break;

        default:
          knex.select('provider.Id', 'provider.FirstName', 'provider.LastName', 'provider.Rating').from('provider')
            .leftJoin('providervehicle', 'provider.Id', 'providervehicle.ProviderId').where({ 'providervehicle.VehicleSeats': VehicleSeat, 'providervehicle.CategoryId': Id }).orderBy('Rating', 'desc').then(function (res) {
              resolve(res)
            })
      }

    })
  }
 

 
  ////ADD Ride Order
  this.saveRideOrder = (data) => {

    var response = {
    }
    var dbData = {}
    dbData.UserId = data.UserId;
    dbData.ProviderId = data.ProviderId;
    dbData.FromLocation = data.FromLocation;
    dbData.ToLocation = data.ToLocation;
    dbData.SourceLat = data.SourceLat;
    dbData.SourceLong = data.SourceLong;
    dbData.DestinyLat = data.DestinyLat;
    dbData.DestinyLong = data.DestinyLong;
    dbData.Status = this.Status[data.Status].key;

    if (!data.bookingId) {
      dbData.Status = this.Status[0].key;


      var getcost = {};
      return new Promise(function (resolve) {
        let queries = `CALL insertBooking(?,?,?,?,?,?,?,?,?)`;
        let connection = mysql.createConnection(configuraion);
        connection.query(queries, [dbData.UserId, dbData.ProviderId, data.FromLocation, data.ToLocation, data.SourceLat, data.SourceLong, data.DestinyLat, data.DestinyLong, dbData.Status],async (error, results) => {
          if (error) {
            resolve(console.error(error.message));
          }
          else {
            response.bookingId = results[0][0].bookingId;
            response.providerId = dbData.ProviderId;
            response.userId = dbData.UserId;
            response.status = this.Status[0].value;
            response.rating = results[0][0].Rating;
            response.DestinyLat = data.DestinyLat;
            response.DestinyLong = data.DestinyLong;
            response.SourceLat = data.SourceLat;
            response.SourceLong = data.SourceLong;
            response.username = results[0][0].Username;
            response.image = results[0][0].Image;
            response.phone = results[0][0].phone;
            // response.arrivalTime=results[0][0].arrivalTime;
            getcost.destination = data.DestinyLat + ',' + data.DestinyLong;
            getcost.PickUp = data.SourceLat + ',' + data.SourceLong;
            //getcost.PricePerKm=results[0][0].PricePerKm;
           
              let resp = await this.getDistance(0, getcost, getcost);
              //console.log(response);
              if(resp){
                response.Duration = resp.duration;
                response.Distance = resp.distance;
                
             // results[counter].EstimatePrice = (parseInt(resp.distance.split(' ')[0]) * (results[count].PricePerKm)) + '-' + ((parseInt(resp.distance.split(' ')[0]) * (results[count].PricePerKm)) + 100);
              }
             
              resolve(response);

            
            // var distinctSe = this.getTimeDistance(getcost, async function (res) {
            //   if (res.status === "OK" && res.rows[0].elements[0].status === "OK") {
            //     response.Duration = res.rows[0].elements[0].duration.text;
            //     response.Distance = res.rows[0].elements[0].distance.text;
            //   }
            //   resolve(response);
            // })
          }
        });
        connection.end();
      })
    }
    else if (dbData.Status == "RideEnded") {
      var getcost = {};
      return new Promise(function (resolve) {
        let queries = `CALL updateBooking(?,?)`;
        let connection = mysql.createConnection(configuraion);
        connection.query(queries, [data.bookingId, dbData.Status],async (error, results) => {
          if (error) {
            resolve(console.error(error.message));
          }
          else {
            response.bookingId = data.bookingId;
            response.providerId = dbData.ProviderId;
            response.userId = results[0][0].UserId;
            response.status = this.Status[data.Status].value;
            response.arrivalTime = results[0][0].arrivalTime;
            getcost.destination = results[0][0].DestinyLat + ',' + results[0][0].DestinyLong;
            getcost.PickUp = results[0][0].SourceLat + ',' + results[0][0].SourceLong;
            getcost.PricePerKm = results[0][0].PricePerKm;
            
              let resp = await this.getDistance(0, getcost, getcost);
              //console.log(response);
              if(resp){
                response.Duration = resp.duration;
                response.Distance = resp.distance;
                response.FinalPrice = parseInt((parseFloat(resp.distance.split(' ')[0]) * (getcost.PricePerKm)));
             
              }
             
              resolve(response);

           
            // var distinctSeats = this.getTimeDistance(getcost, async function (res) {
            //   if (res.status === "OK" && res.rows[0].elements[0].status === "OK") {
            //     getcost.Duration = res.rows[0].elements[0].duration.text;
            //     getcost.Distance = res.rows[0].elements[0].distance.text;
            //     response.FinalPrice = (parseFloat(res.rows[0].elements[0].distance.text.split(' ')[0]) * (getcost.PricePerKm));
            //   }
              
           
          }
        });
        connection.end();
      })

    }
    else {


      var getcost = {};
      return new Promise(function (resolve) {
        let queries = `CALL updateBookingDri(?,?)`;
        let connection = mysql.createConnection(configuraion);
        connection.query(queries, [data.bookingId, dbData.Status],async (error, results) => {
          if (error) {
            resolve(console.error(error.message));
          }
          else {
            response.bookingId = data.bookingId;
            response.providerId = dbData.ProviderId;
            response.userId = results[0][0].UserId;
            response.status = this.Status[data.Status].value;
            //response.arrivalTime=results[0][0].arrivalTime;
            getcost.destination = results[0][0].Latitude + ',' + results[0][0].Longitude;
            getcost.PickUp = results[0][0].SourceLat + ',' + results[0][0].SourceLong;
            getcost.PricePerKm = results[0][0].PricePerKm;
            
              let resp = await this.getDistance(0, getcost, getcost);
              //console.log(response);
              if(resp){
                response.Duration = resp.duration;
                response.Distance = resp.distance;
                response.FinalPrice = parseInt((parseFloat(resp.distance.split(' ')[0]) * (getcost.PricePerKm)));
                
              }
              resolve(response);
            

            // var distinctSeats = this.getTimeDistance(getcost, async function (res) {
            //   if (res.status === "OK" && res.rows[0].elements[0].status === "OK") {
            //     response.Duration = res.rows[0].elements[0].duration.text;
            //     response.Distance = res.rows[0].elements[0].distance.text;
            //   }
              
            //   resolve(response);
            // })
          }
        });
        connection.end();
      })





    }




  }


}
