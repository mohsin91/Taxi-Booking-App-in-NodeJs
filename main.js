const express = require('express')
, CONFIG = require('./config/config') // Injecting Our Configuration
const app = express()
const cors = require('cors')
var mongoose = require('mongoose')

const path = require('path')
require('./controller/Admin/AdminAuthController')()
require('./controller/AuthController')()

app.use(cors())
app.use('/', express.static(path.join(__dirname, '/public')))

const bodyParser = require('body-parser')

const { check, validationResult } = require('express-validator/check')
const http = require('http').Server(app)

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', function (request, response, next) {
  request.headers.lang = request.headers.lang || 'default'
  console.log(`IP: ${request.connection.remoteAddress} Method: ${request.method} Route: ${request.originalUrl} Body: ` + JSON.stringify(request.body))
  next()
})

async function auth(request, response, next) {
  var error = {}
  try {
    var auth = await this.getPayloadFromToken(request.headers.access_token, process.env.JWT_SECRET)
    if (auth.error) {
      error.error = true
      error.msg = 'Unauthorized access'
      return response.status(401).send(error)
    } else {
      request.params.auth = auth.data
      var authenticate = await this.apiServicesAuthCtrl(request)
      if (authenticate.error) {
        error.error = true
        error.msg = 'Unauthorized accesss'
        return response.status(401).send(error)
      } else {
        next()
      }
    }
  } catch (err) {
    err.error = true
    err.msg = 'Unauthorized access'
    return response.status(401).send(err)
  }
}

async function adminauth(request, response, next) {
  var error = {}
  try {
    var auth = await this.getAdminAuthToken(request.headers.token, process.env.JWT_SECRET)
    if (auth.error) {
      error.error = true
      error.msg = 'Unauthorized'
      return response.send(error)
    } else {
      var result = await this.adminAuthVerifyToken(auth.data)
      if (result.error) {
        error.error = true
        error.msg = 'Unauthorized'
        return response.send(error)
      } else {
        request.params.tokendata = [result.data]
      }
    }
  } catch (err) {
    err.error = true
    err.msg = 'Unauthorized'
    return response.send(err)
  }
  next()
}

app.auth = auth
app.adminauth = adminauth

const validator = {}
validator.check = check
validator.validation = validationResult

require('./routes/UserRoutes')(app, validator)
require('./routes/ProviderRoutes')(app, validator)
require('./routes/TrackingRoutes')(http)
require('./routes/BookingRoutes')(app, validator)
require('./routes/InvoiceRoutes')(app)

require('./routes/AdminRoutes')(app, validator)

http.listen(process.env.PORT, function () {
  console.log('Server is running on ' + process.env.HOST + ':' + process.env.PORT)
})

var mongooseOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	keepAlive: 1,
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 30000, // Close sockets after 45 seconds of inactivity,
  useUnifiedTopology: true
};

mongoose.connect(CONFIG.DB_URL, mongooseOptions, function (error) {
	if (error) {
		console.log('MongoDB connection error: ', error);
	}
	else {
		console.log('MongoDB connection ' + CONFIG.DB_URL + ' ==> success');
	}
}); //Connecting with MongoDB
