
module.exports = function () {
  var distance = require('google-distance');
  // 'AIzaSyALUdVelXMs_UMm3cBTP4-kl_B97yrHNds'
  this.getDistance = async function (index, data, res) {
    return new Promise(function (resolve, reject) {
      var origin = data.PickUp;
        var destination = data.destination;
        distance.apiKey =process.env.MAP_API_KEY;
        distance.get(
          {
            index: index,
            origin: origin,
            destination: destination
          },
          function (err, data) {
            console.log(data);
            if (err) return reject(err);
            resolve(data);
          });
    });
  }
};