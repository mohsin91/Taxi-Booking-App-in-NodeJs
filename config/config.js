var path = require('path');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "/config.json"), 'utf8'));
var CONFIG = {};
CONFIG.DB_URL = 'mongodb://stephane-lasserre:atx5lzko@cluster0-shard-00-00-k8hod.gcp.mongodb.net:27017,cluster0-shard-00-01-k8hod.gcp.mongodb.net:27017,cluster0-shard-00-02-k8hod.gcp.mongodb.net:27017/'+config.mongodb.database+'?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
module.exports = CONFIG;