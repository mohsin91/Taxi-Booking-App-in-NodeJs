var mySql = require('mysql');
// var pool  = mySql.createPool({
//   connectionLimit : 10000,
//   host            : 'localhost',
//   user            : 'root',
//   password        : 'Pyra@db',
//   database        : 'IClickIPay',
//   multipleStatements: true
// });

var pool  = mySql.createPool({
  connectionLimit : 10000,
  host            : 'iclickibankmysql.cojum0wnpmhp.us-east-2.rds.amazonaws.com',
  user            : 'admin',
  password        : 'c6a186alhsl',
  database        : 'IClickIPay',
  multipleStatements: true
});

module.exports = pool;