var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ADMIN_SCHEMA = {};
ADMIN_SCHEMA.ADMIN = {
    username: { type: String, lowercase: true, index: { unique: true }, trim: true },
    email: { type: String, lowercase: true, index: { unique: true }, trim: true },
    password: String,
    name: String,
    role: String,
    status:Number,
    msisdn:String,
    CountryCode:String,
    PhNumber:String,
    privileges: [],
    activity: {
        last_login: { type: Date},
        last_logout: { type: Date}
    },
	uniqueID: String,
	unique_verification :{
		timestamp:Number
	},
};
module.exports = ADMIN_SCHEMA;
