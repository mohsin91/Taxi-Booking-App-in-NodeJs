module.exports = function () {
  const rideVechileType = 'RideVehicleType'
  const booking = 'Booking'
  require('../Utils/enums');
  require('../Utils/common')()
  require('dotenv').config()
  var distance = require('google-distance')
  var configuraion = {
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
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

  this.getRideVechileType = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(rideVechileType)
        .where(data)
        .where('IsActive', 'yes')
        .then((result) => {
          output.count = result.length
          output.result = result
          if (result.length > 0) {
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

  this.fetchRideVechileTypeUsingId = (rideId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(rideVechileType)
        .where({ Id: rideId })
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result[0]
          } else {
            output.error = true
            output.result = null
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          resolve(null)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.createBooking = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .insert(data)
        .then((result) => {
          output.result = result
          if (result) {
            output.error = false
            output.result = result[0]
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
          err.msg = err.sqlMessage
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchBookingInfo = (data) => {
    var output = {}
    return new Promise(function (resolve) {
      let queries = `CALL getbooking(?)`;
      let connection = mysql.createConnection(configuraion);
      connection.query(queries,[data.Id], (error, results) => {
        if (error) {
          output.error = true
          resolve(output)
        }
        else{
          output.error = false
            output.result = results
            resolve(output)
        }
      });
      // var knex = new Knex(config)
      // knex.select('UserId')
      //   .from('Booking')
      //   .where('Id','151')
      //   .then((result) => {
      //     if (result.length > 0) {
      //       output.error = false
      //       output.result = result
      //     } else {
      //       output.error = true
      //     }
      //     resolve(output)
      //   })
      //   .catch((err) => {
      //     err.error = true
      //     resolve(err)
      //   })
      //   .finally(() => {
      //     knex.destroy()
      //   })
    })
  }

  this.fetchBookingUsingState = (data, status, limit) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex.transaction((trx) => {
        trx(booking)
          .transacting(trx)
          .where(data)
          .whereIn('Status', status)
          .having('CreateAT', '<', knex.fn.now())
          .limit(limit)
          .then(trx.commit)
          .catch((err) => {
            trx.rollback()
            throw err
          })
      })
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


  this.fetchBookingStatus = (data) => {
    try{
    var response = {};
    var getcost={};
    var Driver={};
    var User={};
    var tempe={}
    if(data.UserType=='Provider'){
    return new Promise(function (resolve) {
      let queries = `CALL getCurrentRide(?)`;
      let connection = mysql.createConnection(configuraion);
      connection.query(queries,[data.Id],async (error, results) => {
        if (error) {
          resolve(console.error(error.message));
        }
        else{
          if(results[0].length == 0)
          {
            resolve(response)
            return;
          }
          response.bookingId = results[0][0].bookingId;
          Driver.providerId=  results[0][0].ProviderId;
          User.userId= results[0][0].UserId;
          response.status=results[0][0].Status;
          Driver.latitude=results[0][0].Latitude;
          Driver.longitude=results[0][0].Longitude;
          response.sourceLat=results[0][0].SourceLat;
          response.sourceLong=results[0][0].SourceLong;
          response.destinyLat=results[0][0].DestinyLat;
          response.destinyLong=results[0][0].DestinyLong;
          User.userPhone=results[0][0].userPhone;
          Driver.providerPhone=results[0][0].providerPhone;
          Driver.Image=results[0][0].driverImage;
          User.Image=results[0][0].userImage;
          Driver.ProviderName=results[0][0].driverName;
          User.userName=results[0][0].userName;
          Driver.Rating=results[0][0].driverRating;
          User.Rating=results[0][0].userRating;
          Driver.VehicleNumber=results[0][0].VehicleNumber;
          Driver.Color=results[0][0].Color;
          Driver.VehicleBrandName=results[0][0].VehicleBrandName;
          response.fromLocation=results[0][0].FromLocation;
          response.toLocation=results[0][0].ToLocation;
          
         
          const temp = this.Status.filter(word => word.key == response.status);
          if(temp.length==0){
            response={};
            resolve(response);
          }
          else{
          response.status=temp[0].value;
          }
          if(results[0][0].Status=='Ordered'){
            getcost.destination=results[0][0].Latitude+','+results[0][0].Longitude; 
            getcost.PickUp=results[0][0].SourceLat+','+results[0][0].SourceLong;
          }
          else if(results[0][0].Status=='RideEnded'){
            getcost.destination=results[0][0].SourceLat+','+results[0][0].SourceLong; 
            getcost.PickUp=results[0][0].DestinyLat+','+results[0][0].DestinyLong;
           var arrivalTime= new Promise(function (resolve) {
              let queries = `CALL getTimeDiff(?)`;
              let connection = mysql.createConnection(configuraion);
              connection.query(queries,[response.bookingId], (error, results) => {
                if (error) {
                  resolve(console.error(error.message));
                }
                else{
                  response.arrivalTime=results[0][0].arrivalTime;
                }
              });
             
            })
          }
          else{
            getcost.destination=results[0][0].Latitude+','+results[0][0].Longitude; 
            getcost.PickUp=results[0][0].DestinyLat+','+results[0][0].DestinyLong;
          }
        
          getcost.pricePerKm=results[0][0].PricePerKm;
          let resp = await this.getDistance(0, getcost, getcost);
          //console.log(response);
          if(resp){
            response.duration = resp.duration;
            response.distance = resp.distance;
            response.estimatePrice=parseInt((parseFloat(resp.distance.split(' ')[0])*(getcost.pricePerKm))) +'-'+parseInt(((parseFloat(resp.distance.split(' ')[0])*(getcost.pricePerKm))+100));
            if(results[0][0].Status=='RideEnded'){
            response.finalPrice = parseInt((parseFloat(resp.distance.split(' ')[0]) * (getcost.PricePerKm)));
            }
          }
            response.user=User;
            response.provider=Driver;
        
            resolve(response);
          // var distinctSeats = this.getTimeDistance(getcost,async function(res){
          //   if (res.status === "OK" && res.rows[0].elements[0].status === "OK") {
          //   response.duration=res.rows[0].elements[0].duration.text;
          //   response.distance=res.rows[0].elements[0].distance.text;
            
          //   response.estimatePrice=parseInt((parseFloat(res.rows[0].elements[0].distance.text.split(' ')[0])*(getcost.pricePerKm))) +'-'+parseInt(((parseFloat(res.rows[0].elements[0].distance.text.split(' ')[0])*(getcost.pricePerKm))+100));
          //   }
          //   if(results[0][0].Status=='RideEnded'){
          //   response.FinalPrice=parseInt((parseFloat(res.rows[0].elements[0].distance.text.split(' ')[0])*(getcost.pricePerKm)));
          //   }
          //   response.user=User;
          //   response.provider=Driver;
          //   resolve(response);
          // })
        }
      });
      connection.end();
    })


  }
  else{
    return new Promise(function (resolve) {
      let queries = `CALL getCurrentStatus(?)`;
      let connection = mysql.createConnection(configuraion);
      connection.query(queries,[data.Id],async (error, results) => {
        if (error) {
          console.log(error.message);
          resolve(error);
        }
        else{
          if(results[0].length == 0)
          {
            resolve(response)
            return;
          }
          response.bookingId = results[0][0].bookingId;
          Driver.providerId=  results[0][0].ProviderId;
          User.userId= results[0][0].UserId;
          response.status=results[0][0].Status;
          Driver.latitude=results[0][0].Latitude;
          Driver.longitude=results[0][0].Longitude;
          response.sourceLat=results[0][0].SourceLat;
          response.sourceLong=results[0][0].SourceLong;
          response.destinyLat=results[0][0].DestinyLat;
          response.destinyLong=results[0][0].DestinyLong;
          User.userPhone=results[0][0].userPhone;
          Driver.providerPhone=results[0][0].providerPhone;
          Driver.Image=results[0][0].driverImage;
          User.Image=results[0][0].userImage;
          Driver.ProviderName=results[0][0].driverName;
          User.userName=results[0][0].userName;
          Driver.Rating=results[0][0].driverRating;
          User.Rating=results[0][0].userRating;
          Driver.VehicleNumber=results[0][0].VehicleNumber;
          Driver.Color=results[0][0].Color;
          Driver.VehicleBrandName=results[0][0].VehicleBrandName;
          response.fromLocation=results[0][0].FromLocation;
          response.toLocation=results[0][0].ToLocation;
          const temp = this.Status.filter(word => word.key == response.status);
          if(temp.length==0){
            response.status=null;
          }
          else{
          response.status=temp[0].value;
          }
          if(results[0][0].Status=='Ordered'){
            getcost.destination=results[0][0].Latitude+','+results[0][0].Longitude; 
            getcost.PickUp=results[0][0].SourceLat+','+results[0][0].SourceLong;
          }
          else if(results[0][0].Status=='RideEnded'){
            getcost.destination=results[0][0].SourceLat+','+results[0][0].SourceLong; 
            getcost.PickUp=results[0][0].DestinyLat+','+results[0][0].DestinyLong;
            var arriveTime=  new Promise(function (resolve) {
              let queries = `CALL getTimeDiff(?)`;
              let connection = mysql.createConnection(configuraion);
              connection.query(queries,[response.bookingId], (error, results) => {
                if (error) {
                  console.log(error.message);
                  resolve(error);
                }
                else{
                  response.arrivalTime=results[0][0].arrivalTime;
                  
                }
              });
              connection.end();
            })
          }
          
          else{
            getcost.destination=results[0][0].Latitude+','+results[0][0].Longitude; 
            getcost.PickUp=results[0][0].DestinyLat+','+results[0][0].DestinyLong;
          }
        
          getcost.pricePerKm=results[0][0].PricePerKm;
          let resp = await this.getDistance(0, getcost, getcost);
              //console.log(response);
              if(resp){
                response.duration = resp.duration;
                response.distance = resp.distance;
                response.estimatePrice=parseInt((parseFloat(resp.distance.split(' ')[0])*(getcost.pricePerKm))) +'-'+parseInt(((parseFloat(resp.distance.split(' ')[0])*(getcost.pricePerKm))+100));
                if(results[0][0].Status=='RideEnded'){
                response.finalPrice = parseInt((parseFloat(resp.distance.split(' ')[0]) * (getcost.PricePerKm)));
                }
              }
                response.user=User;
                response.provider=Driver;
            
                resolve(response);
              
          // var distinctSeats = this.getTimeDistance(getcost,async function(res){
          //   if (res.status === "OK" && res.rows[0].elements[0].status === "OK") {
          //   response.duration=res.rows[0].elements[0].duration.text;
          //   response.distance=res.rows[0].elements[0].distance.text;
            
          //   response.estimatePrice=parseInt((parseFloat(res.rows[0].elements[0].distance.text.split(' ')[0])*(getcost.pricePerKm))) +'-'+parseInt(((parseFloat(res.rows[0].elements[0].distance.text.split(' ')[0])*(getcost.pricePerKm))+100));
          //   }
          //   if(results[0][0].Status=='RideEnded'){
          //     response.finalPrice=parseInt((parseFloat(res.rows[0].elements[0].distance.text.split(' ')[0])*(getcost.pricePerKm)));
          //     }
          
          //   response.user=User;
          //   response.provider=Driver;
          //   resolve(response);
          // })
        }
      });
      connection.end();
    })



  }
  }
  catch(err)
  {
    resolve(err)
  }
}



  this.updateBookingState = (conditon, data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .where(conditon)
        .update(data)
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

  this.updateBookingProviderId = (conditon, data) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .where(conditon)
        .update(data)
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
          err.msg = err.sqlMessage
          resolve(err)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.updatenWaitingBookingList = (data, status, second) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .update(data)
        .whereIn('Status', status)
        .whereRaw('UpdateAt <= NOW() - INTERVAL ' + second + ' SECOND')
        .then((result) => {
          if (result > 0) {
            output.error = false
          } else {
            output.error = true
          }
          resolve(output)
        })
        .catch((err) => {
          err.error = true
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

  this.fetchProviderBookingStatistics = (providerId, duration) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking).select(knex.raw('COUNT(ProviderId) as TripCount, SUM(ProviderEarning) as ProviderEarning, CurrencyType'))
        .groupBy('CurrencyType')
        .groupBy('ProviderId')
        .whereRaw(`${duration}(CreateAt) = ?`, [knex.raw(`${duration}(now())`)])
        .where('ProviderId', providerId)
        .where('Status', 'completed')
        .then((result) => {
          if (result.length) {
            output.error = false
            output.result = result[0]
          } else {
            output.error = true
            output.result = { TripCount: '0', ProviderEarning: '0.00' }
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

  this.fetchProviderBookingEarnings = (providerId, duration) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .select('ProviderEarning', 'CurrencyType', 'Distance', 'PaymentMode', 'RideName', 'CreateAt')
        .whereRaw(`${duration}(CreateAt) = ?`, [knex.raw(`${duration}(now())`)])
        .where('ProviderId', providerId)
        .where('Status', 'completed')
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

  this.updateRejectProvider = (providerId, bookingId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .update({ ProviderRejectedIds: knex.raw(`JSON_MERGE(ProviderRejectedIds, '${providerId}')`) })
        .where('Id', bookingId)
        .then((result) => {
          if (result[0] > 0) {
            output.error = false
          } else {
            output.error = true
          }
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

  this.fetchUserBookingPendingFeedback = (userId) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(booking)
        .select('Id as id', 'ProviderId')
        .where('UserId', userId)
        .where('IsUserReviewed', 'no')
        .where('Status', 'completed')
        .whereNotNull('ProviderId')
        .orderBy('Id', 'DESC')
        .limit(1)
        .then((result) => {
          if (result.length > 0) {
            output.error = false
            output.result = result[0]
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

  this.getServiceTypeUsingIds = (serviceIds) => {
    var output = {}
    return new Promise(function (resolve) {
      var knex = new Knex(config)
      knex(rideVechileType)
        .select('Id as id', 'Name as name')
        .whereIn('Id', serviceIds)
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
          resolve(output)
        })
        .finally(() => {
          knex.destroy()
        })
    })
  }

}
